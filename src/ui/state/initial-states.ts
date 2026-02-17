import type { SolverConfigProps } from "./dtos";
import { tspInstances } from "./tsp-instances";

export const initSolverConfig: SolverConfigProps = {
    tspInstanceSize: "T",
    tspInstance: tspInstances["T"][1][0],
    tourBuilder: "randomTour",
    maxIterations: 500,
    sleepDurationSec: 0.5
}
