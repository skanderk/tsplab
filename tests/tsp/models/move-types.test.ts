/*
 * @Author: Skander Kort 
 * @Date: 2025-12-14 05:03:31 
 * @Last Modified by:   Skander Kort 
 * @Last Modified time: 2025-12-14 05:03:31 
 */

import { describe, it, expect } from "vitest";
import { Edge } from "../../../src/tsp/models/graph-types";
import { EdgeExchange } from "../../../src/tsp/models/move-types";
import { EdgeExchangeError } from "../../../src/tsp/validators/errors";

describe("EdgeExchange", () => {
    describe("constructor()", () => {
        it("throws when the number of edges to remove and the number of edges to insert do not match", () => {
            const removals = new Set([new Edge(1, 5), new Edge(10, 15)]);
            const insertions = new Set([new Edge(2, 7), new Edge(56, 21), new Edge(7, 9)]);

            expect(() => new EdgeExchange(removals, insertions)).toThrow(EdgeExchangeError)
        })
    });
})
