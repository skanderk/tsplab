/*
 * Author: Skander Kort
 * Created: 2026-03-12 14:02:55
 * Modified: 2026-03-12 14:51:08
 * 
 * Licensed under the Apache License, Version 2.0
 */


import type { WorkerCommand } from "../protocol/commands";
import { initLocalSearchSummary, type TspInstanceSummary } from "../protocol/dto/events";
import { LocalSearchSummaryFactory } from "../protocol/dto/local-search-summary-factory";
import type { SolverWorkerState } from "./solver-worker-state";

import { TspInstanceLoader } from "../tspinstance-loader";
const TSPLIB_JSON_BASE_URL =
    "https://raw.githubusercontent.com/skanderk/tsplib-json/refs/heads/main/benchmarks/json";

import {
    LocalSearchOptimizer,
    RoundRobinSelector,
    type SearchState,
} from "../solvers/local-search/tour-optimizer";

import { LocalSearchSolver } from "../solvers/local-search/local-search-solver";
import { RandomTourBuilder } from "../solvers/local-search/tour-builders/tour-building";
import type { LocalSearchSolverState } from "../solvers/local-search/local-search-state";

import type { Move } from "../models/move";
import { FirstMoveSelector } from "../solvers/local-search/tour-optimizer";

export class SolverWorkerRuntime {
    public readonly state: SolverWorkerState;
    private readonly emitEvent: (event: any) => void;

    public constructor(emitEvent: (event: any) => void) {
        this.state = {
            solver: null,
            loader: new TspInstanceLoader(TSPLIB_JSON_BASE_URL),
            tspInstance: null,
            localSearchSummary: initLocalSearchSummary
        }

        this.emitEvent = emitEvent;
    }

    public async handleCommand(command: WorkerCommand): Promise<void> {
        try {
            switch (command.kind) {
                case "load-instance":
                    const { instanceName } = command.payload;
                    await this.loadInstance(instanceName);
                    break;
                case "start":
                    await this.startSolving();
                    break;
                case "stop": {
                    this.state.solver?.stop();
                    return;
                }

                case "pause": {
                    this.state.solver?.pause();
                    return;
                }

                case "resume": {
                    this.state.solver?.resume();
                    return;
                }
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            this.emitEvent({
                kind: "error",
                payload: { message },
            });
        }
    }

    private async loadInstance(instanceName: string): Promise<void> {
        const tspInstance = await this.state.loader!.load(instanceName);
        this.state.tspInstance = tspInstance;

        const summary: TspInstanceSummary = {
            name: this.state.tspInstance.name,
            description: this.state.tspInstance.description,
            nodesCount: this.state.tspInstance.nodesCount,
            bestSolutionCost: tspInstance.bestSolutionCost,
        };
        this.emitEvent({
            kind: "instance-loaded",
            payload: summary,
        });
    }

    private async startSolving(): Promise<void> {
        if (!this.state.tspInstance) {
            this.emitEvent({
                kind: "error",
                payload: { message: "No TSP instance loaded" },
            });
            return;
        }

        this.state.localSearchSummary = { ...initLocalSearchSummary };

        const optimizer = new LocalSearchOptimizer(
            [],
            new RoundRobinSelector(),
            new FirstMoveSelector(),
            {
                onMoveSelected: (selectedMove: Move, searchState: SearchState): void => {
                    const solverState = this.state.solver?.getState();
                    if (solverState) {
                        this.state.localSearchSummary = LocalSearchSummaryFactory.fromSolverState(solverState);
                    }
                    this.emitEvent({
                        kind: "move-selected",
                        payload: {
                            moveGain: selectedMove.gain,
                            operator: selectedMove.optOprName,
                            iteration: searchState.iterations,
                        },
                    });
                },
            },
        );

        this.state.solver = new LocalSearchSolver(
            new RandomTourBuilder(),
            optimizer,
            {
                onStarted: (state: LocalSearchSolverState): void => {
                    this.state.localSearchSummary = LocalSearchSummaryFactory.fromSolverState(state);
                    this.emitEvent({
                        kind: "started",
                        payload: this.state.localSearchSummary,
                    });
                },
                onPaused: (state: LocalSearchSolverState): void => {
                    this.state.localSearchSummary = LocalSearchSummaryFactory.fromSolverState(state);
                    this.emitEvent({
                        kind: "paused",
                        payload: this.state.localSearchSummary,
                    });
                },
                onResumed: (state: LocalSearchSolverState): void => {
                    this.state.localSearchSummary = LocalSearchSummaryFactory.fromSolverState(state);
                    this.emitEvent({
                        kind: "resumed",
                        payload: this.state.localSearchSummary,
                    });
                },
                onStopped: (state: LocalSearchSolverState): void => {
                    this.state.localSearchSummary = LocalSearchSummaryFactory.fromSolverState(state);
                    this.emitEvent({
                        kind: "stopped",
                        payload: this.state.localSearchSummary,
                    });
                },
            },
            {
                onIntialTourBuilt: (newTour): void => {
                    this.emitEvent({
                        kind: "initial-tour",
                        payload: {
                            nodesCount: newTour.nodes.length,
                        },
                    });
                },
                onMoveSelected: (_selectedMove, _searchState): void => {
                    // LocalSearchOptimizer observer already streams move selections.
                },
            },
        );

        const solution = this.state.solver.solve(this.state.tspInstance);
        const finalState = this.state.solver.getState();
        this.state.localSearchSummary = LocalSearchSummaryFactory.fromSolverState(finalState);
        if (finalState.status === "completed") {
            this.emitEvent({
                kind: "completed",
                payload: this.state.localSearchSummary,
            });
        }
        return;
    }

}
