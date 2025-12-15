/*
 * Author: Skander Kort
 * Created: 2025-12-15 05:14:10
 * Modified: 2025-12-15 05:35:45
 * 
 * Licensed under the Apache License, Version 2.0
 */



import { EdgeExchange } from "../models/edge-exchange";


/**
 * Checks whether an edge exchange preserves degree feasibility of a tour.
 *
 * A tour is considered valid here iff every node has degree exactly 2
 * after applying all removals and insertions.
 *
 * Connectivity is not checked.
 */
export class EdgeExchangeValidator {
    /**
     * @param edgeExchange 
     * @param nodesCount 
     * @returns true iff <edgExchange> is tour-valid.
     */
    public static isTourValid(edgeExchange: EdgeExchange, nodesCount: number): boolean {
        const degreeByNode = new Array(nodesCount).fill(2);

        for(const rmEdge of edgeExchange.removals) {
            degreeByNode[rmEdge.node1]--;
            degreeByNode[rmEdge.node2]--;
        }

        for(const insEdge of edgeExchange.insertions) {
            degreeByNode[insEdge.node1]++;
            degreeByNode[insEdge.node2]++;
        }

        return degreeByNode.every(deg => deg === 2 );
    }
}
