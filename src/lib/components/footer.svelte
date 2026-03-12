<script lang="ts">
	import { Github } from "lucide-svelte";
	import {
		GITHUB_REPOSITORY_URL,
		MAINTAINER_NAME,
		MAINTAINER_PROFILE_URL,
		SITE_NAME,
		SPONSOR_NAME,
		SPONSOR_TAGLINE,
		SPONSOR_URL,
	} from "$lib/site";
</script>

<footer class="border-surface-lighter text-text-muted mt-auto border-t px-4 py-8 text-center text-sm">
	<div class="mx-auto max-w-7xl">
		<p class="mb-2">
			<strong class="text-text">{SITE_NAME}</strong> — Open-source browser hardware diagnostics toolkit.
		</p>
		<p class="mb-3">
			Technical solution maintained by
			<a
				href={MAINTAINER_PROFILE_URL}
				target="_blank"
				rel="noopener noreferrer"
				class="hover:text-brand-light transition-colors"
			>
				{MAINTAINER_NAME}
			</a>
			and used in production by
			<a
				href={SPONSOR_URL}
				target="_blank"
				rel="noopener noreferrer"
				class="hover:text-brand-light transition-colors"
			>
				{SPONSOR_NAME}
			</a>
			.
		</p>
		<div class="flex items-center justify-center gap-4">
			<a
				href={GITHUB_REPOSITORY_URL}
				target="_blank"
				rel="noopener noreferrer"
				class="hover:text-brand-light inline-flex items-center gap-1 transition-colors"
			>
				<Github class="h-4 w-4" />
				View toolkit repository on GitHub
			</a>
		</div>
		<p class="mt-4 text-xs opacity-60">
			<a
				href={SPONSOR_URL}
				target="_blank"
				rel="noopener noreferrer"
				class="hover:text-brand-light transition-colors"
			>
				{SPONSOR_TAGLINE}
			</a>
		</p>
		<p class="mt-1 text-xs opacity-40">
			Community contributors are welcome to improve the toolkit's technical capabilities.
		</p>
	</div>
</footer>
