/*
 * Author: Skander Kort
 * Created: 2026-01-19 20:01:43
 * Modified: 2026-01-19 20:36:47
 * 
 * Licensed under the Apache License, Version 2.0
 */

import { CostMatrix } from "./models/cost-matrix";
import { TspInstance } from "./models/tsp-instance";
import { TspInstanceValidator } from "./validators/tspinstance-validator";

/**
 * Factory class for creating TSP instances from JSON data.    
 */
export class TspInstanceFactory {
    /**
     *  Creates a TSP instance from a JSON string.
     * @param json 
     * @returns TspInstance
     * @throws TspInstanceError if the JSON is invalid or does not conform to the TSP instance schema.  
     */
    public static createFromJson(json: string): TspInstance {
        const parsedJson = JSON.parse(json)
        TspInstanceValidator.validate(parsedJson);

        const costsMatrix = new CostMatrix(parsedJson.distancesMatrix);
        const instance = new TspInstance(
            parsedJson.name,
            parsedJson.comment,
            parsedJson.dimension,
            parsedJson.bestKnownCost,
            costsMatrix);

        return instance;
    }
}
