/**
 * Definitions of a digraph node and edge types.
 */

import { CoreValidator } from "../validators/core-validator";

export type Node = number;

/**
 * An undirectred edge connecting nodes <n1> and <n2>.
 */
export class Edge {
    /**
     * 
     * @param n1 Source node.
     * @param n2 Target node.
     */
    constructor(public readonly s: Node, public readonly t: Node) { 
        CoreValidator.validateNode(s);
        CoreValidator.validateNode(t);
    }
}

/**
 * A directed edge from node <s> to node <t>.
 */
export class Arc {
    /**
     * 
     * @param s Source node.
     * @param t Target node.
     */
    constructor(public readonly s: Node, public readonly t: Node) { 
        CoreValidator.validateNode(s);
        CoreValidator.validateNode(t);
    }
}
