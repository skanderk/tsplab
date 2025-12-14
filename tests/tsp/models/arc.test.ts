/*
 * @Author: Skander Kort 
 * @Date: 2025-12-14 06:47:50 
 * @Last Modified by: Skander Kort
 * @Last Modified time: 2025-12-14 07:06:13
 */

import { describe, it, expect } from "vitest";
import { Arc } from "../../../src/tsp/models/graph-types";
import { InvalidNodeError, ArcError } from "../../../src/tsp/validators/errors";


describe('Arc', () => {
    describe('constructor', () => {
        it('creates a new Arc', () => {
            const s = 10;
            const t = 4;

            const arc = new Arc(s, t);

            expect(arc.source).to.equal(s);
            expect(arc.target).to.equal(t);
        });

        it('throws when either node is invalid', () => {
            expect(() => new Arc(3, -5)).toThrow(InvalidNodeError);
            expect(() => new Arc(-3, 5)).toThrow(InvalidNodeError);
        });

        it('throws when trying to create a loop', () => {
            expect(() => new Arc(6, 6)).toThrow(ArcError);
        });
    });

    describe('equals', () => {
        it('returns true if two arcs are equal', () => {
            const arc1 = new Arc(5, 100);
            const arc2 = new Arc(5, 100);

            const isEqualTo = arc1.equals(arc2);

            expect(isEqualTo).to.be.true;
        });

        it('returns true when comparing arc to itself', () => {
            const arc = new Arc(5, 100);

            expect(arc.equals(arc)).to.be.true;
        });

        it('returns false if two arcs are not equal', () => {
            const arc1 = new Arc(5, 100);
            const arc2 = new Arc(5, 89);

            const isEqualTo = arc1.equals(arc2);

            expect(isEqualTo).to.be.false;
        });

        it('returns false if two arcs have reversed direction', () => {
            const arc1 = new Arc(5, 100);
            const arc2 = new Arc(100, 5);
    
            const isEqualTo = arc1.equals(arc2);
    
            expect(isEqualTo).to.be.false;
        });
    });

    describe('hash', () => {
        it('returns the hash of an arc', () => {
            const arc = new Arc(5, 100);

            const hash = arc.hash();

            expect(hash).to.equal('5→100');
        });

    
        it('returns same hash for equal arcs', () => {
            const arc1 = new Arc(5, 100);
            const arc2 = new Arc(5, 100);
            
            expect(arc1.hash()).to.equal(arc2.hash());
        });

        it('returns different hash for arcs with reversed direction', () => {
            const arc1 = new Arc(5, 100);
            const arc2 = new Arc(100, 5);
            
            expect(arc1.hash()).to.not.equal(arc2.hash());
        });
    });

    describe('toString', () => {
        it('returns the string representation of an arc', () => {
            const arc = new Arc(5, 100);

            const str = arc.toString();

            expect(str).to.equal('Arc(5 → 100)');
        });
        
        it('returns different string representation for reversed arcs', () => {
            const arc1 = new Arc(5, 100);
            const arc2 = new Arc(100, 5);
            
            expect(arc1.toString()).to.equal('Arc(5 → 100)');
            expect(arc2.toString()).to.equal('Arc(100 → 5)');
        });
    });
});