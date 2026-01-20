/*
 * Author: Skander Kort
 * Created: 2026-01-19 22:22:21
 * Modified: 2026-01-19 23:55:48
 * 
 * Licensed under the Apache License, Version 2.0
 */



import { describe, it, expect, beforeEach } from 'vitest';
import { TspInstanceValidator } from '../../../src/tsp/validators/tspinstance-validator';

describe('TspInstanceValidator', () => {
    let tspInstObj: any;

    beforeEach(() => {
        tspInstObj = {
            name: "sample",
            comment: "This is a sample TSP instance",
            dimension: 4,
            bestSolutionCost: 10,
            distancesMatrix: [
                [3, 1, 2],
                [4, 3],
                [23]
            ]
        }
    });

    it('accepts valid TSP instance JSON', () => {
        expect(() => TspInstanceValidator.validate(tspInstObj)).not.toThrow();
    });

    it('throws when "name" property is missing', () => {
        delete tspInstObj['name'];

        expect(() => TspInstanceValidator.validate(tspInstObj)).toThrow();
        expect(() => TspInstanceValidator.validate(tspInstObj)).toThrow(/must have required property 'name'/);
    });

    it('throws when "comment" property is missing', () => {
        delete tspInstObj['comment'];

        expect(() => TspInstanceValidator.validate(tspInstObj)).toThrow();
        expect(() => TspInstanceValidator.validate(tspInstObj)).toThrow(/must have required property 'comment'/);
    });
    
    it('throws when "dimension" property is missing', () => {
        delete tspInstObj['dimension'];     

        expect(() => TspInstanceValidator.validate(tspInstObj)).toThrow();
        expect(() => TspInstanceValidator.validate(tspInstObj)).toThrow(/must have required property 'dimension'/);
    }); 
    it('throws when "bestSolutionCost" property is missing', () => {
        delete tspInstObj['bestSolutionCost'];     

        expect(() => TspInstanceValidator.validate(tspInstObj)).toThrow();
        expect(() => TspInstanceValidator.validate(tspInstObj)).toThrow(/must have required property 'bestSolutionCost'/);
    }); 
    it('throws when "distancesMatrix" property is missing', () => {
        delete tspInstObj['distancesMatrix'];

        expect(() => TspInstanceValidator.validate(tspInstObj)).toThrow();
        expect(() => TspInstanceValidator.validate(tspInstObj)).toThrow(/must have required property 'distancesMatrix'/);
    }); 
});
