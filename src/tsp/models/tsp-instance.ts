/*
 * @Author: Skander Kort 
 * @Date: 2025-12-14 05:02:45 
 * @Last Modified by:   Skander Kort 
 * @Last Modified time: 2025-12-14 05:02:45 
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
