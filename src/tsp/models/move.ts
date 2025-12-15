/*
 * Author: Skander Kort
 * Created: 2025-11-21 05:26:54
 * Modified: 2025-12-15 04:39:25
 * 
 * Licensed under the Apache License, Version 2.0
 */


import { EdgeExchange } from "./edge-exchange";

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
