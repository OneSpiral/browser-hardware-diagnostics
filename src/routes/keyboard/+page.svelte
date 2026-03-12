<script lang="ts">
	import { onMount } from "svelte";
	import {
		KEYBOARD_ROWS,
		keyLabel,
		keyWidth,
		type KeyState,
	} from "$lib/utils/keyboard";
	import { Keyboard, RotateCcw } from "lucide-svelte";

	let keys = $state<Map<string, KeyState>>(new Map());
	let lastKey = $state("");
	let totalPresses = $state(0);

	const interactiveSelector =
		"button, a, input, select, textarea, summary, audio, [contenteditable='true']";

	function shouldIgnoreKeyCapture(e: KeyboardEvent) {
		if (e.key === "Tab" || e.key === "Escape" || e.metaKey || e.ctrlKey || e.altKey) {
			return true;
		}

		const target = e.target;
		return target instanceof HTMLElement && target.closest(interactiveSelector) !== null;
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (shouldIgnoreKeyCapture(e)) return;
		const code = e.code;
		lastKey = code;

		const existing = keys.get(code);
		if (existing) {
			existing.pressed = true;
			existing.count += 1;
		} else {
			keys.set(code, { code, key: e.key, pressed: true, count: 1 });
		}
		keys = new Map(keys);
		totalPresses++;
	}

	function handleKeyUp(e: KeyboardEvent) {
		if (shouldIgnoreKeyCapture(e)) return;
		const existing = keys.get(e.code);
		if (existing) {
			existing.pressed = false;
			keys = new Map(keys);
		}
	}

	function reset() {
		keys = new Map();
		lastKey = "";
		totalPresses = 0;
	}

	function getState(code: string): "idle" | "pressed" | "tested" {
		const k = keys.get(code);
		if (!k) return "idle";
		return k.pressed ? "pressed" : "tested";
	}

	onMount(() => {
		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	});

	const testedCount = $derived(keys.size);
	const totalKeys = $derived(KEYBOARD_ROWS.flat().length);
</script>

<svelte:head>
	<title>Keyboard Tester — Browser Hardware Diagnostics</title>
	<meta
		name="description"
		content="Test every key on your keyboard. Detect ghosting, stuck keys, and key rollover with visual feedback."
	/>
</svelte:head>

<div class="mx-auto max-w-5xl px-4 py-8">
	<div class="mb-8 text-center">
		<h1 class="mb-2 flex items-center justify-center gap-2 text-3xl font-bold">
			<Keyboard class="text-brand h-8 w-8" />
			Keyboard Tester
		</h1>
		<p class="text-text-muted">
			Press any key to test it. All keys light up when pressed. Tab, Escape, and browser
			shortcuts remain available for navigation.
		</p>
	</div>

	<!-- Stats Bar -->
	<div class="bg-surface-light mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl p-4">
		<div class="flex flex-wrap gap-6 text-sm">
			<span class="text-text-muted">
				Keys Tested: <strong class="text-text">{testedCount}/{totalKeys}</strong>
			</span>
			<span class="text-text-muted">
				Total Presses: <strong class="text-text">{totalPresses}</strong>
			</span>
			{#if lastKey}
				<span class="text-text-muted">
					Last Key: <strong class="text-brand-light">{keyLabel(lastKey)}</strong>
				</span>
			{/if}
		</div>
		<button
			onclick={reset}
			class="bg-surface-lighter hover:bg-surface flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors"
		>
			<RotateCcw class="h-3.5 w-3.5" />
			Reset
		</button>
	</div>

	<!-- Keyboard Layout -->
	<div class="bg-surface-light overflow-x-auto rounded-xl p-4">
		<div class="mx-auto flex min-w-[700px] flex-col gap-1.5">
			{#each KEYBOARD_ROWS as row}
				<div class="flex gap-1">
					{#each row as code}
						{@const state = getState(code)}
						<div
							class="flex items-center justify-center rounded-lg border text-xs font-medium transition-all select-none
								{state === 'pressed'
								? 'bg-brand border-brand-light text-white scale-95 shadow-lg shadow-brand/30'
								: state === 'tested'
									? 'bg-success/20 border-success/40 text-success'
									: 'bg-surface border-surface-lighter text-text-muted hover:border-surface-lighter'}"
							style="width: {keyWidth(code) * 48}px; min-height: 44px;"
						>
							{keyLabel(code)}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<!-- Progress -->
	<div class="mt-6">
		<div class="mb-2 flex justify-between text-sm">
			<span class="text-text-muted">Test Progress</span>
			<span class="text-brand-light font-medium"
				>{Math.round((testedCount / totalKeys) * 100)}%</span
			>
		</div>
		<div class="bg-surface-light h-2 overflow-hidden rounded-full">
			<div
				class="bg-brand h-full rounded-full transition-all"
				style="width: {(testedCount / totalKeys) * 100}%;"
			></div>
		</div>
	</div>
</div>
