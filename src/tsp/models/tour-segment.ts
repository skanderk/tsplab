/*
 * Author: Skander Kort
 * Created: 2026-01-20 12:49:41
 * Modified: 2026-01-20 18:00:22
 * 
 * Licensed under the Apache License, Version 2.0
 */


import { TourSegmentError } from "../errors";
import type { CostMatrix } from "./cost-matrix";
import type { Node } from "./graph-types";

/**
 * A mutable tour segment represents a contiguous sequence of nodes in a TSP tour with efficient
 * operations to add nodes at either end.
 * 
 * Each node is identified by its index (a non-negative integer).
 * 
 * Assumption: Nodes in a segment are unique and within the range [0, maxNodeIdx].
 * 
 */
export class TourSegment {

    private readonly buffer: Node[];
    private headIdx: number;
    private tailIdx: number;

    constructor(nodes: Node[], private readonly maxNodeIdx: number) {
        const isValid = nodes.every(node => TourSegment.isValidNode(node, maxNodeIdx));
        if (!isValid) {
            throw new TourSegmentError(`Invalid node indices in TourSegment: ${nodes}. 
                Each index must be an integer between 0 and ${maxNodeIdx}.`);
        }

        this.buffer = new Array(maxNodeIdx + 1);
        for (let i = 0; i < nodes.length; i++) {
            this.buffer[i] = nodes[i];
        }

        this.headIdx = 0;
        this.tailIdx = nodes.length - 1;
    }

    private static isValidNode(node: Node, maxNodeIdx: number): boolean {
        return node >= 0 && node <= maxNodeIdx;
    }

    /**
     * Adds a node at the start of the tour segment in constant time.
     * @param node The node to add.
     * @returns The updated tour segment.
     * @throws {TourSegmentError} if the node is invalid or the segment is at capacity.
     */
    public addNodeAtStart(node: Node): TourSegment {
        if(!this.canAddNode(node)) {
            throw new TourSegmentError(`Either ${node} is invalid or the segment is at capacity`);
        }

        let newHeadIdx = this.headIdx - 1;
        if (newHeadIdx < 0) {
            newHeadIdx = this.buffer.length - 1;
        }

        this.buffer[newHeadIdx] = node;
        this.headIdx = newHeadIdx;
        // Update tailIdx if segment was previously empty
        if (this.tailIdx === -1) {
            this.tailIdx = newHeadIdx;
        }

        return this;
    }

    private canAddNode(node: Node): boolean {
        return TourSegment.isValidNode(node, this.maxNodeIdx) && !this.coversAllNodes();
    }

    /**
     * Adds a node at the end of the tour segment.  
     * @param node The node to add.
     * @returns The updated tour segment.   
     */
    public addNodeAtEnd(node: Node): TourSegment {
        if(!this.canAddNode(node)) {
            throw new TourSegmentError(`Either ${node} is invalid or the segment is at capacity`);
        }

        let newTailIdx = this.tailIdx + 1;
        if (newTailIdx >= this.buffer.length) {
            newTailIdx = 0;
        }

        this.buffer[newTailIdx] = node;
        this.tailIdx = newTailIdx;

        return this;
    }

    /**
     * Calculates the total cost of the tour segment using the provided cost matrix.    
     * @param costMatrix  The cost matrix to use for cost calculation.
     * @returns The total cost of the tour segment.        
     */
    public cost(costMatrix: CostMatrix): number {
        let totalCost = 0;
        let currentIdx = this.headIdx;
        let nextIdx = this.nextNodeIndex(currentIdx);

        while (nextIdx !== null) {
            totalCost += costMatrix.cost(this.buffer[currentIdx], this.buffer[nextIdx]);
            currentIdx = nextIdx;
            nextIdx = this.nextNodeIndex(currentIdx);
        }

        return totalCost;
    }

    /**
     * Get a copy of the nodes in the tour segment.
     */
    public getNodes(): Node[] {
        if (this.headIdx <= this.tailIdx) {
            return this.buffer.slice(this.headIdx, this.tailIdx + 1);
        } else {
            return [
                ...this.buffer.slice(this.headIdx),
                ...this.buffer.slice(0, this.tailIdx + 1)
            ];
        }   
    }


    /**
     * Get the size of the tour segment.
     */
    public get size(): number {
        if (!this.wrapsAround()) {
            return this.tailIdx - this.headIdx + 1;
        } else {
            return (this.buffer.length - this.headIdx) + (this.tailIdx + 1);
        }
    }

    /**
     * Returns true if the segment wraps around the buffer.
     */
    private wrapsAround(): boolean { 
        return this.tailIdx > -1 && this.headIdx > this.tailIdx;
    } 
    
    /**
     * Returns true if the segment is empty.
     */
    public isEmpty(): boolean {
        return this.size === 0;
    }   

    /**
     * Returns true if the segment covers all possible nodes.
     */
    public coversAllNodes(): boolean {
        return this.size === this.buffer.length;
    }

    /**
     * Returns the next node index in the segment after the given node index, or null if at the end.
     * @param nodeIdx The current node index in the segment.
     */
    public nextNodeIndex(nodeIdx: number): Node | null {
        if(!this.isValidNodeIndex(nodeIdx)) {
            throw new TourSegmentError(`Node index ${nodeIdx} is not valid in the current segment.`);
        }

       if (nodeIdx === this.tailIdx) {
           return null;
       }

       const nextIdx = (nodeIdx + 1) % this.buffer.length;
       return nextIdx;
    }

    private isValidNodeIndex(nodeIdx: number): boolean {
        if (nodeIdx < 0 || nodeIdx >= this.buffer.length) {
            return false;
        }

        if (!this.wrapsAround()) {
            return nodeIdx >= this.headIdx && nodeIdx <= this.tailIdx;
        } else {
            return nodeIdx >= this.headIdx || nodeIdx <= this.tailIdx;
        }
    }

    /**
     * Returns the previous node index in the segment before the given node index, or null if at the start.
     * @param nodeIdx The current node index in the segment.
     */
    public previousNodeIndex(nodeIdx: number): Node | null {
        if(!this.isValidNodeIndex(nodeIdx)) {
            throw new TourSegmentError(`Node index ${nodeIdx} is not valid in the current segment.`);
        }

        if (nodeIdx === this.headIdx) {
            return null;
        }

        let prevIdx = nodeIdx - 1;  
        if (prevIdx < 0) {
            prevIdx = this.buffer.length - 1;
        }

        return prevIdx;
    }
}
