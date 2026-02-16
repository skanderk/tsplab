<script lang="ts">
    import { Info } from "@lucide/svelte";
</script>

<div
    class="sk-card p-4 border border-slate-300 rounded-lg shadow-lg !bg-[#eef2f7] text-left"
>
    <div class="flex items-center gap-3 mb-4">
        <Info class="text-slate-700 w-6 h-6" />
        <header class="text-xl font-semibold text-left">Run Summary</header>
    </div>

    <!-- Two-column summary table -->
    <table class="w-full text-left text-sm">
        <tbody class="divide-y divide-slate-200">
            <!-- Current configuration  -->
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

            <tr>
                <td colspan="2" class="pt-3 pb-2">
                    <div class="border-t border-slate-300"></div>
                </td>
            </tr>

            <!-- Current iteration -->
            <tr>
                <td class="py-1 font-medium w-1/3">Iteration:</td>
                <td class="py-1 w-2/3">--</td>
            </tr>
            <tr>
                <td class="py-1 font-medium w-1/3">Run time:</td>
                <td
                    class="py-1 font-bold text-emerald-700 bg-emerald-100 px-2 rounded w-2/3"
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
                <td class="py-1 font-medium w-1/3">|Applied moves|:</td>
                <td class="py-1 w-2/3">--</td>
            </tr>
            <tr>
                <td class="py-1 font-medium w-1/3">|Evaluated moves|:</td>
                <td class="py-1 w-2/3">--</td>
            </tr>

            <tr>
                <td colspan="2" class="pt-3 pb-2">
                    <div class="border-t border-slate-300"></div>
                </td>
            </tr>

            <!-- Cost -->
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
                    class="py-1 font-bold text-rose-700 bg-rose-100 px-2 rounded w-2/3"
                    >--</td
                >
            </tr>
        </tbody>
    </table>
</div>
