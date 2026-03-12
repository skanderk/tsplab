<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import About from "./components/About.svelte";
  import Banner from "./components/Banner.svelte";
  import CostChart from "./components/CostChart.svelte";
  import Metrics from "./components/Metrics.svelte";
  import OptOperatorsConfig from "./components/OptOperatorsConfig.svelte";
  import InstanceDetails from "./components/InstanceDetails.svelte";
  import LocalSearchSummary from "./components/LocalSearchSummary.svelte";
  import CostStats from "./components/CostStats.svelte";
  import SolverConfig from "./components/SolverConfig.svelte";
  import TourGraph from "./components/TourGraph.svelte";
  import type { WorkerEvent } from "../tsp/protocol/events";
  import type {
    SolverConfigProps,
    InstanceDetailsProps,
    LocalSearchSummaryProps,
    CostSummaryProps,
  } from "./state/dto";

  // Initial states
  import {
    initSolverConfig,
    initInstanceDetails,
    initLocalSearchSummary,
    initCostSummary
  } from "./state/initial-states";

  // Map of tour builder IDs to their display names
  // TODO - this should be centralized/shared between App and SolverConfig.svelte.
  export const tourBuilderDisplayNames: Record<string, string> = {
    nearestNeighbor: "Nearest Neighbor",
    farthestInsertion: "Farthest Insertion",
    randomTour: "Random",
    cheapestInsertion: "Cheapest Insertion",
    christofides: "Christofides",
  };

  // States - DTOs
  let solverConfig = $state<SolverConfigProps>(initSolverConfig);
  let instanceDetails = $state<InstanceDetailsProps>(initInstanceDetails);
  let localSearchSummary = $state<LocalSearchSummaryProps>(
    initLocalSearchSummary,
  );
  let costSummary = $state<CostSummaryProps>(initCostSummary);
  let localSearchWorker: Worker | null = null;
  let autoStartOnLoad = false;

  // Callback properties
  function onSolverConfigChange(newConfig: SolverConfigProps): void {
    Object.assign(solverConfig, newConfig);
    instanceDetails.instName = solverConfig.tspInstance;
    localSearchSummary.tourBuilderName =
      tourBuilderDisplayNames[solverConfig.tourBuilderId];
  }

  function onTspInstanceChange(newTspInstance: string): void {
    solverConfig.tspInstance = newTspInstance;
    const worker = ensureLocalSearchWorker();
    worker.postMessage({
      kind: "load-instance",
      payload: {
        instanceName: newTspInstance,
      },
    });
  }

  function ensureLocalSearchWorker(): Worker {
    if (localSearchWorker !== null) {
      return localSearchWorker;
    }

    localSearchWorker = new Worker(
      new URL("../tsp/worker/solver.worker.ts", import.meta.url),
      { type: "module" },
    );
    localSearchWorker.onmessage = (event: MessageEvent<WorkerEvent>): void => {
      const { kind, payload } = event.data ?? {};

      if (kind === "instance-loaded") {
        instanceDetails.instName = payload.name;
        instanceDetails.instDescription = payload.description;
        instanceDetails.bestKnownCost = payload.bestSolutionCost;
        if (autoStartOnLoad) {
          autoStartOnLoad = false;
          onRun();
        }
      } else if (kind === "started") {
        console.log("Local search worker started for instance");
        localSearchSummary.iteration = 0;
        localSearchSummary.appliedMovesCount = 0;
        localSearchSummary.movesEvaluatedCount = 0;
      } else if (kind === "completed") {
        localSearchSummary.iteration += 1;
      } else if (kind === "error") {
        console.error("Local search worker error:", payload);
      }
    };

    return localSearchWorker;
  }

  function onRun(): void {
    const worker = ensureLocalSearchWorker();
    worker.postMessage({
      kind: "start",
    });
  }

  onDestroy((): void => {
    localSearchWorker?.terminate();
    localSearchWorker = null;
  });

  onMount((): void => {
    localSearchSummary.tourBuilderName =
      tourBuilderDisplayNames[solverConfig.tourBuilderId];
    instanceDetails.instName = solverConfig.tspInstance;
    autoStartOnLoad = true;
    onTspInstanceChange(solverConfig.tspInstance);
  });
</script>

<div class="w-full py-10 px-4">
  <div
    class="w-full max-w-[1760px] mx-auto flex flex-col gap-6
              border border-slate-300 rounded-xl shadow-xl
              !bg-[#f8fafc] p-4 md:p-6"
  >
    <div class="w-full flex flex-col gap-6">
      <Banner />
      <SolverConfig
        config={solverConfig}
        onConfigChange={onSolverConfigChange}
        {onTspInstanceChange}
        {onRun}
      />
      <OptOperatorsConfig />
    </div>

    <div class="w-full flex flex-col gap-6 my-1">
      <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <TourGraph />
        <CostChart />
      </div>
      <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <InstanceDetails details={instanceDetails} />
        <LocalSearchSummary summary={localSearchSummary} />
        <CostStats stats={costSummary}/>
      </div>
    </div>

    <Metrics />
    <About />
  </div>
</div>
