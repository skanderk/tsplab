/*
 * Author: Skander Kort
 * Created: 2026-02-27 06:16:39
 * Modified: 2026-02-27 07:06:21
 * 
 * Licensed under the Apache License, Version 2.0
 */


import { describe, it, expect } from "vitest";
import { Tour } from "../../../src/tsp/models/tour";
import { TourLinkedList } from "../../../src/tsp/models/tour-linked-list";

describe("TourLinkedList", () => {
    describe("constructor", () => {
        it("creates a doubly-linked-list tour from a full valid tour", () => {
            const nodes = [3, 4, 1, 0, 2];
            const tour = new Tour(nodes);

            const linkedListTour = new TourLinkedList(tour);

            const expectedNext = [4, 1, 0, 2, 3];
            const expectedPrevious = [2, 3, 4, 1, 0];

            expectedNext.forEach((node, nodePosition) => {
                expect(linkedListTour.next(nodePosition)).to.equal(node);
            });

            expectedPrevious.forEach((node, nodePosition) => {
                expect(linkedListTour.previous(nodePosition)).to.equal(node);
            });
        });

        it("throws when tour is empty", () => {
            expect(() => new TourLinkedList(new Tour([]))).to.throw();
        });

        it("throws when tour has a single node", () => {
            expect(() => new TourLinkedList(new Tour([3]))).to.throw();
        });

        it("throws when tour is not a full tour", () => {
            expect(() => new TourLinkedList(new Tour([3, 4, 1]))).to.throw();
        });
    });


    describe("toTour", () => {
        it("reconstructs an equivalent Tour in visit order", () => {
            const nodes = [3, 4, 1, 0, 2, 5, 7, 6];
            const tour = new Tour(nodes);
            const linkedListTour = new TourLinkedList(tour);

            const reconstructedTour = linkedListTour.toTour();
            
            expect(reconstructedTour.nodes).to.deep.equal(nodes);   
        });
    });

    describe("size", () => {
        it("returns the number of nodes in the tour", () => {
            const nodes = [3, 4, 1, 0, 2, 5, 7, 6];
            const tour = new Tour(nodes);

            const linkedListTour = new TourLinkedList(tour);

            expect(linkedListTour.size()).to.equal(nodes.length);
        });
    });
});
