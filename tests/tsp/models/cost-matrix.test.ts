/*
 * @Author: Skander Kort 
 * @Date: 2025-12-14 05:03:19 
 * @Last Modified by:   Skander Kort 
 * @Last Modified time: 2025-12-14 05:03:19 
 */

import { beforeEach, describe, it, expect } from "vitest";
import { CostMatrix } from "../../../src/tsp/models/cost-matrix";
import { InvalidNodeError, CostMatrixError } from "../../../src/tsp/validators/errors";

describe("CostMatrix", () => {
    let costMatrix: CostMatrix;

    beforeEach(() => {
        const costs = [[12, 23, 5], [85, 27], [99]];
        costMatrix = new CostMatrix(costs);
    });

    describe("constructor()", () => {
        it("throws when costs is an empty array", () => {


            expect(() => new CostMatrix([])).toThrow(CostMatrixError);
        })
    });

    describe("cost()", () => {
        it("should return 0 when both node indexes are the same", () => {

            const resultCost = costMatrix.cost(1, 1);

            expect(resultCost).toEqual(0);
        });

        it("should return cost when first node index is less than second node index", () => {

            const resultCost = costMatrix.cost(0, 2);

            expect(resultCost).toEqual(23);
        });

        it("should return cost when first node index is greater than second node index", () => {

            const resultCost = costMatrix.cost(3, 1);

            expect(resultCost).toEqual(27);
        });

        it("should throw when called with node indexes out of bounds", () => {


            expect(() => costMatrix.cost(-5, 2)).toThrow(InvalidNodeError);
            expect(() => costMatrix.cost(1, 12)).toThrow(InvalidNodeError);
            expect(() => costMatrix.cost(1, 4)).toThrow(InvalidNodeError);
        });
    });

    describe("order()", () => {
        it("should return the number of rows (columns) of the full square matrix", () => {

            const resultOrder = costMatrix.order();

            expect(resultOrder).toEqual(4);
        });
    })
});
