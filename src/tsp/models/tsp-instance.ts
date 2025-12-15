/*
 * Author: Skander Kort
 * Created: 2025-11-27 15:54:24
 * Modified: 2025-12-15 04:41:01
 * 
 * Licensed under the Apache License, Version 2.0
 */


import type { Cost, CostMatrix } from "./cost-matrix";

class TspInstance {
    public constructor(
        readonly name: string,
        readonly description: string,
        readonly nodesCount: number,
        readonly bestSolutionCost: Cost,
        costs: CostMatrix) {

    }
}
