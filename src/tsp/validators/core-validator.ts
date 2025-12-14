/*
 * @Author: Skander Kort 
 * @Date: 2025-12-14 05:02:59 
 * @Last Modified by:   Skander Kort 
 * @Last Modified time: 2025-12-14 05:02:59 
 */

import { type Node } from "../models/graph-types";
import { InvalidCostError, InvalidNodeError } from "./errors";

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
