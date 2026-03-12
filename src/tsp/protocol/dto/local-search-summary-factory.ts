/*
 * Author: Skander Kort
 * Created: 2026-03-12 18:17:40
 * Modified: 2026-03-12 18:19:26
 * 
 * Licensed under the Apache License, Version 2.0
 */


import type { LocalSearchSummary } from "./events";
import type { LocalSearchSolverState } from "../../solvers/local-search/local-search-state";

export class LocalSearchSummaryFactory {
    public static fromSolverState(state: LocalSearchSolverState): LocalSearchSummary {
        return {
            status: state.status,
            iteration: state.optimizerState.iteration,
            elapsedTimeSec: state.elapsedTimeSec,
            lastOptimizationOperator: state.optimizerState.lastOptimizationOperator,
            lastMoveDescription: state.optimizerState.lastMoveDescription,
            evaluatedMovesCount: state.optimizerState.evaluatedMovesCount,
            appliedMovesCount: state.optimizerState.appliedMovesCount,
            initialTourCost: state.optimizerState.initialTourCost,
            currentTourCost: state.optimizerState.currentTourCost,
            bestTourCost: state.optimizerState.bestTourCost,
        };
    }
}
