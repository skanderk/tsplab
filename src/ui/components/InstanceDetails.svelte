<script lang="ts">
    import { Info } from "@lucide/svelte";
</script>

<div
    class="sk-card p-4 border border-slate-300 rounded-lg shadow-lg !bg-[#eef2f7] text-left"
>
    <div class="flex items-center gap-3 mb-4">
        <Info class="text-slate-700 w-6 h-6" />
        <header class="text-xl font-semibold text-left">Instance Details</header>
    </div>

    <table class="w-full text-left text-sm">
        <tbody class="divide-y divide-slate-200">
            <tr>
                <td class="py-1 font-medium w-1/3">Instance name:</td>
                <td class="py-1 w-2/3">--</td>
            </tr>
            <tr>
                <td class="py-1 font-medium w-1/3">Instance description:</td>
                <td class="py-1 w-2/3">--</td>
            </tr>
            <tr>
                <td class="py-1 font-medium w-1/3">Best known cost:</td>
                <td class="py-1 w-2/3">--</td>
            </tr>
            <tr>
                <td class="py-1 font-medium w-1/3">Init heuristic:</td>
                <td class="py-1 w-2/3">--</td>
            </tr>
        </tbody>
    </table>
</div>
