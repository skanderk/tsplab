/*
 * Author: Skander Kort
 * Created: 2026-01-22 10:28:11
 * Modified: 2026-02-16 09:32:58
 * 
 * Licensed under the Apache License, Version 2.0
 */

import { CostMatrix } from "../../models/cost-matrix";
import { Tour } from "../../models/tour";
import type { Nameable } from "../nameable";
import type { Move } from "../../models/move";
import type { TspInstance } from "../../models/tsp-instance";
import type { Stoppable } from "../stoppable";

/**
 * Interface for optimizing a TSP tour.
 * Implementations should return an improved tour based on the provided TSP instance.
 *
 * @param tour - The initial tour to optimize.
 * @returns A new optimized tour.
 */
export interface TourOptimizer {
    optimize(tour: Tour, tspInstance: TspInstance): Tour;
}

/**
 * Implementation of a local search tour optimizer.
 */
export class LocalSearchOptimizer implements TourOptimizer, Stoppable {

    private searchState: SearchState;
    private currentTour: Tour | null = null;
    private currentInstance: TspInstance | null = null;
    private status: LocalSearchStatus = "idle";

    /**
     * Creates a new LocalSearchOptimizer given a set of optimization operators 
     * and an operator selection strategy.
     */
    public constructor(
        private operators: Array<OptimizationOperator>,
        private operatorSelector: OperatorSelection,
        private moveSelector: MoveSelectionStrategy,
        private readonly optimizerObserver: LocalSearchOptimizerObserver) {
        this.searchState = { ...initSearchState };
    }

    /**
     * Iteratively improves the given tour using local search.
     */
    optimize(tour: Tour, tspInstance: TspInstance): Tour {
        this.begin(tour, tspInstance);

        while (true) {
            const status = this.improveCurrentTour();
            if (status !== "running") {
                break;
            }
        }

        return this.getCurrentTour();
    }

    /**
     * Initializes the optimizer to run step-by-step.
     */
    public begin(tour: Tour, tspInstance: TspInstance): void {
        this.currentTour = tour;
        this.currentInstance = tspInstance;
        this.searchState = { ...initSearchState };
        this.status = "running";
    }

    /**
     * Executes a single optimization step.
     */
    public improveCurrentTour(): LocalSearchStepStatus {
        if (!this.currentTour || !this.currentInstance) {
            throw new Error("LocalSearchOptimizer not initialized. Call begin() first.");
        }

        if (this.status !== "running") {
            if (this.status === "idle") {
                throw new Error("LocalSearchOptimizer not initialized. Call begin() first.");
            }
            return this.status;
        }

        if (this.operators.length === 0) {
            this.status = "completed";
            return this.status;
        }

        // TODO Implement a single optimization iteration and termination criteria
        // (e.g., max iterations, no-improvement threshold).
        this.status = "completed";
        return this.status;
    }

    public getCurrentTour(): Tour {
        if (!this.currentTour) {
            throw new Error("LocalSearchOptimizer has no current tour.");
        }

        return this.currentTour;
    }

    public setOperators(operators: Array<OptimizationOperator>): LocalSearchOptimizer {
        this.operators = operators;
        return this;
    }

    public setOperatorSelector(selector: OperatorSelection): LocalSearchOptimizer {
        this.operatorSelector = selector;
        return this;
    }

    public setMoveSelector(selector: MoveSelectionStrategy): LocalSearchOptimizer {
        this.moveSelector = selector;
        return this;
    }

    public stop(): void {
        this.status = "stopped";
    }

    public pause(): void {
        if (this.status === "running") {
            this.status = "paused";
        }
    }

    public resume(): void {
        if (this.status === "paused") {
            this.status = "running";
        }
    }
}

export interface LocalSearchOptimizerObserver {
    /**
     * Called each time a move has been selected.
     */
    onMoveSelected: (selectedMove: Move, searchState: SearchState) => void;
}


/**
 * Interface for optimization operators.
 */
export interface OptimizationOperator extends Nameable {
    /**
     * Generates the moves to apply to the given tour. 
     * Does not modify the tour.
     * @returns An array of moves. These can be improving or non-improving moves, 
     * depending on the operator logic.
     */
    generateMoves(tour: Tour, costs: CostMatrix,
    ): Move[];
}


/**
 * Two-opt optimization operator.
 */
export class TwoOpt implements OptimizationOperator {
    name: string = '2-opt';

    /**
     * @inheritdoc
     */
    generateMoves(
        tour: Tour, costs: CostMatrix): Move[] {
        // TODO Implementation for creating a 2-opt move
        return [];
    }
}

/**
 * Three-opt optimization operator.
 */
export class ThreeOpt implements OptimizationOperator {
    name: string = '3-opt';

    /**
     * @inheritdoc
     */
    generateMoves(
        tour: Tour,
        costs: CostMatrix,): Move[] {
        // TODO Implementation for creating a 3-opt move
        return [];
    }
}

/**
 * Interface for operator selection strategies.
 */
export interface OperatorSelection extends Nameable {
    selectOperator(operators: Array<OptimizationOperator>, searchState: SearchState): OptimizationOperatorIndex;
}

export type OptimizationOperatorIndex = number;

/**
 * Selects the next operator in <operators> based on a round-robin strategy.
 * Precondition: operators.length >= 1
 */
export class RoundRobinSelector implements OperatorSelection {
    name: string = 'Round Robin';

    selectOperator(operators: Array<OptimizationOperator>, searchState: SearchState): OptimizationOperatorIndex {
        const selectedIdx = (searchState.lastOperatorIdx + 1) % operators.length;

        return selectedIdx;
    }
}

/**
 * Selects a random operator from <operators>.
 * Precondition: operators.length >= 1
 */
export class RandomSelector implements OperatorSelection {
    name: string = 'Random Selection';

    selectOperator(operators: Array<OptimizationOperator>, searchState: SearchState): OptimizationOperatorIndex {
        if (operators.length <= 1) {
            return 0;
        }

        let selectedIdx = Math.floor(Math.random() * operators.length);
        while (selectedIdx === searchState.lastOperatorIdx) {
            selectedIdx = Math.floor(Math.random() * operators.length);
        }

        return selectedIdx;
    }
}

/**
 * Type for move selection strategies. Tells an optimization operator which move to select.
 */
export interface MoveSelectionStrategy {
    selectMove(candidates: Move[]): Move | null;
}

export class FirstMoveSelector implements MoveSelectionStrategy {
    public selectMove(candidates: Move[]): Move | null {
        return candidates[0] ?? null;
    }
}


/**
 * Interface for tracking the state of the search process.
 */
export interface SearchState {
    iterations: number;
    bestCost: number;
    noImprovementCount: number;
    lastOperatorIdx: number;
}

export type LocalSearchStatus = "idle" | "running" | "paused" | "stopped" | "completed";
export type LocalSearchStepStatus = Exclude<LocalSearchStatus, "idle">;


/**
 * Keeps track of the evolution of local search.
 */
const initSearchState: SearchState = {
    iterations: 0,
    bestCost: Infinity,
    noImprovementCount: 0,
    lastOperatorIdx: -1
}
