<script lang="ts">
    import { Switch } from "@skeletonlabs/skeleton-svelte";
    import { CirclePlus } from "@lucide/svelte";
</script>

<div
    class="sk-card p-4 border border-slate-300 rounded-lg shadow-lg bg-white w-full !bg-[#eaf2ff]"
>
    <div class="flex items-center gap-3">
        <CirclePlus class="text-indigo-600 w-6 h-6" />
        <header class="text-xl font-semibold text-left mb-4">
            Optimization Operators
        </header>
    </div>
    <article>
        <div class="flex flex-wrap gap-4 items-center justify-center">
            <!-- Operator Buttons: Green + White -->
            <button
                class="px-3 py-2 rounded-lg !bg-indigo-600 text-white font-semibold hover:!bg-indigo-700"
            >
                2-Opt
            </button>
            <button
                class="px-3 py-2 rounded-lg !bg-indigo-600 text-white font-semibold hover:!bg-indigo-700"
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
