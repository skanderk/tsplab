
import { type Node } from "../models/graph-types";
import { InvalidCostError, InvalidNodeError } from "./errors";
import type { Cost } from "../models/cost-matrix";

/**
 * Provides validation utilities for models.
 */
export class CoreValidator {
    public static validateNode(n: Node, maxIndex?: number) {
        if (n < 0)
            throw new InvalidNodeError(`Invalid node ${n}, value must >=0!`);
        if (maxIndex !== undefined && n >= maxIndex)
            throw new InvalidNodeError(`Invalid node ${n}, value must < ${maxIndex}!`);
    }
}
