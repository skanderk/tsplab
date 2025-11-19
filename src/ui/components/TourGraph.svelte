<script lang="ts">
    import { Navigation } from "@lucide/svelte";
</script>

<div
    class="sk-card min-h-[450px] p-4 border border-gray-300 rounded-lg shadow-lg !bg-[#f0f3f0] flex flex-col"
>
    <!-- Header with Icon -->
    <div class="flex items-center gap-3 mb-4">
        <Navigation class="text-blue-500 w-6 h-6" />
        <header class="text-xl font-semibold text-left">Current Tour</header>
    </div>

    <!-- Graph Placeholder -->
    <article
        class="flex-1 flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white shadow-inner"
    >
        <div class="opacity-60">SigmaJS Graph Placeholder</div>
    </article>
</div>
