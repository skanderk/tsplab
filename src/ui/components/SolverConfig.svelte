<script lang="ts">
    import { Slider } from "@skeletonlabs/skeleton-svelte";

    import { Truck, Cog } from "@lucide/svelte";

    let maxIterations = 1000; // default
    let speed = 1; // default in seconds
</script>

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
