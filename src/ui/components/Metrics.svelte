<script lang="ts">
    import { PencilRuler } from "@lucide/svelte";
</script>

<div
    class="sk-card p-4 w-full border border-slate-300 rounded-lg shadow-lg !bg-[#eef2f7]"
>
    <div class="flex items-center gap-3">
        <PencilRuler class="text-slate-700 w-6 h-6" />
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
