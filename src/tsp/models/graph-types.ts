/*
 * Author: Skander Kort
 * Created: 2025-11-21 02:55:34
 * Modified: 2025-12-15 04:40:30
 * 
 * Licensed under the Apache License, Version 2.0
 */


import { CoreValidator } from "../validators/core-validator";
import { ArcError, EdgeError } from "../validators/errors";

/**
 * A node in a graph.
 */
export type Node = number;


/**
 * An undirected edge connecting two nodes.
 * Edges are normalized so that node1 <= node2 for consistent equality checks.
 * Self-loops (node1 === node2) are not allowed.
 */
export class Edge {
    public readonly node1: Node;
    public readonly node2: Node;

    /**
     * Creates an undirected edge between two nodes.
     * @param node1 First node
     * @param node2 Second node
     * @throws {EdgeError} if either node is invalid or if node1 === node2
     */
    constructor(node1: Node, node2: Node) { 
        CoreValidator.validateNode(node1);
        CoreValidator.validateNode(node2);
        
        if (node1 === node2) {
            throw new EdgeError(`Self-loops not allowed: node ${node1}`);
        }
        
        // Normalize representation.
        this.node1 = Math.min(node1, node2);
        this.node2 = Math.max(node1, node2);
    }

    /**
     * Checks if a node is incident to this edge.
     * @param node Node to check
     * @returns true if node is one of the endpoints
     */
    public isIncidentTo(node: Node): boolean {
        return node === this.node1 || node === this.node2;
    }

    /**
     * Given one endpoint, returns the other endpoint.
     * @param node One of the endpoints
     * @returns The other endpoint
     * @throws {EdgeError} if node is not incident to this edge
     */
    public getOther(node: Node): Node {
        if (!this.isIncidentTo(node)) {
            throw new EdgeError(`Node ${node} is not incident to edge ${this.toString()}`);
        }

        return node === this.node1 ? this.node2 : this.node1;
    }

    /**
     * Checks equality with another edge.
     * @param thatEdge Edge to compare with
     * @returns true if edges connect the same nodes
     */
    public equals(thatEdge: Edge): boolean {
        return this.node1 === thatEdge.node1 && this.node2 === thatEdge.node2;
    }

    /**
     * Returns a hash string for use in collections.
     * @returns hash string
     */
    public hash(): string {
        return `${this.node1}-${this.node2}`;
    }

    /**
     * Returns string representation for debugging.
     * @returns string representation
     */
    public toString(): string {
        return `Edge(${this.node1}, ${this.node2})`;
    }
}

/**
 * A directed edge (arc) from a source node to a target node.
 * Self-loops (s === t) are not allowed.
 */
export class Arc {
    /**
     * Creates a directed edge from source to target.
     * @param source Source node
     * @param target Target node
     * @throws {ArcError} if either node is invalid or if s === t
     */
    constructor(public readonly source: Node, public readonly target: Node) { 
        CoreValidator.validateNode(source);
        CoreValidator.validateNode(target);
        
        if (source === target) {
            throw new ArcError(`Self-loops not allowed: node ${source}`);
        }
    }

    /**
     * Checks equality with another arc.
     * @param thatArc Arc to compare with
     * @returns true if arcs have same source and target
     */
    public equals(thatArc: Arc): boolean {
        return this.source === thatArc.source && this.target === thatArc.target;
    }

    /**
     * Returns a hash string for use in collections.
     * @returns hash string
     */
    public hash(): string {
        return `${this.source}→${this.target}`;
    }

    /**
     * Returns string representation for debugging.
     * @returns string representation
     */
    public toString(): string {
        return `Arc(${this.source} → ${this.target})`;
    }
}
