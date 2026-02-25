<script lang="ts">
    import { Slider } from "@skeletonlabs/skeleton-svelte";
    import { Truck, Cog } from "@lucide/svelte";
    import type { SolverConfigProps, TourBuilderId, TspInstanceSize } from "../state/dtos";
    import { tspInstances } from "../state/tsp-instances";

    // Dropdowns configs
    const sizeOptions: Array<{ value: TspInstanceSize; label: string }> = [
        { value: "T", label: tspInstances["T"][0] as string },
        { value: "S", label: tspInstances["S"][0] as string },
        { value: "M", label: tspInstances["M"][0] as string },
        { value: "L", label: tspInstances["L"][0] as string }
    ];
    const tourBuilderOptions: Array<{ value: TourBuilderId; label: string }> = [
        { value: "randomTour", label: "Random" }
    ];

    // Sliders configs
    const maxIterationsMin = 0;
    const maxIterationsMax = 2000;
    const maxIterationsMid = Math.floor((maxIterationsMin + maxIterationsMax) / 2);

    const sleepMin = 0;
    const sleepMax = 10;
    const sleepMid = Math.floor((sleepMin + sleepMax) / 2);

    // Unpack component props
    let { config, onConfigChange, onTspInstanceChange }: {
        config: SolverConfigProps;
        onConfigChange: (newConfig: SolverConfigProps) => void;
        onTspInstanceChange: (tspInstance: string) => void;
    } = $props();

    const currentSizeInstances = $derived(tspInstances[config.tspInstanceSize][1]);

    // Event listeners
    function updateConfig(patch: Partial<SolverConfigProps>): void {
        onConfigChange({ ...config, ...patch });
    }

    function onInstanceSizeChange(event: Event): void {
        const selectedSize = (event.currentTarget as HTMLSelectElement).value as TspInstanceSize;
        const matchingInstances = tspInstances[selectedSize][1];
        const nextInstance = matchingInstances[0] ?? "";

        updateConfig({
            tspInstanceSize: selectedSize,
            tspInstance: nextInstance
        });
        onTspInstanceChange(nextInstance);
    }

    function onInstanceChange(event: Event): void {
        const selectedInstance = (event.currentTarget as HTMLSelectElement).value;
        updateConfig({ tspInstance: selectedInstance });
        onTspInstanceChange(selectedInstance);
    }

    function onTourBuilderChange(event: Event): void {
        const selectedTourBuilder = (event.currentTarget as HTMLSelectElement).value as TourBuilderId;
        updateConfig({ tourBuilderId: selectedTourBuilder });
    }
</script>

<div
    class="sk-card p-4 border border-slate-300 rounded-lg shadow-lg bg-white w-full !bg-[#eaf2ff]"
>
    <div class="flex items-center gap-3">
        <Cog class="text-indigo-600 w-6 h-6" />
        <header class="text-xl font-semibold text-left mb-4">
            Solver Controls
        </header>
    </div>

    <article class="flex flex-col gap-6">
        <div class="flex flex-wrap justify-center items-end gap-4">
            <label for="tsp-size-selector" class="flex flex-col gap-1 text-sm font-medium text-slate-700">
                <span>Instance size</span>
                <select
                    id="tsp-size-selector"
                    class="w-40 px-3 py-2 rounded-lg border border-slate-300 bg-white shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-slate-400"
                    value={config.tspInstanceSize}
                    onchange={onInstanceSizeChange}
                >
                    {#each sizeOptions as size}
                        <option value={size.value}>{size.label}</option>
                    {/each}
                </select>
            </label>

            <label for="tsp-instance-selector" class="flex flex-col gap-1 text-sm font-medium text-slate-700">
                <span>TSP instance</span>
                <select
                    id="tsp-instance-selector"
                    class="w-40 px-3 py-2 rounded-lg border border-slate-300 bg-white shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-slate-400"
                    value={config.tspInstance}
                    onchange={onInstanceChange}
                >
                    {#each currentSizeInstances as tspInstanceName}
                        <option value={tspInstanceName}>{tspInstanceName}</option>
                    {/each}
                </select>
            </label>

            <label for="init-heuristic-selector" class="flex flex-col gap-1 text-sm font-medium text-slate-700">
                <span>Initial tour builder</span>
                <select
                    id="init-heuristic-selector"
                    class="w-40 px-3 py-2 rounded-lg border border-slate-300 bg-white shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-slate-400"
                    value={config.tourBuilderId}
                    onchange={onTourBuilderChange}
                >
                    {#each tourBuilderOptions as tourBuilder}
                        <option value={tourBuilder.value}>{tourBuilder.label}</option>
                    {/each}
                </select>
            </label>
        </div>

        <div class="flex flex-wrap justify-center items-start gap-6">
            <!-- Iteration Slider -->
            <Slider
                class="inline-block w-64"
                min={maxIterationsMin}
                max={maxIterationsMax}
                step={1}
                value={[config.maxIterations]}
                onValueChange={(details) => updateConfig({ maxIterations: details.value[0] })}
            >
                <Slider.Label class="text-base inline-flex items-center gap-2">
                    Max Iterations
                    <span class="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-xs font-semibold">
                        {config.maxIterations}
                    </span>
                </Slider.Label>
                <Slider.Control>
                    <Slider.Track class="bg-slate-300">
                        <Slider.Range class="bg-indigo-500" />
                    </Slider.Track>

                    <Slider.Thumb index={0} class="ring-indigo-500">
                        <Slider.HiddenInput />
                    </Slider.Thumb>
                </Slider.Control>

                <Slider.MarkerGroup>
                    <Slider.Marker value={maxIterationsMin} />
                    <Slider.Marker value={maxIterationsMid} />
                    <Slider.Marker value={maxIterationsMax} />
                </Slider.MarkerGroup>
            </Slider>

            <!-- Speed Slider -->
            <Slider
                class="inline-block w-64"
                min={sleepMin}
                max={sleepMax}
                step={0.5}
                value={[config.sleepDurationSec]}
                onValueChange={(details) => updateConfig({ sleepDurationSec: details.value[0] })}
            >
                <Slider.Label class="text-base inline-flex items-center gap-2">
                    Sleep duration (sec)
                    <span class="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-xs font-semibold">
                        {config.sleepDurationSec}
                    </span>
                </Slider.Label>
                <Slider.Control>
                    <Slider.Track class="bg-slate-300">
                        <Slider.Range class="bg-indigo-500" />
                    </Slider.Track>

                    <Slider.Thumb index={0} class="ring-indigo-500">
                        <Slider.HiddenInput />
                    </Slider.Thumb>
                </Slider.Control>

                <Slider.MarkerGroup>
                    <Slider.Marker value={sleepMin} />
                    <Slider.Marker value={sleepMid} />
                    <Slider.Marker value={sleepMax} />
                </Slider.MarkerGroup>
            </Slider>
        </div>

        <button
            class="px-4 py-2 rounded-lg font-bold text-white !bg-indigo-600 hover:!bg-indigo-700 flex items-center gap-2 self-center"
        >
            Run
            <Truck class="w-5 h-5 stroke-white" />
        </button>
    </article>
</div>
