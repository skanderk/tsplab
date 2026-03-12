import { TspInstanceLoader } from "../tspinstance-loader";
import { LocalSearchSolver } from "../solvers/local-search/local-search-solver";
import {
    LocalSearchOptimizer,
    RoundRobinSelector,
    type MoveSelectionStrategy,
    type SearchState,
} from "../solvers/local-search/tour-optimizer";
import { RandomTourBuilder } from "../solvers/local-search/tour-builders/tour-building";
import type { Move } from "../models/move";

const TSPLIB_JSON_BASE_URL =
    "https://raw.githubusercontent.com/skanderk/tsplib-json/refs/heads/main/benchmarks/json";

import type { WorkerCommand } from "../protocol/commands";
import type { TspInstance } from "../models/tsp-instance";
import type { WorkerEvent } from "../protocol/events";
import type { LocalSearchSummary, TspInstanceSummary } from "../protocol/dto/events";

let activeSolver: LocalSearchSolver | null = null;
let tspInstance: TspInstance | null = null;
let solveStartTimeMs: number | null = null;
let localSearchSummary: LocalSearchSummary = {
    status: "idle",
    iteration: 0,
    elapsedTimeSec: 0,
    lastOptimizationOperator: null,
    lastMoveDescription: null,
    evaluatedMovesCount: 0,
    appliedMovesCount: 0,
    initialTourCost: 0,
    currentTourCost: 0,
    bestTourCost: 0,
};

class FirstMoveSelector implements MoveSelectionStrategy {
    public selectMove(candidates: Move[]): Move | null {
        return candidates[0] ?? null;
    }
}

function post(event: WorkerEvent): void {
    self.postMessage(event);
}

function updateElapsedTime(summary: LocalSearchSummary): LocalSearchSummary {
    if (solveStartTimeMs === null) {
        return summary;
    }

    return {
        ...summary,
        elapsedTimeSec: (Date.now() - solveStartTimeMs) / 1000,
    };
}


self.onmessage = async (event: MessageEvent<WorkerCommand>): Promise<void> => {
    const command = event.data;

    try {
        switch (command.kind) {
            case "load-instance": {
                const { instanceName } = command.payload;
                const loader = new TspInstanceLoader(TSPLIB_JSON_BASE_URL);
                tspInstance = await loader.load(instanceName);
                
                const summary: TspInstanceSummary = {
                    name: tspInstance.name,
                    description: tspInstance.description,
                    nodesCount: tspInstance.nodesCount,
                    bestSolutionCost: tspInstance.bestSolutionCost,
                };
                post({
                    kind: "instance-loaded",
                    payload: summary,
                });
                return;
            }   
            case "start": {
                if (!tspInstance) {
                    post({
                        kind: "error",
                        payload: { message: "No TSP instance loaded" },
                    });
                    return;
                }

                solveStartTimeMs = Date.now();
                localSearchSummary = {
                    status: "running",
                    iteration: 0,
                    elapsedTimeSec: 0,
                    lastOptimizationOperator: null,
                    lastMoveDescription: null,
                    evaluatedMovesCount: 0,
                    appliedMovesCount: 0,
                    initialTourCost: 0,
                    currentTourCost: 0,
                    bestTourCost: 0,
                };

                const optimizer = new LocalSearchOptimizer(
                    [],
                    new RoundRobinSelector(),
                    new FirstMoveSelector(),
                    {
                        onMoveSelected: (selectedMove: Move, searchState: SearchState): void => {
                            localSearchSummary = {
                                ...localSearchSummary,
                                iteration: searchState.iterations,
                                lastOptimizationOperator: selectedMove.optOprName,
                            };
                            post({
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

                activeSolver = new LocalSearchSolver(
                    new RandomTourBuilder(),
                    optimizer,
                    {
                        onStarted: (): void => {
                            localSearchSummary = updateElapsedTime({
                                ...localSearchSummary,
                                status: "running",
                            });
                            post({ kind: "started", payload: localSearchSummary });
                        },
                        onPaused: (): void => {
                            localSearchSummary = updateElapsedTime({
                                ...localSearchSummary,
                                status: "paused",
                            });
                            post({ kind: "paused", payload: localSearchSummary });
                        },
                        onResumed: (): void => {
                            localSearchSummary = updateElapsedTime({
                                ...localSearchSummary,
                                status: "running",
                            });
                            post({ kind: "resumed", payload: localSearchSummary });
                        },
                        onStopped: (): void => {
                            localSearchSummary = updateElapsedTime({
                                ...localSearchSummary,
                                status: "stopped",
                            });
                            post({ kind: "stopped", payload: localSearchSummary });
                        },
                    },
                    {
                        onIntialTourBuilt: (newTour): void => {
                            post({
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

                const solution = activeSolver.solve(tspInstance);
                localSearchSummary = updateElapsedTime({
                    ...localSearchSummary,
                    status: "completed",
                });
                post({
                    kind: "completed",
                    payload: localSearchSummary,
                });
                solveStartTimeMs = null;
                return;
            }

            case "stop": {
                activeSolver?.stop();
                return;
            }

            case "pause": {
                activeSolver?.pause();
                return;
            }

            case "resume": {
                activeSolver?.resume();
                return;
            }
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        post({
            kind: "error",
            payload: { message },
        });
    }
};
