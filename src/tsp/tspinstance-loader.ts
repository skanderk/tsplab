/*
 * Author: Skander Kort
 * Created: 2025-12-24 12:01:15
 * Modified: 2025-12-24 13:16:39
 * 
 * Licensed under the Apache License, Version 2.0
 */


import { TspInstanceLoaderError } from "./errors";
import type { TspInstance } from "./models/tsp-instance";
import { TspInstanceFactory } from "./tspinstance-factory";

const DEFAULT_BASE_URL = 'https://raw.githubusercontent.com/skanderk/tsplib-json/refs/heads/main/benchmarks/json/';

/**
 * Loader class for fetching TSP instances from a remote repository.
 * 
 * Precondition: Assumes that the underlying environment supports the Fetch API.
 */ 
export class TspInstanceLoader {

    private baseUrl: string;

    public constructor(baseUrl: string) {
        this.baseUrl = baseUrl.trim().replace(/\/$/, "");
    }

    public async load(instanceName: string): Promise<TspInstance> {
        const uri = `${this.baseUrl}/${instanceName}.json`;
        const response = await fetch(uri);

        if (!response.ok) {
            throw new TspInstanceLoaderError(`Failed to load ${instanceName} (${response.status})`);
        }

        const json = await response.json();
        const instance = TspInstanceFactory.createFromJson(JSON.stringify(json));

        return instance;
    }
}
