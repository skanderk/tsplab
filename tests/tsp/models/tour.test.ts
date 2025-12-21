/*
 * Author: Skander Kort
 * Created: 2025-12-19 07:01:29
 * Modified: 2025-12-21 05:35:11
 * 
 * Licensed under the Apache License, Version 2.0
 */


import { beforeEach, describe, it, expect } from "vitest";

import { Arc, type Node } from "../../../src/tsp/models/graph-types";
import { CostMatrix } from "../../../src/tsp/models/cost-matrix";
import { Tour } from "../../../src/tsp/models/tour";
import { TourError } from "../../../src/tsp/validators/errors";

describe('Tour', () => {
    let nodes: Array<Node>;

    beforeEach(() => {
        nodes = [3, 7, 1, 9, 0, 5, 8, 2, 6, 4];
    });


    describe('constructor', () => {
        it('creates a new tour', () => {
            const tour = new Tour(nodes);
        });

        it('throws when the tour has duplicate nodes', () => {
            nodes[1] = nodes[2];

            expect(() => new Tour(nodes)).to.throw(TourError);
            expect(() => new Tour(nodes)).to.throw(/duplicates detected/);
        });

        it('throws when the tour is empty', () => {
            expect(() => new Tour([])).to.throw(TourError);
            expect(() => new Tour([])).to.throw(/at least two nodes/);
        });

        it('throws when the tour is one node', () => {
            expect(() => new Tour([3])).to.throw(TourError);
            expect(() => new Tour([3])).to.throw(/at least two nodes/);
        });

        it('throws when the tour has invalid nodes', () => {
            nodes[4] = -8;

            expect(() => new Tour(nodes)).to.throw(TourError);
            expect(() => new Tour(nodes)).to.throw(/Node numbers must be integers within/);
        });

        it('throws when the tour has non-integer nodes', () => {
            nodes[3] = 3.14;

            expect(() => new Tour(nodes)).to.throw(TourError);
            expect(() => new Tour(nodes)).to.throw(/Node numbers must be integers within/);
        });

    });

    describe('at', () => {
        it('returns node at some position', () => {
            const tour = new Tour(nodes);
            const testPos = 4;

            const aNode = tour.at(testPos);

            expect(aNode).to.equal(tour.nodes[testPos]);
        });

        it('throws when node postion is invalid', () => {
            const tour = new Tour(nodes);
            const testPos = -23;

            expect(() => tour.at(testPos)).to.throw(TourError);
            expect(() => tour.at(testPos)).to.throw(/Invalid node position/);
        });
    });

    describe('next', () => {
        it('returns the node next to the one at some position', () => {
            const tour = new Tour(nodes);
            const testPos = 6;

            const nextNode = tour.next(testPos);

            expect(nextNode).to.equal(tour.nodes[testPos + 1]);
        });

        it('returns the first node in the tour if at last position', () => {
            const tour = new Tour(nodes);
            const testPos = nodes.length - 1;

            const nextNode = tour.next(testPos);

            expect(nextNode).to.equal(tour.nodes[0]);
        });

        it('throws when node postion is invalid', () => {
            const tour = new Tour(nodes);
            const testPos = -23;

            expect(() => tour.next(testPos)).to.throw(TourError);
            expect(() => tour.next(testPos)).to.throw(/Invalid node position/);
        });
    });

    describe('previous', () => {
        it('returns the node previous to the one at some position', () => {
            const tour = new Tour(nodes);
            const testPos = 6;

            const prevNode = tour.previous(testPos);

            expect(prevNode).to.equal(tour.nodes[testPos - 1]);
        });

        it('returns the last node in the tour if at first position', () => {
            const tour = new Tour(nodes);
            const testPos = 0;

            const prevNode = tour.previous(testPos);

            expect(prevNode).to.equal(tour.nodes[nodes.length - 1]);
        });

        it('throws when node postion is invalid', () => {
            const tour = new Tour(nodes);
            const testPos = -7;

            expect(() => tour.previous(testPos)).to.throw(TourError);
            expect(() => tour.previous(testPos)).to.throw(/Invalid node position/);
        });
    });


    describe('cost', () => {
        it('returns the total cost of  a tour', () => {
            const costs = [
                [15, 23, 8, 42, 31, 19, 47, 12, 29],
                [35, 18, 52, 27, 41, 14, 33, 26],
                [48, 22, 36, 11, 39, 45, 21],
                [17, 53, 28, 44, 32, 25],
                [38, 16, 50, 24, 43],
                [20, 37, 49, 13],
                [30, 40, 51],
                [46, 34],
                [19]
            ];
    
            const costMatrix = new CostMatrix(costs);
            // tour: 3 → 7 → 1 → 9 → 0 → 5 → 8 → 2 → 6 → 4
            const tour = new Tour(nodes);
            const expectedCost = costMatrix.cost(3, 7) + costMatrix.cost(7, 1) + costMatrix.cost(1, 9) + costMatrix.cost(9, 0) +
            costMatrix.cost(0, 5) + costMatrix.cost(5, 8) + costMatrix.cost(8, 2) + costMatrix.cost(2, 6) +  costMatrix.cost(6, 4) +
            costMatrix.cost(4, 3);

            const tourCost = tour.cost(costMatrix);

            expect(tourCost).to.equal(expectedCost);

        });
    });

    describe('arcs', () => {
        it('returns all the arcs  of a tour, in order', () => {
            // tour: 3 → 7 → 1 → 9 → 0 → 5 → 8 → 2 → 6 → 4
            const tour = new Tour(nodes);
            const expectedArcs = [new Arc(3, 7),new Arc(7, 1),new Arc(1, 9),new Arc(9, 0),
            new Arc(0, 5),new Arc(5, 8),new Arc(8, 2),new Arc(2, 6), new Arc(6, 4) ,
            new Arc(4, 3)];
            

            expect(expectedArcs).toStrictEqual(tour.arcs);
        });
    });

    describe('first', () => {
        it('returns the first node visited in a tour', () => {
            // tour: 3 → 7 → 1 → 9 → 0 → 5 → 8 → 2 → 6 → 4
            const tour = new Tour(nodes);
            
            expect(tour.first).to.equal(3);
        });
    });

    describe('last', () => {
        it('returns the last node visited in a tour', () => {
            // tour: 3 → 7 → 1 → 9 → 0 → 5 → 8 → 2 → 6 → 4
            const tour = new Tour(nodes);
            
            expect(tour.last).to.equal(4);
        });
    });
})
