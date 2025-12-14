/*
 * @Author: Skander Kort 
 * @Date: 2025-12-14 05:02:18 
 * @Last Modified by:   Skander Kort 
 * @Last Modified time: 2025-12-14 05:02:18 
 * 
 * Types for edge exchanges and moves. 
 */


import { Edge } from "./graph-types";
import { EdgeExchangeError } from "../validators/errors";

/**
 * Describes an immutable exchange of edges in a graph. That is the removal of a certain number of edges from the graph 
 * and the insertion of an equal number of edges in this graph.
 */
export class EdgeExchange {
    /**
     * 
     * @param removals The edges to be removed from the graph.
     * @param insertions The edges to insert in the graph.
     */
    constructor(readonly removals: ReadonlySet<Edge>, readonly insertions: ReadonlySet<Edge>) {
        if (removals.size != insertions.size)
            throw new EdgeExchangeError(`The number of edges to remove should be equal to the number of edges to insert, got ${removals.size} removals and ${insertions.size} insertions.`)
    }
}

export type OptOperatorName = "2-opt" | "3-opt";

/**
 * Describes an optimization operator move.
 * 
 */
export interface Move {
    readonly optOprName: OptOperatorName,
    readonly edgeX: EdgeExchange,
    readonly gain: number
}

/**
 * Factory function for Move.
 * @param optOprName  Name of the optimization operator that generated and selected this move.
 * @param edgeX Edge exchange describing this move.
 * @param gain Gain (or loss) resulting from applying this move.
 * @returns 
 */
export function createMove(
    optOprName: OptOperatorName,
    edgeX: EdgeExchange,
    gain: number
): Move {
    return { optOprName, edgeX, gain };
}
