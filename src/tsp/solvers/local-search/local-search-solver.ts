/*
 * Author: Skander Kort
 * Created: 2026-02-16 07:38:25
 * Modified: 2026-02-16 09:38:35
 * 
 * Licensed under the Apache License, Version 2.0
 */

import { Tour } from "../../models/tour";
import type { TspInstance } from "../../models/tsp-instance";
import { type Solver } from "../solver";
import { type Stoppable, type StoppableObserver } from "../stoppable";
import type { TourBuilder } from "./tour-builders/tour-building";
import type { LocalSearchOptimizer, SearchState } from "./tour-optimizer";
import type { Move } from "../../models/move";
import type { OptimizationOperator, OperatorSelection, MoveSelectionStrategy } from "./tour-optimizer";

/**
 * Local-search TSP solver that builds an initial tour, iteratively improves it via an optimizer,
 * and exposes stop/pause/resume controls through a delegated execution observer.
 */
class LocalSearchSolver implements Solver, Stoppable {
    public constructor(
        private tourBuilder: TourBuilder,
        private tourOptimizer: LocalSearchOptimizer,
        private readonly executionObs: StoppableObserver,
        private readonly solverObserver: LocalSearchSolverObserver) { }

    public solve(tspInstance: TspInstance): Tour {
        // TODO Implement me!
        return new Tour([]);
    }

    public setTourBuilder(newBuilder: TourBuilder): LocalSearchSolver {
        this.tourBuilder = newBuilder;
        return this;
    }

    // Managing the underlying tour optimizer. Solver proxies optimizer.
    public setOperators(operators: Array<OptimizationOperator>): LocalSearchSolver {
        this.tourOptimizer.setOperators(operators);
        return this;
    }

    public setOperatorSelector(selector: OperatorSelection): LocalSearchSolver {
        this.tourOptimizer.setOperatorSelector(selector);
        return this;
    }

    public setMoveSelector(selector: MoveSelectionStrategy): LocalSearchSolver {
        this.tourOptimizer.setMoveSelector(selector);
        return this;
    }

    // Managing solver execution
    public stop(): void {
        // TODO Implement me!
    }

    public pause(): void {
        // TODO Implement me!
    }

    public resume(): void {
        // TODO Implement me!
    }
}

export interface LocalSearchSolverObserver {
    /**
     * Called after a building the intial tour.
     * @param newTour 
     */
    onIntialTourBuilt: (newTour: Tour) => void;

    /**
     * Called each time a move has been selected.
     */
    onMoveSelected: (selectedMove: Move, searchState: SearchState) => void;
}
