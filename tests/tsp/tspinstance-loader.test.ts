/*
 * Author: Skander Kort
 * Created: 2026-01-19 19:40:47
 * Modified: 2026-01-19 23:55:07
 * 
 * Licensed under the Apache License, Version 2.0
 */


import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TspInstanceLoader } from '../../src/tsp/tspinstance-loader';
import { TspInstanceLoaderError } from '../../src/tsp/errors';

describe('TspInstanceLoader', () => {
    let loader: TspInstanceLoader;

    beforeEach(() => {
        loader = new TspInstanceLoader('https://example.com');
        globalThis.fetch = vi.fn();
        vi.clearAllMocks();
    });

    it('loads a TSP instance successfully', async () => {
        const mockResponse = {
            ok: true,
            json: async () => ({
                name: "sample",
                comment: "This is a sample TSP instance",
                dimension: 4,
                bestSolutionCost: 10,
                distancesMatrix: [
                    [3, 1, 2],
                    [4, 3],
                    [23]
                ]
            })
        };
        (globalThis.fetch as unknown as vi.Mock).mockResolvedValue(mockResponse);

        const instance = await loader.load('sample');

        expect(instance.name).toBe("sample");
        expect(instance.description).toBe("This is a sample TSP instance");
        expect(instance.nodesCount).toBe(4);
        expect(instance.bestSolutionCost).toBe(10);
    });

    it('throws TspInstanceLoaderError when fetch fails', async () => {
        (fetch as unknown as vi.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404
        });

        await expect(loader.load('missing-instance')).rejects.toThrow(TspInstanceLoaderError);
    });

    it('throws when TspInstanceFactory fails', async () => {
        const invalidJson = { foo: 'bar' };

        (fetch as unknown as vi.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => invalidJson
        });

        await expect(loader.load('invalid-instance')).rejects.toThrow();
    });
});
