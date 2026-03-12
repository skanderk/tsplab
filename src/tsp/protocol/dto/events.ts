/*
 * Author: Skander Kort
 * Created: 2026-03-12 10:37:11
 * Modified: 2026-03-12 11:24:02
 * 
 * Licensed under the Apache License, Version 2.0
 */

import { TspInstance } from "../../models/tsp-instance";

export type TspInstanceSummary = Pick<TspInstance, "name" | "description" | "nodesCount" | "bestSolutionCost">;

export type SolverStatus = 'idle' | 'running' | 'paused' | 'stopped' | 'completed';

export type LocalSearchSummary = {
    status: SolverStatus;
    iteration: number;
    elapsedTimeSec: number;

    lastOptimizationOperator: string | null;
    lastMoveDescription: string | null;
    evaluatedMovesCount: number; // includes both applied and rejected moves.
    appliedMovesCount: number; 
    
    initialTourCost: number;
    currentTourCost: number;
    bestTourCost: number; // best cost could be different from current cost if the algorithm accepts worsening moves.
}
