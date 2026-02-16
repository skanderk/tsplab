/*
 * Author: Skander Kort
 * Created: 2026-02-16 11:28:33
 * Modified: 2026-02-16 17:19:30
 * 
 * Licensed under the Apache License, Version 2.0
 */


/**
 * Props type for the SolverConfig component.
 */
interface SolverConfig {
    tspInstance: string[]; // Names of the available TSP instances.
    tourBuilders: string[]; // Names of the available tour builders.
    currentTspInstance: string; // Name of the currently selected TSP instance.
    currentTourBuilder: string; // Name of the currently selected initial tour builder.
    maxIterations: number; // Maximum number of local-search iterations.
    sleepDurationSec: number; // Delay between local-search steps, in seconds.
}

/**
 * Props type for the OptOperatorsConfig component.
 */
interface OptOperatorsConfig {
    randomizeOperators: boolean; // Whether operators are sampled randomly instead of fixed order.
    stopOnFirstMove: boolean; // Whether search stops at the first improving move in a neighborhood.
    operatorSeq: string[]; // Sequence of the selected optimization operators.
}

/**
 * Props types for the RunSummary component.
 */
interface TspInstanceSummary {
    instName: string; // Name of the active TSP instance.
    instDescription: string; // Short description of the active TSP instance.
    tourBuilder: string; // Name of the initialization heuristic used for this run.
}

interface LocalSearchSummary {
    iteration: number; // Index of the current iteration
    runTimeSec: number; // Time elapsed since the start of solving the TSP instance exclusing sleep periods.
    appliedOperator: string; // Name of the optimization operator that has beed selected.
    moveApplied: string; // The representation of the move that has been applied.
    appliedMovesCount: number; // Number of moves applied so far.
    movesEvaluatedCount: number; // Total number of moves that have been evaluated. 
}

interface CostSummary {
    initialCost: number; // Cost before applying local search.
    lastCost: number; // Most recent tour cost.
    lastCostDecrease: number; // Last observed improvement amount in cost units.
}

/**
 * Props type aliases for the CostChart component.
 */
type IterationIndex = number;
type Cost = number;
type IterationCostsDto = Array<[IterationIndex, Cost]>;

type RunId = string;
type CostChartDto = Array<[RunId, IterationCostsDto]>;

// TODO Add types to interact with TourGraph component, if necessary.

/**
 * Props type for the Metrics component.
 */

interface RunMetrics {
    runId: RunId; // Unique identifier of the run.
    runConfig: string; // Human-readable run configuration (e.g., builder, operator set, selection strategies).
    tourCost: number; // Final tour cost for this run.
    improvementPerc: number; // Cost improvement (or degradation) relative to a baseline, in percent.
    gapPerc: number; // Gap to the best known cost, in percent.
    runTimeSec: number; // Total runtime of this run, in seconds.
    totalIteratiions: number; // Total number of iterations executed in this run.
}

type RunsMetrics = Array<RunMetrics>;
