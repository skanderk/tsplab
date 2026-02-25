import { type Node } from "./graph-types";
import { Tour  }  from "./tour";
import { TourError } from "../errors";

/**
 * A tour node, emulates a doubly linked list. Allows the implementation of moves.
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
        const size = tour.nodes.length;
        if (!tour.isFullTour(size)) {
            throw new TourError(`Tour must be a full tour to be converted to a linked list!`);
        }   
        
        this.nodes = Array.from(tour.nodes, (nodeIdx, i) => ({ id: nodeIdx, next: (i + 1) % size, previous: (i - 1 + size) % size}));
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
}
