/**
 * Definitions of a digraph node and edge types.
 */

export type Node = number;

export class Edge {
    /**
     * 
     * @param s Source node.
     * @param t Target node.
     */
    constructor(public readonly s: Node, public readonly t: Node) { }
}
