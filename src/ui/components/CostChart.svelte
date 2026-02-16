<script lang="ts">
    import { ChartSpline } from "@lucide/svelte";
</script>

<div
    class="sk-card min-h-[300px] p-4 flex flex-col border border-slate-300 rounded-lg shadow-lg !bg-[#e9f5f1]"
>
    <!-- Header with Icon -->
    <div class="flex items-center gap-3 mb-4">
        <ChartSpline class="text-teal-700 w-6 h-6" />
        <header class="text-xl font-semibold text-left">
            Cost = f(run, iter)
        </header>
    </div>

    <!-- Graph Placeholder -->
    <article
        class="flex-1 flex items-center justify-center rounded-lg border border-dashed border-teal-200 bg-[#f8fffd] shadow-inner min-h-[200px]"
    >
        <div class="opacity-60">Line Chart Placeholder</div>
    </article>
</div>
