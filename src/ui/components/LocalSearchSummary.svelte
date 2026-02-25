<script lang="ts">
    import { HatGlasses } from "@lucide/svelte";
    import { type LocalSearchSummaryProps } from "../state/dtos";

    let { summary } : {summary: LocalSearchSummaryProps} = $props();
</script>

<div
    class="sk-card p-4 border border-slate-300 rounded-lg shadow-lg !bg-[#eef2f7] text-left"
>
    <div class="flex items-center gap-3 mb-4">
        <HatGlasses class="text-slate-700 w-6 h-6" />
        <header class="text-xl font-semibold text-left">Local Search Summary</header>
    </div>

    <table class="w-full text-left text-sm">
        <tbody class="divide-y divide-slate-200">
            <tr>
                <td class="py-1 font-medium w-1/3 whitespace-nowrap">Iteration:</td>
                <td class="py-1 w-2/3">{summary.iteration}</td>
            </tr>
            <tr>
                <td class="py-1 font-medium w-1/3 whitespace-nowrap">Run time (sec):</td>
                <td class="py-1 font-bold text-emerald-700 bg-emerald-100 px-2 rounded w-2/3">
                    {summary.runTimeSec.toFixed(2)}
                </td>
            </tr>
            <tr>
                <td class="py-1 font-medium w-1/3 whitespace-nowrap">Last opt. operator:</td>
                <td class="py-1 w-2/3">{summary.appliedOperator}</td>
            </tr>
            <tr>
                <td class="py-1 font-medium w-1/3 whitespace-nowrap">Last move applied:</td>
                <td class="py-1 w-2/3">{summary.moveApplied}</td>
            </tr>
            <tr>
                <td class="py-1 font-medium w-1/3 whitespace-nowrap">|Applied moves|:</td>
                <td class="py-1 w-2/3">{summary.appliedMovesCount}</td>
            </tr>
            <tr>
                <td class="py-1 font-medium w-1/3 whitespace-nowrap">|Evaluated moves|:</td>
                <td class="py-1 w-2/3">{summary.appliedMovesCount}</td>
            </tr>
        </tbody>
    </table>
</div>
