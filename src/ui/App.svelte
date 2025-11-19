<script lang="ts">
  // Your reactive logic will go here
  import {
    Truck,
    Cog,
    Waypoints,
    Info,
    CirclePlus,
    Navigation,
  } from "@lucide/svelte";
  import { PencilRuler, ChartSpline } from "@lucide/svelte";
  import { Switch, Slider } from "@skeletonlabs/skeleton-svelte";

  let maxIterations = 1000; // default
  let speed = 1; // default in seconds
</script>

<!-- Page Wrapper -->
  <div class="w-screen flex flex-col items-center py-10 
            border border-gray-300 rounded-xl shadow-xl 
            !bg-[#fdfcf5]">
  <!--<div class="w-full min-h-screen flex flex-col gap-10 p-6">-->

  <!-- Header + Controls (Centered, Narrow) -->
  <div class="w-full flex flex-col items-center gap-6 max-w-[900px] mx-auto">
    <!-- Banner -->
    <div class="flex items-center justify-center gap-3">
      <Waypoints class="text-red-700 w-10 h-10" />
      <h1 class="text-3xl font-bold">TSPLAB</h1>
      <Waypoints class="text-red-700 w-10 h-10" />
    </div>
    <p class="text-base opacity-80 text-center mt-1">
      A playground for TSP local search heuristics (By <a
        href="https://skanderkort.com">Skander Kort</a
      > Nov. 2025)
    </p>

    <!-- Solver Controls  -->
    <div
      class="sk-card p-4 border border-gray-300 rounded-lg shadow-lg bg-white w-full max-w-[900px] mx-auto !bg-[#f7f3e3]"
    >
      <div class="flex items-center gap-3">
        <Cog class="text-blue-500 w-6 h-6" />
        <header class="text-xl font-semibold text-left mb-4">
          Solver Controls
        </header>
      </div>

      <article class="space-y-6">
        <select
          id="tsp-instance-selector"
          class="w-40 px-3 py-2 rounded-lg border border-gray-300 bg-white shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-gray-400"
        >
          <option>TSP Instance</option>
        </select>

        <select
          class="w-40 px-3 py-2 rounded-lg border border-gray-300 bg-white shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-gray-400"
        >
          <option>Init Heuristic</option>
        </select>

        <!-- Iteration Slider -->
        <Slider
          class="inline-block w-64"
          min={0}
          max={5000}
          step={1}
          defaultValue={[maxIterations]}
        >
          <Slider.Label class="text-base">Max Iterations</Slider.Label>
          <Slider.Control>
            <Slider.Track class="bg-blue-50-950">
              <Slider.Range class="bg-blue-500" />
            </Slider.Track>

            <Slider.Thumb index={0} class="ring-blue-500">
              <Slider.HiddenInput />
            </Slider.Thumb>
          </Slider.Control>

          <Slider.MarkerGroup>
            <Slider.Marker value={0} />
            <Slider.Marker value={2500} />
            <Slider.Marker value={5000} />
          </Slider.MarkerGroup>
        </Slider>

        <!-- Speed Slider -->
        <Slider
          class="inline-block w-64"
          min={0}
          max={10}
          step={1}
          defaultValue={[speed]}
        >
          <Slider.Label class="text-base">Speed (s)</Slider.Label>
          <Slider.Control>
            <Slider.Track class="bg-blue-50-950">
              <Slider.Range class="bg-blue-500" />
            </Slider.Track>

            <Slider.Thumb index={0} class="ring-blue-500">
              <Slider.HiddenInput />
            </Slider.Thumb>
          </Slider.Control>

          <Slider.MarkerGroup>
            <Slider.Marker value={0} />
            <Slider.Marker value={5} />
            <Slider.Marker value={10} />
          </Slider.MarkerGroup>
        </Slider>

        <button
          class="px-4 py-2 rounded-lg font-bold text-white !bg-blue-600 !hover:bg-primary-700 flex items-center gap-2"
        >
          Run
          <Truck class="w-5 h-5 stroke-white" />
        </button>
      </article>
    </div>

    <!-- Operators Section -->
    <div
      class="sk-card p-4 border border-gray-300 rounded-lg shadow-lg bg-white w-full max-w-[900px] mx-auto !bg-[#f7f3e3]"
    >
      <div class="flex items-center gap-3">
        <CirclePlus class="text-blue-500 w-6 h-6" />
        <header class="text-xl font-semibold text-left mb-4">
          Optimization Operators
        </header>
      </div>
      <article>
        <div class="flex flex-wrap gap-4 items-center justify-center">
          <!-- Operator Buttons: Green + White -->
          <button
            class="px-3 py-2 rounded-lg !bg-green-600 text-white font-semibold hover:!bg-green-700"
          >
            2-Opt
          </button>
          <button
            class="px-3 py-2 rounded-lg !bg-green-600 text-white font-semibold hover:!bg-green-700"
          >
            3-Opt
          </button>

          <!-- Randomize Switch -->
          <Switch>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Switch.Label class="text-base font-medium"
              >Randomize ops?</Switch.Label
            >
            <Switch.HiddenInput />
          </Switch>

          <!-- First Improving Switch -->
          <Switch>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Switch.Label class="text-base font-medium"
              >Stop on 1st improving mv?</Switch.Label
            >
            <Switch.HiddenInput />
          </Switch>
        </div>
      </article>
    </div>
  </div>

  <!-- Full-Width Visualization Region -->
  <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
    <!-- Graph Card -->
    <div
      class="sk-card min-h-[450px] p-4 border border-gray-300 rounded-lg shadow-lg !bg-[#f0f3f0] flex flex-col"
    >
      <!-- Header with Icon -->
      <div class="flex items-center gap-3 mb-4">
        <Navigation class="text-blue-500 w-6 h-6" />
        <header class="text-xl font-semibold text-left">Current Tour</header>
      </div>

      <!-- Graph Placeholder -->
      <article
        class="flex-1 flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white shadow-inner"
      >
        <div class="opacity-60">SigmaJS Graph Placeholder</div>
      </article>
    </div>

    <!-- Right Panel -->
    <div class="flex flex-col gap-6">
      <!-- Run Summary -->
      <div
        class="sk-card p-4 border border-gray-300 rounded-lg shadow-lg !bg-[#dfe2f2] text-left"
      >
        <div class="flex items-center gap-3 mb-4">
          <Info class="text-blue-500 w-6 h-6" />
          <header class="text-xl font-semibold text-left">Run Summary</header>
        </div>

        <!-- Two-column summary table -->
        <table class="w-full text-left text-sm">
          <tbody class="divide-y divide-gray-200">
            <tr>
              <td class="py-1 font-medium w-1/3">Instance name:</td>
              <td class="py-1 w-2/3">--</td>
            </tr>
            <tr>
              <td class="py-1 font-medium w-1/3">Instance description:</td>
              <td class="py-1 w-2/3">--</td>
            </tr>
            <tr>
              <td class="py-1 font-medium w-1/3">Init heuristic:</td>
              <td class="py-1 w-2/3">--</td>
            </tr>
            <tr>
              <td class="py-1 font-medium w-1/3">Iteration:</td>
              <td class="py-1 w-2/3">--</td>
            </tr>
            <tr>
              <td class="py-1 font-medium w-1/3">Runtime:</td>
              <td
                class="py-1 font-bold text-green-700 bg-green-100 px-2 rounded w-2/3"
                >--</td
              >
            </tr>
            <tr>
              <td class="py-1 font-medium w-1/3">Last opt. operator:</td>
              <td class="py-1 w-2/3">--</td>
            </tr>
            <tr>
              <td class="py-1 font-medium w-1/3">Last move applied:</td>
              <td class="py-1 w-2/3">--</td>
            </tr>
            <tr>
              <td class="py-1 font-medium w-1/3">Applied moves count:</td>
              <td class="py-1 w-2/3">--</td>
            </tr>
            <tr>
              <td class="py-1 font-medium w-1/3">Initial cost:</td>
              <td class="py-1 w-2/3">--</td>
            </tr>
            <tr>
              <td class="py-1 font-medium w-1/3">Last cost decrease:</td>
              <td class="py-1 w-2/3">--</td>
            </tr>
            <tr>
              <td class="py-1 font-medium w-1/3">Current cost:</td>
              <td
                class="py-1 font-bold text-red-700 bg-red-100 px-2 rounded w-2/3"
                >--</td
              >
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Line Chart -->
      <div
        class="sk-card min-h-[300px] p-4 flex flex-col border border-gray-300 rounded-lg shadow-lg !bg-[#f0f3f0]"
      >
        <!-- Header with Icon -->
        <div class="flex items-center gap-3 mb-4">
          <ChartSpline class="text-blue-500 w-6 h-6" />
          <header class="text-xl font-semibold text-left">
            Cost = f(run, iter)
          </header>
        </div>

        <!-- Graph Placeholder -->
        <article
          class="flex-1 flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white shadow-inner min-h-[200px]"
        >
          <div class="opacity-60">Line Chart Placeholder</div>
        </article>
      </div>
    </div>
  </div>

  <!-- Metrics Table (Centered Section) -->
  <div
    class="sk-card p-4 max-w-[1200px] mx-auto w-full border border-gray-300 rounded-lg shadow-lg !bg-[#dfe2f2]"
  >
    <div class="flex items-center gap-3">
      <PencilRuler class="text-blue-500 w-6 h-6" />
      <header class="text-xl font-semibold text-left mb-4">Run Metric</header>
    </div>

    <article>
      <table class="w-full text-left text-sm">
        <thead class="border-b">
          <tr>
            <th class="p-2">Run Id</th>
            <th class="p-2">Run Config</th>
            <th class="p-2">Tour Cost</th>
            <th class="p-2">Improvement (%)</th>
            <th class="p-2">Gap (%)</th>
            <th class="p-2">Runtime (s)</th>
            <th class="p-2">Iterations</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-2">--</td>
            <td class="p-2">--</td>
            <td class="p-2">--</td>
            <td class="p-2">--</td>
            <td class="p-2">--</td>
            <td class="p-2">--</td>
            <td class="p-2">--</td>
          </tr>
        </tbody>
      </table>
    </article>
  </div>

  <!-- About Section -->
  <div class="sk-card p-4 max-w-[1200px] mx-auto w-full">
    <h3 class="font-semibold mb-2">About TSPLAB</h3>
    <p class="opacity-80 text-sm">
      This section explains what TSPLAB is about and provides help regarding UI
      controls.
    </p>
  </div>
</div>
