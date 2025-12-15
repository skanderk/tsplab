/*
 * Author: Skander Kort
 * Created: 2025-12-15 01:47:24
 * Modified: 2025-12-15 04:07:52
 * 
 * Licensed under the Apache License, Version 2.0
 */

import { Edge } from "./graph-types";
import { EdgeExchangeError } from "../validators/errors";

/**
 * Represents an immutable exchange of edges in a graph.
 * Removes edges and inserts an equal number of new edges.
 */
export class EdgeExchange {
    constructor(
        readonly removals: readonly Edge[],
        readonly insertions: readonly Edge[]
    ) {
        EdgeExchange.validate(removals, insertions);
    }

    /**
     * Checks if the data used to create a new edge exchange is valid.
     * 
     * @param removals Edges to be removed.
     * @param insertions Edges to be inserted.
     * 
     * @throws EdgeExchangeError if:
     *  - The number of edges to be removed does not equal the number of edges to be inserted.
     *  - An edge is removed, then it is inserted back.
     */
    public static validate(removals: readonly Edge[], insertions: readonly Edge[]): void {
        EdgeExchange.assertSameLength(removals, insertions);
        EdgeExchange.assertNoInsertBack(removals, insertions);
    }

    private static assertSameLength(removals: readonly Edge[], insertions: readonly Edge[]): void {
        if (removals.length !== insertions.length) {
            throw new EdgeExchangeError(
                `Edge exchange must have equal removals and insertions. ` +
                `Got ${removals.length} removals and ${insertions.length} insertions.`
            );
        }
    }

    /**
     * Asserts that a remved edge is not inserted back (might signal a bug).
     */
    private static assertNoInsertBack(removals: readonly Edge[], insertions: readonly Edge[]): void {
        const hashEdgeFn = (edge: Edge) => edge.hash();

        const insHashSet = new Set(insertions.map(hashEdgeFn));
        const hasOverlap = removals.some(edge => insHashSet.has(edge.hash()));
        
        if (hasOverlap) {
            throw new EdgeExchangeError(
                "Removals and insertions must be disjoint sets"
            );
        }
    }
}
