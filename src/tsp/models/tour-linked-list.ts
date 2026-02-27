/*
 * Author: Skander Kort
 * Created: 2026-02-25 12:59:48
 * Modified: 2026-02-27 06:10:07
 * 
 * Licensed under the Apache License, Version 2.0
 */

import { type Node } from "./graph-types";
import { Tour  }  from "./tour";
import { TourError } from "../errors";

/**
 * A tour node, emulates a doubly-linked list. Allows the implementation of efficient moves.
 */
export interface TourNode {
    id: Node,
    next: number, // index of the next node in the tour
    previous: number // index of the previous node in the tour
}

/**
 * Representation of a TSP tour as a linked list of nodes. 
 * This allows for efficient move operations (e.g. 2-opt, 3-opt, etc.).
 */
export class TourLinkedList {

    private nodes: Array<TourNode> = [];

    /**
     * 
     * @param tour A full valid TSP tour. 
     */
    public constructor(tour: Tour) {
        const nodesCount = tour.nodes.length;
        if (!tour.isFullTour(nodesCount)) {
            throw new TourError(`Tour must be a full tour to be converted to a linked list!`);
        }   
        
        this.nodes = Array.from(tour.nodes, (nodeIdx, i) => ({ id: nodeIdx, next: (i + 1) % nodesCount, previous: (i - 1 + nodesCount) % nodesCount}));
    }

    /**
     * Reconstructs a Tour from this linked list tour.
     */
    public toTour(): Tour {
        const tourNodes = Array<Node>(this.nodes.length);
        let currentNode = this.nodes[0];
        for(let i = 0; i < this.nodes.length; i++) {
            tourNodes[i] = currentNode.id;
            currentNode = this.nodes[currentNode.next];
        }

        return new Tour(tourNodes);
    }

    /**
     * @returns The next node in the tour after the given node position.
     */
    public next(nodePosition: number): Node {
        this.assertValidNodePosition(nodePosition);
        return this.nodes[this.nodes[nodePosition].next].id;   
    }

    /**
     * 
     *  @throws {TourError} if <nodePosition> is not a valid position in this tour.
     */
    private assertValidNodePosition(nodePosition: number): void {
        if (nodePosition < 0 || nodePosition >= this.nodes.length) {
            throw new TourError(`Invalid node position, position must be in [0, length(nodes)[, got ${nodePosition}!`);
        }
    }

    /**
     * @returns The previous node in the tour after a given node position.
     */
    public previous(nodePosition: number): Node {
        this.assertValidNodePosition(nodePosition);

        return this.nodes[this.nodes[nodePosition].previous].id;   
    }
    
    /**
     * 
     * @returns The number of nodes in this tour.
     */
    public size(): number {
        return this.nodes.length;
    }
}
