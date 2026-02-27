/*
 * Author: Skander Kort
 * Created: 2026-01-19 20:46:18
 * Modified: 2026-01-19 22:15:20
 * 
 * Licensed under the Apache License, Version 2.0
 */


import Ajv from "ajv";
import { TspInstanceError } from "../errors";

/**
 * Validator for TSP instance JSON data.
 */
export class TspInstanceValidator {
    public static validate(obj: object): void {
        const ajv = new Ajv({ coerceTypes: true });
        const schema = {
            type: "object",
            properties: {
                name: { type: "string" },
                comment: { type: "string" },
                dimension: { type: "number" },
                bestKnownCost: { type: "number" },
                distancesMatrix: {
                    "type": "array",
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "number"
                        }
                    }
                }
            },
            required: ["name", "comment", "dimension", "bestKnownCost", "distancesMatrix"],
            additionalProperties: true,
        };

        const validate = ajv.compile(schema);
        const valid = validate(obj);

        

        if (!valid) {
            const errors = validate.errors?.map(err => err.message); 
            throw new TspInstanceError(`Invalid JSON: ${errors}`);
        }
    }
}
