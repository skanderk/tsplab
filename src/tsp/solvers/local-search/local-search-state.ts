/*
 * Author: Skander Kort
 * Created: 2026-03-12 15:20:00
 * Modified: 2026-03-12 15:20:00
 * 
 * Licensed under the Apache License, Version 2.0
 */

import type { LocalSearchStatus } from "./tour-optimizer";
import type { OptOperatorName } from "../../models/move";

export type LocalSearchOptimizerState = {
    iteration: number;
    lastOptimizationOperator: OptOperatorName | null;
    lastMoveDescription: string | null;
    evaluatedMovesCount: number;
    appliedMovesCount: number;
    initialTourCost: number;
    currentTourCost: number;
    bestTourCost: number;
}

export const initLocalSearchOptimizerState: LocalSearchOptimizerState = {
    iteration: 0,
    lastOptimizationOperator: null,
    lastMoveDescription: null,
    evaluatedMovesCount: 0,
    appliedMovesCount: 0,
    initialTourCost: 0,
    currentTourCost: 0,
    bestTourCost: 0,
};

export type LocalSearchSolverState = {
    status: LocalSearchStatus;
    startTimeMs: number | null;
    elapsedTimeSec: number;
    optimizerState: LocalSearchOptimizerState;
}

export const initLocalSearchSolverState: LocalSearchSolverState = {
    status: "idle",
    startTimeMs: null,
    elapsedTimeSec: 0,
    optimizerState: initLocalSearchOptimizerState,
};
