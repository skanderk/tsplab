/**
 * Cost of an edge.
 */

import type { Node } from "./graph-types";
import { InvalidNodeError, EmptyCostMatrixError } from "./error-types";

export type Cost = number;

/**
 * Represents the upper right half (excluding the main diagonal) of edge-costs matrix. By convention, cost(i, i) = 0.
 */
export class CostMatrix {
    /**
     * 
     * @param costs Upper right half of the costs matrix. 
     * Example: Given complete graph K4 with node numbers starting from 0 and costs [[12,23,5], [85, 27], [99]], we have cost(0, 1) = 12,
     * cost(0, 3) = 5 and cost(1, 3) = 27 and cost(2, 3) = 99. 
     * 
     * @throws EmptyCostMatrix when costs is empty.
     */
    constructor(private readonly costs: ReadonlyArray<ReadonlyArray<Cost>>) { 
        if (costs.length == 0)
            throw new EmptyCostMatrixError(); 
    }

    /**
     * 
     * @returns cost of edge (i, j), assuming that the cost matrix is symmetric.
     */
    public cost(i: Node, j: Node): Cost {
        this.validateNode(i);
        this.validateNode(j);

        if (i === j) return 0;
        return i < j ? this.costs[i][j - i - 1] : this.costs[j][i - j - 1];
    }

    private validateNode(n: Node) {
        if (n < 0 || n >= this.order())
            throw new InvalidNodeError(`Invalid node ${n}, value must >=0 and < ${this.order()}!`)
    }

    /**
     * 
     * @returns  Number of rows (columns) of the full cost matrix.
     */
    public order(): number {
        return this.costs.length + 1;
    }
}
