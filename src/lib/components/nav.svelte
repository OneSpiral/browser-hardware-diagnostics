<script lang="ts">
	import { page } from "$app/state";
	import { tools } from "$lib/tools";
	import {
		Gamepad2,
		Keyboard,
		Mouse,
		Monitor,
		Mic,
		Volume2,
		Menu,
		X,
		Gauge,
	} from "lucide-svelte";

	const iconMap: Record<string, typeof Gamepad2> = {
		"gamepad-2": Gamepad2,
		keyboard: Keyboard,
		mouse: Mouse,
		monitor: Monitor,
		mic: Mic,
		"volume-2": Volume2,
	};

	let mobileOpen = $state(false);

	function closeMobile() {
		mobileOpen = false;
	}
</script>

<nav aria-label="Primary" class="bg-surface-light border-surface-lighter sticky top-0 z-50 border-b">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
		<a
			href="/"
			class="flex items-center gap-2 text-lg font-bold"
			onclick={closeMobile}
			aria-current={page.url.pathname === "/" ? "page" : undefined}
		>
			<Gauge class="text-brand h-6 w-6" />
			<span>Diagnostics</span>
		</a>

		<button
			type="button"
			class="rounded-lg p-2 md:hidden"
			onclick={() => (mobileOpen = !mobileOpen)}
			aria-label={mobileOpen ? "Close menu" : "Open menu"}
			aria-expanded={mobileOpen}
			aria-controls="mobile-navigation"
		>
			{#if mobileOpen}
				<X class="h-5 w-5" />
			{:else}
				<Menu class="h-5 w-5" />
			{/if}
		</button>

		<div class="hidden items-center gap-1 md:flex">
			{#each tools as tool}
				{@const Icon = iconMap[tool.icon]}
				<a
					href="/{tool.slug}"
					class="hover:bg-surface-lighter flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors {page
						.url.pathname === `/${tool.slug}`
						? 'bg-brand/20 text-brand-light'
						: 'text-text-muted'}"
					aria-current={page.url.pathname === `/${tool.slug}` ? "page" : undefined}
				>
					{#if Icon}
						<Icon class="h-4 w-4" />
					{/if}
					<span>{tool.name.replace(" Tester", "")}</span>
				</a>
			{/each}
		</div>
	</div>

	{#if mobileOpen}
		<div id="mobile-navigation" class="border-surface-lighter border-t px-4 pb-4 md:hidden">
			{#each tools as tool}
				{@const Icon = iconMap[tool.icon]}
				<a
					href="/{tool.slug}"
					class="hover:bg-surface-lighter flex items-center gap-3 rounded-lg px-3 py-3 transition-colors {page
						.url.pathname === `/${tool.slug}`
						? 'bg-brand/20 text-brand-light'
						: 'text-text-muted'}"
					onclick={closeMobile}
					aria-current={page.url.pathname === `/${tool.slug}` ? "page" : undefined}
				>
					{#if Icon}
						<Icon class="h-5 w-5" />
					{/if}
					<span>{tool.name}</span>
				</a>
			{/each}
		</div>
	{/if}
</nav>
