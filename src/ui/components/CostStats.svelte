<script lang="ts">
    import { BadgeDollarSign } from "@lucide/svelte";
</script>

<div
    class="sk-card p-4 border border-slate-300 rounded-lg shadow-lg !bg-[#eef2f7] text-left"
>
    <div class="flex items-center gap-3 mb-4">
        <BadgeDollarSign class="text-slate-700 w-6 h-6" />
        <header class="text-xl font-semibold text-left">Cost Stats</header>
    </div>

    <table class="w-full text-left text-sm">
        <tbody class="divide-y divide-slate-200">
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
                <td class="py-1 font-bold text-rose-700 bg-rose-100 px-2 rounded w-2/3">
                    --
                </td>
            </tr>
        </tbody>
    </table>
</div>
