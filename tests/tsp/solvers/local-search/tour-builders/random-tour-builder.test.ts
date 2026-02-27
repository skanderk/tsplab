/*
 * Author: Skander Kort
 * Created: 2026-02-27 08:22:53
 * Modified: 2026-02-27 09:01:07
 * 
 * Licensed under the Apache License, Version 2.0
 */

import { describe, it, expect } from "vitest";
import { CostMatrix } from "../../../../../src/tsp/models/cost-matrix";
import { TspInstance } from "../../../../../src/tsp/models/tsp-instance";
import { RandomTourBuilder } from "../../../../../src/tsp/solvers/local-search/tour-builders/tour-building";

describe("RandomTourBuilder", () => {
    describe("build()", () => {
        it("returns a full tour with exactly tspInstance.nodesCount nodes", () => {
            const costs = [[12, 23, 5, 32], [85, 27, 78], [99, 3], [45]];
            const costMatrix = new CostMatrix(costs);
            const tspInstance = new TspInstance("Test TSP", "A description", 5, 45.87, costMatrix);
            const tourBuilder = new RandomTourBuilder();
            
            const tour = tourBuilder.build(tspInstance);    

            const tourNodesSet = new Set(tour.nodes); 
            const expectedNodesSet = new Set(Array.from({ length: tspInstance.nodesCount }, (_, i) => i));

            expect(tourNodesSet).to.deep.equal(expectedNodesSet);   
        });

        it("produces different tours across multiple runs", () => {
            const costs = [[12, 23, 5, 32], [85, 27, 78], [99, 3], [45]];
            const costMatrix = new CostMatrix(costs);
            const tspInstance = new TspInstance("Test TSP", "A description", 5, 45.87, costMatrix);
            const tourBuilder = new RandomTourBuilder();    

            const tour1 = tourBuilder.build(tspInstance);
            const tour2 = tourBuilder.build(tspInstance);

            // There is a very small probability that the two tours are the same, but this is unlikely to happen in practice.
            expect(tour1.nodes).to.not.deep.equal(tour2.nodes); 
        });
        
        it.todo("throws when the input TspInstance is invalid");
    });
});
