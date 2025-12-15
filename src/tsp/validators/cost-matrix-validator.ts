/*
 * Author: Skander Kort
 * Created: 2025-12-14 01:04:45
 * Modified: 2025-12-15 04:41:32
 * 
 * Licensed under the Apache License, Version 2.0
 */


import type { Cost } from '../models/cost-matrix';
import { InvalidCostError, CostMatrixError } from './errors';


/**
 * Validation methods for CostMatrix.
 */
export class CostMatrixValidator {
    /**
     * Validates the structure and the values of <costs>
     */
    public static validate(costs: ReadonlyArray<ReadonlyArray<Cost>>): void {
        this.validateStructure(costs);
        this.validateValues(costs);
    }

    /**
     * Validates that costs form an upper-right triangular matrix.
     * 
     * For a complete graph with n nodes, the matrix has:
     * - n-1 rows (indexed 0 to n-2)
     * - First row has n-1 elements
     * - Each subsequent row has one fewer element
     * 
     * Example: K4 with 4 nodes -> [[c01,c02,c03], [c12,c13], [c23]]
     * 
     * @throws {CostMatrixError} if structure is invalid
     */
    public static validateStructure(costs: ReadonlyArray<ReadonlyArray<Cost>>): void {
        if (costs.length === 0)
            throw new CostMatrixError('Empty cost matrix!');

        const firstRowLength = costs[0].length;
        if (costs.length !== firstRowLength)
            throw new CostMatrixError(`Number of rows should be ${firstRowLength}, got ${costs.length}!`);

        for (let i = 1; i < costs.length; i++) {
            const expectedRowLength = costs[i - 1].length - 1;
            const actualRowLength = costs[i].length;
            if (actualRowLength !== expectedRowLength) {
                throw new CostMatrixError(
                    `Invalid structure at row ${i}: expected ${expectedRowLength} elements, got ${actualRowLength}`);
            }
        }
    }

    /**
     * Validates matrix values, i.e. all values are positive.
     */
    public static validateValues(costs: ReadonlyArray<ReadonlyArray<Cost>>): void {
        const invalidCosts: Array<Cost> = [];

        for (const row of costs) {
            for (const cost of row) {
                if (cost <= 0)
                    invalidCosts.push(cost);
            }
        }

        if (invalidCosts.length > 0)
            throw new InvalidCostError(`Non-positive costs: ${invalidCosts.join(', ')}`);
    }
}
