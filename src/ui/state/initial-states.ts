import type { SolverConfigProps, InstanceDetailsProps, LocalSearchSummaryProps } from "./dtos";
import { tspInstances } from "./tsp-instances";

export const initSolverConfig: SolverConfigProps = {
    tspInstanceSize: "T",
    tspInstance: tspInstances["T"][1][0],
    tourBuilderId: "randomTour",
    maxIterations: 500,
    sleepDurationSec: 0.5
}

export const initInstanceDetails: InstanceDetailsProps = {
    instName: "",
    instDescription: "",
    bestKnownCost: 0,
    tourBuilderName: "Random"
}

export const initLocalSearchSummary: LocalSearchSummaryProps = {    
    iteration: 0,
    runTimeSec: 0,
    appliedOperator: "",
    moveApplied: "",
    appliedMovesCount: 0,
    movesEvaluatedCount: 0
}

export const initCostSummary = {
    initialCost: 0,
    lastCost: 0,
    lastCostDecrease: 0
}


