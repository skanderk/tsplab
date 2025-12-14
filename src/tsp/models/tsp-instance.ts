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
