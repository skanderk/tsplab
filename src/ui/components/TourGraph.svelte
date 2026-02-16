<script lang="ts">
    import { Navigation } from "@lucide/svelte";
</script>

<div
    class="sk-card min-h-[450px] p-4 border border-slate-300 rounded-lg shadow-lg !bg-[#e9f5f1] flex flex-col"
>
    <!-- Header with Icon -->
    <div class="flex items-center gap-3 mb-4">
        <Navigation class="text-teal-700 w-6 h-6" />
        <header class="text-xl font-semibold text-left">Current Tour</header>
    </div>

    <!-- Graph Placeholder -->
    <article
        class="flex-1 flex items-center justify-center rounded-lg border border-dashed border-teal-200 bg-[#f8fffd] shadow-inner"
    >
        <div class="opacity-60">SigmaJS Graph Placeholder</div>
    </article>
</div>
