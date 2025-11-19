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

<div
  class="w-screen flex flex-col items-center py-10
            border border-gray-300 rounded-xl shadow-xl
            !bg-[#fdfcf5]"
>
  <div class="w-full flex flex-col items-center gap-6 max-w-[900px] mx-auto">
    <Banner />

    <SolverConfig />

    <OptOperatorsConfig />
  </div>

  <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
    <TourGraph />

    <div class="flex flex-col gap-6">
      <RunSummary />

      <CostChart />
    </div>
  </div>

  <Metrics />

  <About />
</div>
