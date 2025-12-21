/*
 * Author: Skander Kort
 * Created: 2025-11-27 15:54:24
 * Modified: 2025-12-21 06:02:07
 * 
 * Licensed under the Apache License, Version 2.0
 */


import { TspInstanceError } from "../validators/errors";
import type { Cost, CostMatrix } from "./cost-matrix";

/**
 * An instance of the TSP.
 */
export class TspInstance {
    public constructor(
        readonly name: string,
        readonly description: string,
        readonly nodesCount: number,
        readonly bestSolutionCost: Cost,
        readonly costs: CostMatrix) {
        if (name.length === 0) {
            throw new TspInstanceError('TSP instance name cannot be empty!');
        }

        if (nodesCount <= 2) {
            throw new TspInstanceError(`Number of nodes must be greater than 2, got ${nodesCount}!`);
        }

        if (bestSolutionCost <= 0) {
            throw new TspInstanceError(`Best know solution cost must be positive, got ${bestSolutionCost}!`);
        }

        if (costs.order !== nodesCount) {
            throw new TspInstanceError(
                `Cost matrix order (${costs.order}) must match nodes count (${nodesCount})!`
            );
        }
    }
}
