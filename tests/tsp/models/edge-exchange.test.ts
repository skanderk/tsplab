/*
 * Author: Skander Kort
 * Created: 2025-11-21 06:09:28
 * Modified: 2025-12-15 04:39:50
 * 
 * Licensed under the Apache License, Version 2.0
 */


import { describe, it, expect } from "vitest";
import { Edge } from "../../../src/tsp/models/graph-types";
import { EdgeExchangeError } from "../../../src/tsp/validators/errors";
import { EdgeExchange } from "../../../src/tsp/models/edge-exchange";

describe("EdgeExchange", () => {
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
})
