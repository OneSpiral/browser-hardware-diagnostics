<script lang="ts">
	import "../app.css";
	import Nav from "$lib/components/nav.svelte";
	import Footer from "$lib/components/footer.svelte";
	import type { Snippet } from "svelte";

	const { children }: { children: Snippet } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<a class="skip-link" href="#main-content">Skip to main content</a>
	<Nav />
	<main id="main-content" tabindex="-1" class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
