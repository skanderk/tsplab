
import { type Node } from "./graph-types";
import { InvalidNodeError } from "./error-types";

/**
 * Provides validation utilities for models.
 */
export class Validation {
    public static validateNode(n: Node, maxIndex?: number) {
        if (n < 0)
            throw new InvalidNodeError(`Invalid node ${n}, value must >=0!`);
        if (maxIndex !== undefined && n >= maxIndex)
            throw new InvalidNodeError(`Invalid node ${n}, value must < ${maxIndex}!`);
    }
}
