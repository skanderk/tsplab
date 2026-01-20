/*
 * Author: Skander Kort
 * Created: 2026-01-19 21:01:07
 * Modified: 2026-01-19 23:54:51
 * 
 * Licensed under the Apache License, Version 2.0
 */


import { describe, it, expect, beforeEach } from 'vitest';
import { TspInstanceFactory } from '../../src/tsp/tspinstance-factory';
import { TspInstanceError } from '../../src/tsp/errors';

describe('TspInstanceFactory', () => {
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

    it('creates TspInstance from valid JSON', () => {
        const json = JSON.stringify(tspInstObj);

        const instance = TspInstanceFactory.createFromJson(json);

        expect(instance.name).toBe("sample");
        expect(instance.description).toBe("This is a sample TSP instance");
        expect(instance.nodesCount).toBe(4);
        expect(instance.bestSolutionCost).toBe(10);
        const instanceCostsMatrix = instance.costs
        expect(instanceCostsMatrix.cost(0, 1)).toBe(3);
        expect(instanceCostsMatrix.cost(3, 2)).toBe(23);
    });

    it('throws when "name" property is missing', () => {
        delete tspInstObj['name'];
        const json = JSON.stringify(tspInstObj);

        expect(() => TspInstanceFactory.createFromJson(json)).toThrow(TspInstanceError);
    });

    it('throws when "comment" property is missing', () => {
        delete tspInstObj['comment'];
        const json = JSON.stringify(tspInstObj);

        expect(() => TspInstanceFactory.createFromJson(json)).toThrow(TspInstanceError);
    });

    it('throws when "dimension" property is missing', () => {
        delete tspInstObj['dimension'];
        const json = JSON.stringify(tspInstObj);

        expect(() => TspInstanceFactory.createFromJson(json)).toThrow(TspInstanceError);
    });

    it('throws when "bestSolutionCost" property is missing', () => {
        delete tspInstObj['bestSolutionCost'];
        const json = JSON.stringify(tspInstObj);

        expect(() => TspInstanceFactory.createFromJson(json)).toThrow(TspInstanceError);
    });

    it('throws when "distancesMatrix" property is missing', () => {
        delete tspInstObj['distancesMatrix'];
        const json = JSON.stringify(tspInstObj);

        expect(() => TspInstanceFactory.createFromJson(json)).toThrow(TspInstanceError);
    });
});
