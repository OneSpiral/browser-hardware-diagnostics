<script lang="ts">
	import { Github } from "lucide-svelte";
	import {
		GITHUB_REPOSITORY_URL,
		SITE_NAME,
		SPONSOR_NAME,
		SPONSOR_TAGLINE,
	} from "$lib/site";
</script>

<footer class="border-surface-lighter text-text-muted mt-auto border-t px-4 py-8 text-center text-sm">
	<div class="mx-auto max-w-7xl">
		<p class="mb-2">
			<strong class="text-text">{SITE_NAME}</strong> — Free, open-source hardware testing tools.
		</p>
		<p class="mb-3">No data leaves your browser. 100% client-side.</p>
		<div class="flex items-center justify-center gap-4">
			<a
				href={GITHUB_REPOSITORY_URL}
				target="_blank"
				rel="noopener noreferrer"
				class="hover:text-brand-light inline-flex items-center gap-1 transition-colors"
			>
				<Github class="h-4 w-4" />
				View technical solution on GitHub
			</a>
		</div>
		<p class="mt-4 text-xs opacity-60">{SPONSOR_TAGLINE}</p>
		<p class="mt-1 text-xs opacity-40">{SITE_NAME} is independently branded and sponsored by {SPONSOR_NAME}.</p>
	</div>
</footer>
