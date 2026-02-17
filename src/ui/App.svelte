<script lang="ts">
  import About from "./components/About.svelte";
  import Banner from "./components/Banner.svelte";
  import CostChart from "./components/CostChart.svelte";
  import Metrics from "./components/Metrics.svelte";
  import OptOperatorsConfig from "./components/OptOperatorsConfig.svelte";
  import RunSummary from "./components/RunSummary.svelte";
  import SolverConfig from "./components/SolverConfig.svelte";
  import TourGraph from "./components/TourGraph.svelte";
    import type { SolverConfigProps } from "./state/dtos";
  
  // Initial states
  import {initSolverConfig} from "./state/initial-states";

  // States - DTOs
  let solverConfig = $state<SolverConfigProps>(initSolverConfig);

  // Callback properties
  function onSolverConfigChange(newConfig: SolverConfigProps): void {
    Object.assign(solverConfig, newConfig);
  }

  function onTspInstanceChange(newTspInstance: string): void {
    solverConfig.tspInstance = newTspInstance;
  }

</script>

<div class="w-full py-10 px-4">
  <div
    class="w-full max-w-[1200px] mx-auto flex flex-col gap-6
              border border-slate-300 rounded-xl shadow-xl
              !bg-[#f8fafc] p-4 md:p-6"
  >
    <div class="w-full flex flex-col gap-6">
      <Banner />
      <SolverConfig
        config={solverConfig}
        onConfigChange={onSolverConfigChange}
        onTspInstanceChange={onTspInstanceChange}
      />
      <OptOperatorsConfig />
    </div>

    <div class="w-full flex flex-col gap-6 my-1">
      <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <TourGraph />
        <CostChart />
      </div>
      <RunSummary />
    </div>

    <Metrics />
    <About />
  </div>
</div>
