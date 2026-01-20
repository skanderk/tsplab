/*
 * Author: Skander Kort
 * Created: 2026-01-20 16:35:42
 * Modified: 2026-01-20 17:41:11
 * 
 * Licensed under the Apache License, Version 2.0
 */


import { describe, it, expect } from "vitest";
import { TourSegment } from '../../../src/tsp/models/tour-segment';
import { TourSegmentError } from '../../../src/tsp/errors';
import { CostMatrix } from '../../../src/tsp/models/cost-matrix';



// High-level test stub
describe('TourSegment', () => {
    describe('constructor', () => {
        it('should create an empty TourSegment', () => {

            const segment = new TourSegment([], 6);

            expect(segment.size).to.equal(0);
            expect(segment.isEmpty()).to.be.true;
        });

        it('should create a TourSegment with valid nodes', () => {
            const segment = new TourSegment([0, 3, 5], 6);

            expect(segment.size).to.equal(3);
        });

        it('should throw when a Node is invalid', () => {


            expect(() => new TourSegment([0, 3, 99], 6)).to.throw(TourSegmentError);
            expect(() => new TourSegment([0, -45, 99], 6)).to.throw(TourSegmentError);
        });
    });

    describe('addNodeAtStart', () => {
        it('should add a node at the start of the segment', () => {
            const segment = new TourSegment([1, 3, 5], 6);

            segment.addNodeAtStart(2);

            const nodes = segment.getNodes();
            expect(nodes[0]).to.equal(2);
            expect(nodes[1]).to.equal(1);
            expect(nodes[2]).to.equal(3);
            expect(nodes[3]).to.equal(5);
        });

        it('should add a node at the start of an empty segment', () => {
            const segment = new TourSegment([], 6);

            segment.addNodeAtStart(2);

            const nodes = segment.getNodes();
            expect(nodes[0]).to.equal(2);
            expect(segment.size).to.equal(1);
        });

        it('should throw when node invalid', () => {
            const segment = new TourSegment([1, 3, 5], 6);

            expect(() => segment.addNodeAtStart(99)).to.throw(TourSegmentError);
        });

        it('should throw when segment is at capacity', () => {
            const segment = new TourSegment([1, 3, 5, 0, 2, 4, 6], 6);

            expect(() => segment.addNodeAtStart(0)).to.throw(TourSegmentError);
        });
    });

    describe('addNodeAtEnd', () => {
        it('should add a node at the end of the segment', () => {
            const segment = new TourSegment([1, 3, 5], 6);

            segment.addNodeAtEnd(2);
            const nodes = segment.getNodes();

            expect(nodes[0]).to.equal(1);
            expect(nodes[1]).to.equal(3);
            expect(nodes[2]).to.equal(5);
            expect(nodes[3]).to.equal(2);
        });


        it('should add a node at the end of an empty segment', () => {
            const segment = new TourSegment([], 6);

            segment.addNodeAtEnd(2);

            const nodes = segment.getNodes();
            expect(nodes[0]).to.equal(2);
            expect(segment.size).to.equal(1);
        });


        it('should throw when node invalid', () => {
            const segment = new TourSegment([1, 3, 5], 6);

            expect(() => segment.addNodeAtEnd(99)).to.throw(TourSegmentError);
        });

        it('should throw when segment is at capacity', () => {
            const segment = new TourSegment([1, 3, 5, 0, 2, 4, 6], 6);

            expect(() => segment.addNodeAtEnd(0)).to.throw(TourSegmentError);
        });
    });


    describe('size', () => {
        it('should correctly report the segment size', () => {
            const segment = new TourSegment([4, 0, 5, 3], 6);

            const size = segment.size;

            expect(size).to.equal(4);
        });

        it('should return 0 if segment is empty', () => {
            const segment = new TourSegment([], 6);

            const size = segment.size;

            expect(size).to.equal(0);
        });
    });

    describe('isEmpty', () => {
        it('should return false if segment is not empty', () => {
            const segment = new TourSegment([4, 0, 5, 3], 6);

            expect(segment.isEmpty()).to.be.false;
        });

        it('should return true if segment is empty', () => {
            const segment = new TourSegment([], 6);

            expect(segment.isEmpty()).to.be.true;
        });
    });

    describe('coversAllNodes', () => {
        it('should return false if segment does not cover all nodes', () => {
            const segment = new TourSegment([4, 0, 5, 3], 6);

            expect(segment.coversAllNodes()).to.be.false;
        });

        it('should return true if segment covers all nodes', () => {
            const segment = new TourSegment([4, 0, 5, 3, 1, 2, 6], 6);

            expect(segment.coversAllNodes()).to.be.true;
        });
    });

    describe('nextNodeIndex', () => {
        it('should return the next node in the segment', () => {
            const segment = new TourSegment([4, 0, 5, 3], 6);

            expect(segment.nextNodeIndex(0)).to.equal(1);
            expect(segment.nextNodeIndex(1)).to.equal(2);
            expect(segment.nextNodeIndex(2)).to.equal(3);
            expect(segment.nextNodeIndex(3)).to.equal(null);
        });

        it('should throw for invalid node index', () => {
            const segment = new TourSegment([4, 0, 5, 3], 6);

            expect(() => segment.nextNodeIndex(-1)).to.throw(TourSegmentError);
            expect(() => segment.nextNodeIndex(99)).to.throw(TourSegmentError);
        });
    });

    describe('previousNodeIndex', () => {
        it('should return the previous node in the segment', () => {
            const segment = new TourSegment([4, 0, 5, 3], 6);

            expect(segment.previousNodeIndex(0)).to.equal(null);
            expect(segment.previousNodeIndex(1)).to.equal(0);
            expect(segment.previousNodeIndex(2)).to.equal(1);
            expect(segment.previousNodeIndex(3)).to.equal(2);
        });

        it('should throw for invalid node index', () => {
            const segment = new TourSegment([4, 0, 5, 3], 6);

            expect(() => segment.previousNodeIndex(-1)).to.throw(TourSegmentError);
            expect(() => segment.previousNodeIndex(99)).to.throw(TourSegmentError);
        });
    });


    describe('cost', () => {
        it('should calculate the correct cost of the segment', () => {
            const segment = new TourSegment([0, 2, 3, 5], 6);
            const costs = [
                [12, 23, 5, 34, 10, 21],
                [85, 27, 6, 4, 23],
                [56, 23, 65, 2],
                [99, 12, 7],
                [8, 76],
                [45]];

            const costMatrix = new CostMatrix(costs);

            const cost = segment.cost(costMatrix);

            // Expected cost: 0->2 (23) + 2->3 (56) + 3->5 (12) = 91
            expect(cost).to.equal(91);
        });
    });

    describe('getNodes', () => {
        it('should return a copy of nodes', () => {
            const segment = new TourSegment([2, 3], 6);

            const nodes = segment.getNodes();

            expect(nodes).to.deep.equal([2, 3]);
        });
    });
});
