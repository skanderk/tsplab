/*
 * @Author: Skander Kort 
 * @Date: 2025-12-14 05:00:21 
 * @Last Modified by: Skander Kort
 * @Last Modified time: 2025-12-14 06:47:00
 */

import { describe, it, expect } from "vitest";

import { Edge } from "../../../src/tsp/models/graph-types";
import { EdgeError, InvalidNodeError } from "../../../src/tsp/validators/errors";

describe('Edge', () => {
    describe('constructor', () => {
        it('creates a new Edge and normalizes presentation', () => {
            const n1 = 10;
            const n2 = 4;

            const edge = new Edge(n1, n2)

            expect(edge.node1).to.equal(n2);
            expect(edge.node2).to.equal(n1);
        });

        it('throws when either node is invalid', () => {
            expect(() => new Edge(3, -5)).toThrow(InvalidNodeError);
            expect(() => new Edge(-3, 5)).toThrow(InvalidNodeError);
        });

        it('throws when trying to create a loop', () => {
            expect(() => new Edge(6, 6)).toThrow(EdgeError);
        });
    });

    describe('isIncidentTo', () => {
        it('returns true when an edge is incident to some node', () => {
            const edge = new Edge(5, 100)

            const isIncident1 = edge.isIncidentTo(5);
            const isIncident2 = edge.isIncidentTo(100);

            expect(isIncident1).to.be.true
            expect(isIncident2).to.be.true
        });

        it('returns false when an edge is not incident to some node', () => {
            const edge = new Edge(5, 100);

            const isIncident = edge.isIncidentTo(23);

            expect(isIncident).to.be.false
        });
    });

    describe('getOther', () => {
        it('returns the other node incident to an edge', () => {
            const edge = new Edge(5, 100);

            const other1 = edge.getOther(5);
            const other2 = edge.getOther(100);

            expect(other1).to.equal(100);
            expect(other2).to.equal(5);
        });

        it('throws if the argument node is not incident to the edge', () => {
            const edge = new Edge(5, 100);

            expect(() => edge.getOther(66)).toThrow(EdgeError);
        });
    });

    describe('equals', () => {
        it('returns true if two edges are equal', () => {
            const edge1 = new Edge(5, 100);
            const edge2 = new Edge(5, 100);

            const isEqualTo = edge1.equals(edge2);

            expect(isEqualTo).to.be.true;
        });

        it('returns true when comparing edge to itself', () => {
            const edge = new Edge(5, 100);

            expect(edge.equals(edge)).to.be.true;
        });

        it('returns true if two edges are equal regardless of edge orientation', () => {
            const edge1 = new Edge(5, 100);
            const edge2 = new Edge(100, 5);

            const isEqualTo = edge1.equals(edge2);

            expect(isEqualTo).to.be.true;
        });

        it('returns false if two edges are not equal', () => {
            const edge1 = new Edge(5, 100);
            const edge2 = new Edge(5, 89);

            const isEqualTo = edge1.equals(edge2);

            expect(isEqualTo).to.be.false;
        });
    });

    describe('hash', () => {
        it('returns the hash of an edge', () => {
            const edge = new Edge(5, 100);

            const hash = edge.hash();

            expect(hash).to.equal('5-100');
        });

        it('returns the hash of an edge regardless of edge orientation', () => {
            const edge = new Edge(100, 5);

            const hash = edge.hash();

            expect(hash).to.equal('5-100');
        });

        it('returns same hash for equal edges', () => {
            const edge1 = new Edge(5, 100);
            const edge2 = new Edge(100, 5);
            
            expect(edge1.hash()).to.equal(edge2.hash());
        });
    });

    describe('toString', () => {
        it('returns the string representation of an edge', () => {
            const edge = new Edge(5, 100);

            const str = edge.toString();

            expect(str).to.equal('Edge(5, 100)');
        });

        it('returns the string representation of an edge regardless of edge orientation', () => {
            const edge = new Edge(100, 5);

            const str = edge.toString();

            expect(str).to.equal('Edge(5, 100)');
        });
    });
});

