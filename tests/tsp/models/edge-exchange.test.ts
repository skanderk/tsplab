/*
 * Author: Skander Kort
 * Created: 2025-11-21 06:09:28
 * Modified: 2025-12-15 07:55:41
 * 
 * Licensed under the Apache License, Version 2.0
 */


import { beforeEach, describe, it, expect } from "vitest";
import { Edge } from "../../../src/tsp/models/graph-types";
import { CostMatrix } from "../../../src/tsp/models/cost-matrix";
import { EdgeExchangeError } from "../../../src/tsp/validators/errors";
import { EdgeExchange } from "../../../src/tsp/models/edge-exchange";



describe("EdgeExchange", () => {
    let costMatrix: CostMatrix;

    beforeEach(() => {
        // 10x10 upper right matrix (excluding main diagonal)
        const costs = [
            [15, 23, 8, 42, 31, 19, 47, 12, 29],
            [35, 18, 52, 27, 41, 14, 33, 26],
            [48, 22, 36, 11, 39, 45, 21],
            [17, 53, 28, 44, 32, 25],
            [38, 16, 50, 24, 43],
            [20, 37, 49, 13],
            [30, 40, 51],
            [46, 34],
            [19]
        ];
        costMatrix = new CostMatrix(costs);
    });


    describe("constructor()", () => {
        it('accepts valid edge exchange', () => {
            const removals = [new Edge(1, 5), new Edge(10, 15)];
            const insertions = [new Edge(2, 7), new Edge(56, 21)];

            const edgeExchange = new EdgeExchange(removals, insertions);

            expect(edgeExchange.removals).to.equal(removals);
            expect(edgeExchange.insertions).to.equal(insertions);
        });

        it('accepts an empty edge exchange', () => {
            const removals = [];
            const insertions = [];

            const edgeExchange = new EdgeExchange(removals, insertions);

            expect(edgeExchange.removals).to.equal(removals);
            expect(edgeExchange.insertions).to.equal(insertions);
        });

        it('throws when the number of edges to remove and the number of edges to insert do not match', () => {
            const removals = [new Edge(1, 5), new Edge(10, 15)];
            const insertions = [new Edge(2, 7), new Edge(56, 21), new Edge(7, 9)];


            expect(() => new EdgeExchange(removals, insertions)).toThrow(EdgeExchangeError)
        });

        it('throws when an edge is removed, then inserted back', () => {
            const removals = [new Edge(1, 5), new Edge(10, 15), new Edge(88, 85)];
            const insertions = [new Edge(2, 7), new Edge(88, 85), new Edge(7, 9)];


            expect(() => new EdgeExchange(removals, insertions)).toThrow(EdgeExchangeError)
        });
    });

    describe('gain', () => {
        it('calculates gain correctly', () => {
            const removals = [new Edge(1, 5), new Edge(4, 8)];
            const insertions = [new Edge(1, 8), new Edge(5, 4)];
            const edgeExchange = new EdgeExchange(removals, insertions);

            const gain = edgeExchange.gain(costMatrix);

            expect(gain).to.be.equal(20)
        });
    });
})
