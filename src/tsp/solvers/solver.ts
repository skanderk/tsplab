/*
 * Author: Skander Kort
 * Created: 2026-02-16 07:24:15
 * Modified: 2026-02-16 07:26:53
 * 
 * Licensed under the Apache License, Version 2.0
 */

import { TspInstance } from "../models/tsp-instance";
import { Tour } from "../models/tour";

/**
 * Common intrface for TSP solvers.
 */
export interface Solver {
    solve(tspInstance: TspInstance): Tour;
}



export type SolverType = 'localsearch'

export interface SolverConfig {
    solverType: SolverType; 
}


export interface SolverFactory {
    create(config: SolverConfig): Solver;
}
