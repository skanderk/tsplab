import { LocalSearchSolver } from "../solvers/local-search/local-search-solver";
import { TspInstance } from "../models/tsp-instance";
import type { LocalSearchSummary } from "../protocol/dto/events";
import type { TspInstanceLoader } from "../tspinstance-loader";

export type SolverWorkerState = {
    loader: TspInstanceLoader | null;
    tspInstance: TspInstance | null;
    solver: LocalSearchSolver | null;
    localSearchSummary: LocalSearchSummary
}
