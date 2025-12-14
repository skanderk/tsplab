/*
 * @Author: Skander Kort 
 * @Date: 2025-12-14 05:03:40 
 * @Last Modified by:   Skander Kort 
 * @Last Modified time: 2025-12-14 05:03:40 
 */

import { describe, it, expect } from "vitest";
import { CostMatrixValidator } from "../../../src/tsp/validators/cost-matrix-validator";
import { CostMatrixError, InvalidCostError } from "../../../src/tsp/validators/errors";

describe('CostMatrixValidator', () => {
    describe('validateValues', () => {
        it('accepts all positive costs', () => {
            const costs = [[34, 56, 21], [5, 7], [88]];

            expect(() => CostMatrixValidator.validateValues(costs)).not.toThrow();
        });

        it('throws when some costs are negative', () => {
            const costs = [[34, -56, 21], [-5, 7], [88]];

            expect(() => CostMatrixValidator.validateValues(costs)).toThrow(InvalidCostError);
        });

        it('throws when some costs are zero', () => {
            const costs = [[34, -56, 21], [0, 7], [88]];

            expect(() => CostMatrixValidator.validateValues(costs)).toThrow(InvalidCostError);
        });
    });

    describe('validateStructure', () => {
        it('accepts valid upper-right triangle', () => {
            const costs = [[34, 56, 21], [5, 7], [88]];

            expect(() => CostMatrixValidator.validateStructure(costs)).not.toThrow();
        });

        it('throws when costs is empty', () => {
            const costs = [];

            expect(() => CostMatrixValidator.validateStructure(costs)).toThrow(CostMatrixError);
        });

        it('throws when costs is not an upper-right matrix', () => {
            const costs = [[34, -56, 21], [-5, 7, 76], [88, 76]];

            expect(() => CostMatrixValidator.validateStructure(costs)).toThrow(CostMatrixError);
        });

        it('throws when costs is an array containing an empty array', () => {
            const costs = [[]];

            expect(() => CostMatrixValidator.validateStructure(costs)).toThrow(CostMatrixError);
        });
    });

    describe('validate', () => {
        it('accepts valid cost matrix', () => {
            const costs = [[34, 56, 21, 55], [5, 7, 87], [88, 7], [4]];
            
            expect(() => CostMatrixValidator.validate(costs)).not.toThrow();
        });
        
        it('rejects matrix with structural errors', () => {
            const costs = [[34, 56], [5, 7], [88]];
            
            expect(() => CostMatrixValidator.validate(costs))
                .toThrow(CostMatrixError);
        });
        
        it('rejects matrix with value errors', () => {
            const costs = [[34, -56, 21], [5, 7], [88]];
            
            expect(() => CostMatrixValidator.validate(costs))
                .toThrow(InvalidCostError);
        });
    });
});
