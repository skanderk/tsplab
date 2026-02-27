import { TspInstanceLoader } from "../../tsp/tspinstance-loader";
import { LocalSearchSolver } from "../../tsp/solvers/local-search/local-search-solver";
import {
    LocalSearchOptimizer,
    RoundRobinSelector,
    type MoveSelectionStrategy,
    type SearchState,
} from "../../tsp/solvers/local-search/tour-optimizer";
import { RandomTourBuilder } from "../../tsp/solvers/local-search/tour-builders/tour-building";
import type { Move } from "../../tsp/models/move";

const TSPLIB_JSON_BASE_URL =
    "https://raw.githubusercontent.com/skanderk/tsplib-json/refs/heads/main/benchmarks/json";

type StartMessage = {
    type: "start";
    payload: {
        instanceName: string;
    };
};

type StopMessage = {
    type: "stop";
};

type PauseMessage = {
    type: "pause";
};

type ResumeMessage = {
    type: "resume";
};

type WorkerMessage = StartMessage | StopMessage | PauseMessage | ResumeMessage;

let activeSolver: LocalSearchSolver | null = null;

class FirstMoveSelector implements MoveSelectionStrategy {
    public selectMove(candidates: Move[]): Move | null {
        return candidates[0] ?? null;
    }
}

function post(type: string, payload?: unknown): void {
    self.postMessage({ type, payload });
}

self.onmessage = async (event: MessageEvent<WorkerMessage>): Promise<void> => {
    const message = event.data;

    try {
        switch (message.type) {
            case "start": {
                const { instanceName } = message.payload;
                const loader = new TspInstanceLoader(TSPLIB_JSON_BASE_URL);
                const tspInstance = await loader.load(instanceName);

                const optimizer = new LocalSearchOptimizer(
                    [],
                    new RoundRobinSelector(),
                    new FirstMoveSelector(),
                    {
                        onMoveSelected: (selectedMove: Move, searchState: SearchState): void => {
                            post("move-selected", {
                                moveGain: selectedMove.gain,
                                operator: selectedMove.optOprName,
                                iteration: searchState.iterations,
                            });
                        },
                    },
                );

                activeSolver = new LocalSearchSolver(
                    new RandomTourBuilder(),
                    optimizer,
                    {
                        onStarted: (): void => post("started", { instanceName }),
                        onPaused: (): void => post("paused"),
                        onResumed: (): void => post("resumed"),
                        onStopped: (): void => post("stopped"),
                    },
                    {
                        onIntialTourBuilt: (newTour): void => {
                            post("initial-tour", {
                                nodesCount: newTour.nodes.length,
                            });
                        },
                        onMoveSelected: (_selectedMove, _searchState): void => {
                            // LocalSearchOptimizer observer already streams move selections.
                        },
                    },
                );

                const solution = activeSolver.solve(tspInstance);
                post("completed", {
                    instanceName,
                    nodesCount: solution.nodes.length,
                });
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
        post("error", { message });
    }
};
