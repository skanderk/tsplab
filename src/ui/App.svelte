<script lang="ts">
  import About from "./components/About.svelte";
  import Banner from "./components/Banner.svelte";
  import CostChart from "./components/CostChart.svelte";
  import Metrics from "./components/Metrics.svelte";
  import OptOperatorsConfig from "./components/OptOperatorsConfig.svelte";
  import RunSummary from "./components/RunSummary.svelte";
  import SolverConfig from "./components/SolverConfig.svelte";
  import TourGraph from "./components/TourGraph.svelte";

  
</script>

<div class="w-full py-10 px-4">
  <div
    class="w-full max-w-[1200px] mx-auto flex flex-col gap-6
              border border-slate-300 rounded-xl shadow-xl
              !bg-[#f8fafc] p-4 md:p-6"
  >
    <div class="w-full flex flex-col gap-6">
      <Banner />
      <SolverConfig />
      <OptOperatorsConfig />
    </div>

    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-1">
      <TourGraph />
      <div class="flex flex-col gap-6">
        <RunSummary />
        <CostChart />
      </div>
    </div>

    <Metrics />
    <About />
  </div>
</div>
