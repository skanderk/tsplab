/*
 * Author: Skander Kort
 * Created: 2025-12-15 08:12:06
 * Modified: 2025-12-19 05:40:30
 * 
 * Licensed under the Apache License, Version 2.0
 */


import { TourError } from "../errors";
import type { CostMatrix } from "./cost-matrix";
import { Arc, type Node } from "./graph-types";


/**
 * A tour of nodes (cities) potentially partial.
 * An implementation of a tour as a sequence of nodes. 
 * This is a simple implementation that allows for easy validation and cost calculation, 
 * but does not allow for efficient move operations (e.g. 2-opt, 3-opt, etc.). For efficient move operations, see the TourLinkedList class.
 */
export class Tour {
    /**
     * 
     * @param nodes Array<Node> All nodes in this tour.
     * @throws {TourError} if tour is invalid.
     */
    public constructor(readonly nodes: readonly Node[]) {
        Tour.validate(nodes);
    }

    /**
     * Returns true if this tour is a full tour, i.e. it is a permutation of values in 0 to nodesCount - 1.
     */
    public isFullTour(nodesCount: number): boolean {
        if (nodesCount < 2) {
            throw new TourError(`Invalid nodes count, must be at least 2, got ${nodesCount}!`);
        }

        const nodes = new Set(this.nodes);
        if (nodes.size !== nodesCount) {
            return false;
        }

        for (let i = 0; i < nodesCount; i++) {
            if (!nodes.has(i)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Checks if a tour is valid.
     * 
     * @param nodes 
     * @throws {TourError} if tour is empty, has a single node, has duplicate nodes or contains invalid 
     * node numbers.
     */
    private static validate(nodes: readonly Node[]): void {
        if (nodes.length < 2) {
            throw new TourError(`A tour must contain at least two nodes, got ${nodes.length}!`);
        }

        // Check for dupicate nodes and invalid node values.
        const visitedNodes = new Set<Node>();
        const duplicateNodes: Node[] = [];

        for (const node of nodes) {
            if (node < 0 || node >= nodes.length || !Number.isInteger(node)) {
                throw new TourError(`Node numbers must be integers within [${0}, ${nodes.length - 1}], got node ${node}!`);
            }

            if (visitedNodes.has(node)) {
                duplicateNodes.push(node);
            }
            else {
                visitedNodes.add(node);
            }
        }

        if (duplicateNodes.length > 0) {
            throw new TourError(`Every node in tour must be visited only once, duplicates detected: [${duplicateNodes.join(', ')}]!`);
        }
    }

    /**
     * 
     * @param nodePosition 
     * @throws {TourError} if <nodePosition> is not a valid position in this tour.
     * @returns The node at position <nodePosition> in this tour.
     */
    public at(nodePosition: number): Node {
        this.assertValidNodePosition(nodePosition);

        return this.nodes[nodePosition];
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
     * 
     * @returns The node positions in this tour. 
     */
    public get positions(): number[] {
        return [...this.nodes.keys()];
    }

    /**
     * 
     * @param nodePosition 
     * @throws {TourError} if <nodePosition> is not a valid position in this tour.
     * @returns The node next to the one at position <nodePosition> in this tour.
     */
    public next(nodePosition: number): Node {
        this.assertValidNodePosition(nodePosition);

        return this.nodes[(nodePosition + 1) % this.nodes.length];
    }


    /**
     * 
     * @param nodePosition
     * @throws {TourError} if <nodePosition> is not a valid position in this tour.
     * @returns The node previous to the one at position <nodePosition> in this tour.
     */
    public previous(nodePosition: number): Node {
        this.assertValidNodePosition(nodePosition);

        const prevNodePos = nodePosition > 0 ? nodePosition - 1 : this.nodes.length - 1
        return this.nodes[prevNodePos];
    }

    /**
     * 
     * @returns First node in this tour.
     */
    public get first(): Node {
        return this.nodes[0];
    }

    /**
     * 
     * @returns Last node in this tour.
     */
    public get last(): Node {
        return this.nodes[this.nodes.length - 1];
    }

    /**
     * 
     * @param costs 
     * @returns Total cost of this tour.
     */
    public cost(costs: CostMatrix): number {
        const totalCost = this.positions.reduce((acc, pos) => acc + costs.cost(this.at(pos), this.next(pos)), 0) /*+ 
        costs.cost(this.last, this.first)*/

        return totalCost;
    }

    /**
     * @returns The arcs making this tour.
     */
    public get arcs(): Arc[] {
        const arcs = this.positions.map(pos => new Arc(this.at(pos), this.next(pos)));

        return arcs;
    }
}
