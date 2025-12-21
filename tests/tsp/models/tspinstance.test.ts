/*
 * Author: Skander Kort
 * Created: 2025-12-21 06:24:01
 * Modified: 2025-12-21 07:24:34
 * 
 * Licensed under the Apache License, Version 2.0
 */


import { beforeEach, describe, it, expect } from "vitest";
import { CostMatrix } from "../../../src/tsp/models/cost-matrix";
import { TspInstance } from "../../../src/tsp/models/tsp-instance";
import { TspInstanceError } from "../../../src/tsp/validators/errors";



describe("TspInstance", () => {
    let costMatrix: CostMatrix;

    beforeEach(() => {
        const costs = [[12, 23, 5], [85, 27], [99]];
        costMatrix = new CostMatrix(costs);
    });

    describe("constructor()", () => {
        it("accepts a valid TSP instance", () => {

            const tsp = new TspInstance("exampleInst", "This is a test TSP instance", 4, 45.87, costMatrix);

            expect(tsp.name).to.equal("exampleInst");
            expect(tsp.description).to.equal("This is a test TSP instance");
            expect(tsp.nodesCount).to.equal(4);
            expect(tsp.bestSolutionCost).to.equal(45.87);
            expect(tsp.costs).toStrictEqual(costMatrix);
        });

        it("throws when the instance name is empty", () => {

            const callWithEmptyName = () => new TspInstance("", "This is a test TSP instance", 4, 45.87, costMatrix)

            expect(callWithEmptyName).to.throw(TspInstanceError);
            expect(callWithEmptyName).to.throw(/name cannot be empty/);
        });

        it("throws when the number of nodes is too small", () => {

            const callWithSmallNodesdCount = () => new TspInstance("Test TSP", "A description", 1, 45.87, costMatrix)

            expect(callWithSmallNodesdCount).to.throw(TspInstanceError);
            expect(callWithSmallNodesdCount).to.throw(/Number of nodes must be greater than 2/);
        });

        it("throws when the cost of best know solution is invalid", () => {

            const callWithSmallInvBestCost = () => new TspInstance("Test TSP", "A description", 4, -32, costMatrix)

            expect(callWithSmallInvBestCost).to.throw(TspInstanceError);
            expect(callWithSmallInvBestCost).to.throw(/Best know solution cost must be positive/);
        });

        it("throws when the order of the costs matrix does not match the number of nodes", () => {

            const callWithSmallInvBestCost = () => new TspInstance("Test TSP", "A description", 40, 66, costMatrix)

            expect(callWithSmallInvBestCost).to.throw(TspInstanceError);
            expect(callWithSmallInvBestCost).to.throw(/Cost matrix order \(4\)/);
        });
    });
})
