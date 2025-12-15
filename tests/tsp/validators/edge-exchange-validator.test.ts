/*
 * Author: Skander Kort
 * Created: 2025-12-15 05:54:18
 * Modified: 2025-12-15 06:48:36
 * 
 * Licensed under the Apache License, Version 2.0
 */


import { beforeEach, describe, it, expect } from "vitest";
import { Edge } from "../../../src/tsp/models/graph-types";
import { EdgeExchange } from "../../../src/tsp/models/edge-exchange";
import { EdgeExchangeValidator } from  "../../../src/tsp/validators/edge-exchange-validator";

describe('CostMatrixValidator', () => {
    let nodesCount: number;
    beforeEach(() => {
        nodesCount = 10;
        const tour = [7, 2, 9, 0, 4, 1, 8, 6, 3, 5]; // For refeence only.
    });

    describe('isTourValid', () => {
        it('returns true when a 2-exchange is tour-valid', () => {
            const removedEdges = [new Edge(9, 0), new Edge(8, 6)];
            const insertedEdges = [new Edge(9, 8), new Edge(6, 0)];
            const twoExchange = new EdgeExchange(removedEdges, insertedEdges);

            const isValid = EdgeExchangeValidator.isTourValid(twoExchange, nodesCount);

            expect(isValid).to.be.true;
        });

        it('returns true when a 3-exchange is tour-valid (tour connectivity preserved)', () => {
            const removedEdges = [new Edge(7, 2), new Edge(0, 9), new Edge(8, 6)];
            const insertedEdges = [new Edge(7, 9), new Edge(2, 8), new Edge(0, 6)];
            const threeExchange = new EdgeExchange(removedEdges, insertedEdges);

            const isValid = EdgeExchangeValidator.isTourValid(threeExchange, nodesCount);

            expect(isValid).to.be.true;
        });

        it('returns true when a 4-exchange is degree-valid but breaks connectivity', () => {
            // Tour: [7, 2, 9, 0, 4, 1, 8, 6, 3, 5]
            // Remove: 7-2, 9-0, 1-8, 3-5
            // Insert: 7-9, 2-0, 1-3, 8-5
            // Creates two cycles: [7,9,...,2,0,...,7] and [1,3,...,8,5,...,1]

            const removedEdges = [new Edge(7, 2), new Edge(9, 0), new Edge(1, 8), new Edge(3, 5)];
            const insertedEdges = [new Edge(7, 9), new Edge(2, 0), new Edge(1, 3), new Edge(8, 5)];
            const fourExchange = new EdgeExchange(removedEdges, insertedEdges);
        
            const isValid = EdgeExchangeValidator.isTourValid(fourExchange, nodesCount);
        
            expect(isValid).to.be.true;
        });

        it('returns false when a 3-exchange is not valid', () => {
            const removedEdges = [new Edge(7, 2), new Edge(0, 9), new Edge(8, 6)];
            const insertedEdges = [new Edge(7, 9), new Edge(2, 8), new Edge(3, 4)];
            const threeExchange = new EdgeExchange(removedEdges, insertedEdges);

            const isValid = EdgeExchangeValidator.isTourValid(threeExchange, nodesCount);

            expect(isValid).to.be.false;
        });
    })
});
