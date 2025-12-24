<script lang="ts">
    import { Info } from "@lucide/svelte";
</script>

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
                <td class="py-1 font-medium w-1/3">Init heuristic:</td>
                <td class="py-1 w-2/3">--</td>
            </tr>

            <tr>
                <td colspan="2" class="pt-3 pb-2">
                    <div class="border-t border-gray-300"></div>
                </td>
            </tr>

            <!-- Current iteration -->
            <tr>
                <td class="py-1 font-medium w-1/3">Iteration:</td>
                <td class="py-1 w-2/3">--</td>
            </tr>
            <tr>
                <td class="py-1 font-medium w-1/3">Elapsed time:</td>
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
                <td colspan="2" class="pt-3 pb-2">
                    <div class="border-t border-gray-300"></div>
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
                    class="py-1 font-bold text-red-700 bg-red-100 px-2 rounded w-2/3"
                    >--</td
                >
            </tr>
        </tbody>
    </table>
</div>
