<script lang="ts">
	import { onMount } from "svelte";
	import {
		BUTTON_LABELS,
		axisToPixel,
		readConnectedGamepads,
		resolveActiveGamepad,
	} from "$lib/utils/gamepad";
	import { Gamepad2 } from "lucide-svelte";

	let connectedGamepads = $state<ReturnType<typeof readConnectedGamepads>>([]);
	let selectedGamepadIndex = $state<number | null>(null);
	let animFrame = 0;

	const STICK_SIZE = 120;
	const DOT_SIZE = 14;

	const activeGamepad = $derived(resolveActiveGamepad(connectedGamepads, selectedGamepadIndex));
	const connected = $derived(activeGamepad !== null);
	const gamepadId = $derived(activeGamepad?.id ?? "");
	const buttons = $derived(activeGamepad?.buttons ?? []);
	const axes = $derived(activeGamepad?.axes ?? []);

	function syncGamepads() {
		connectedGamepads = readConnectedGamepads();
		selectedGamepadIndex = resolveActiveGamepad(connectedGamepads, selectedGamepadIndex)?.index ?? null;
	}

	function poll() {
		syncGamepads();
		animFrame = requestAnimationFrame(poll);
	}

	onMount(() => {
		const onGamepadChange = () => {
			syncGamepads();
		};

		window.addEventListener("gamepadconnected", onGamepadChange);
		window.addEventListener("gamepaddisconnected", onGamepadChange);

		syncGamepads();
		poll();

		return () => {
			cancelAnimationFrame(animFrame);
			window.removeEventListener("gamepadconnected", onGamepadChange);
			window.removeEventListener("gamepaddisconnected", onGamepadChange);
		};
	});

	function stickX(axisIndex: number): number {
		return axisToPixel(axes[axisIndex] ?? 0, STICK_SIZE) - DOT_SIZE / 2;
	}

	function stickY(axisIndex: number): number {
		return axisToPixel(axes[axisIndex] ?? 0, STICK_SIZE) - DOT_SIZE / 2;
	}

	function buttonLabel(i: number): string {
		return BUTTON_LABELS[i] ?? `B${i}`;
	}
</script>

<svelte:head>
	<title>Gamepad Tester — Browser Hardware Diagnostics</title>
	<meta
		name="description"
		content="Test your gamepad joystick deadzone, buttons, triggers and vibration. Supports Xbox, PlayStation, Nintendo controllers."
	/>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8">
	<div class="mb-8 text-center">
		<h1 class="mb-2 flex items-center justify-center gap-2 text-3xl font-bold">
			<Gamepad2 class="text-brand h-8 w-8" />
			Gamepad Tester
		</h1>
		<p class="text-text-muted">
			Connect one or more controllers, then choose which slot to inspect.
		</p>
	</div>

	{#if !connected}
		<div
			class="bg-surface-light mx-auto flex max-w-md flex-col items-center gap-4 rounded-xl p-12 text-center"
		>
			<div class="bg-brand/10 animate-pulse rounded-full p-4">
				<Gamepad2 class="text-brand h-12 w-12" />
			</div>
			<p class="text-text-muted text-lg">Waiting for gamepad…</p>
			<p class="text-text-muted text-sm">
				Press any button on your controller to connect.
			</p>
		</div>
	{:else}
		<section class="mb-6">
			<div class="mb-3 flex items-center justify-between gap-3">
				<h2 class="text-lg font-semibold">Connected Controllers</h2>
				<span class="text-text-muted text-xs">
					{connectedGamepads.length} connected
				</span>
			</div>
			<div class="grid gap-3 sm:grid-cols-2">
				{#each connectedGamepads as gamepad}
					<button
						type="button"
						onclick={() => (selectedGamepadIndex = gamepad.index)}
						class="rounded-xl border p-4 text-left transition-colors {selectedGamepadIndex === gamepad.index
							? 'border-brand bg-brand/10 text-text'
							: 'border-surface-lighter bg-surface-light text-text-muted hover:bg-surface'}"
						aria-pressed={selectedGamepadIndex === gamepad.index}
					>
						<div class="mb-1 flex items-center justify-between gap-3">
							<span class="font-medium text-text">Controller {gamepad.index + 1}</span>
							<span class="text-xs">Browser slot {gamepad.index}</span>
						</div>
						<p class="truncate text-xs">{gamepad.id}</p>
					</button>
				{/each}
			</div>
			<p class="text-text-muted mt-3 text-xs">
				Multiple connected controllers are usually exposed by the Gamepad API, but slot ordering
				and simultaneous reporting can vary by browser and OS.
			</p>
		</section>

		<!-- Gamepad Info -->
		<div class="bg-surface-light mb-6 rounded-xl p-4">
			<div class="flex flex-wrap items-center gap-2">
				<span class="bg-success h-2.5 w-2.5 rounded-full"></span>
				<span class="text-sm font-medium">Active Controller</span>
				<span class="text-text-muted text-xs">— Controller {(selectedGamepadIndex ?? 0) + 1}</span>
				<span class="text-text-muted truncate text-xs">— {gamepadId}</span>
			</div>
		</div>

		<!-- Buttons Grid -->
		<section class="mb-8">
			<h2 class="mb-4 text-lg font-semibold">Buttons</h2>
			<div class="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
				{#each buttons as btn, i}
					<div
						class="flex flex-col items-center justify-center rounded-lg p-3 text-center transition-all {btn.pressed
							? 'bg-brand text-white scale-95'
							: 'bg-surface-light text-text-muted'}"
					>
						<span class="text-xs font-bold">{buttonLabel(i)}</span>
						{#if btn.value > 0 && btn.value < 1}
							<span class="mt-0.5 text-[10px]">{Math.round(btn.value * 100)}%</span>
						{/if}
					</div>
				{/each}
			</div>
		</section>

		<!-- Analog Sticks -->
		<section class="mb-8">
			<h2 class="mb-4 text-lg font-semibold">Analog Sticks</h2>
			<div class="flex flex-wrap justify-center gap-8">
				{#if axes.length >= 2}
					<div class="flex flex-col items-center gap-2">
						<span class="text-text-muted text-sm font-medium">Left Stick</span>
						<div
							class="bg-surface-light relative rounded-full border-2 border-dashed"
							style="width: {STICK_SIZE}px; height: {STICK_SIZE}px;"
						>
							<!-- Crosshair -->
							<div
								class="bg-surface-lighter absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
							></div>
							<div
								class="bg-surface-lighter absolute left-0 top-1/2 h-px w-full -translate-y-1/2"
							></div>
							<!-- Dot -->
							<div
								class="bg-brand absolute rounded-full shadow-lg transition-none"
								style="width: {DOT_SIZE}px; height: {DOT_SIZE}px; left: {stickX(0)}px; top: {stickY(1)}px;"
							></div>
						</div>
						<div class="text-text-muted flex gap-4 text-xs">
							<span>X: {(axes[0] ?? 0).toFixed(3)}</span>
							<span>Y: {(axes[1] ?? 0).toFixed(3)}</span>
						</div>
					</div>
				{/if}

				{#if axes.length >= 4}
					<div class="flex flex-col items-center gap-2">
						<span class="text-text-muted text-sm font-medium">Right Stick</span>
						<div
							class="bg-surface-light relative rounded-full border-2 border-dashed"
							style="width: {STICK_SIZE}px; height: {STICK_SIZE}px;"
						>
							<div
								class="bg-surface-lighter absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
							></div>
							<div
								class="bg-surface-lighter absolute left-0 top-1/2 h-px w-full -translate-y-1/2"
							></div>
							<div
								class="bg-brand absolute rounded-full shadow-lg transition-none"
								style="width: {DOT_SIZE}px; height: {DOT_SIZE}px; left: {stickX(2)}px; top: {stickY(3)}px;"
							></div>
						</div>
						<div class="text-text-muted flex gap-4 text-xs">
							<span>X: {(axes[2] ?? 0).toFixed(3)}</span>
							<span>Y: {(axes[3] ?? 0).toFixed(3)}</span>
						</div>
					</div>
				{/if}
			</div>
		</section>

		<!-- Triggers -->
		{#if buttons.length >= 8}
			<section class="mb-8">
				<h2 class="mb-4 text-lg font-semibold">Triggers</h2>
				<div class="flex justify-center gap-8">
					<div class="flex flex-col items-center gap-2">
						<span class="text-text-muted text-sm">LT</span>
						<div class="bg-surface-light h-24 w-8 overflow-hidden rounded-full">
							<div
								class="bg-brand w-full rounded-full transition-all"
								style="height: {(buttons[6]?.value ?? 0) * 100}%;"
							></div>
						</div>
						<span class="text-text-muted text-xs"
							>{Math.round((buttons[6]?.value ?? 0) * 100)}%</span
						>
					</div>
					<div class="flex flex-col items-center gap-2">
						<span class="text-text-muted text-sm">RT</span>
						<div class="bg-surface-light h-24 w-8 overflow-hidden rounded-full">
							<div
								class="bg-brand w-full rounded-full transition-all"
								style="height: {(buttons[7]?.value ?? 0) * 100}%;"
							></div>
						</div>
						<span class="text-text-muted text-xs"
							>{Math.round((buttons[7]?.value ?? 0) * 100)}%</span
						>
					</div>
				</div>
			</section>
		{/if}

		<!-- Raw Data -->
		<details class="bg-surface-light rounded-xl p-4">
			<summary class="text-text-muted cursor-pointer text-sm font-medium">Raw Data</summary>
			<pre class="text-text-muted mt-3 overflow-x-auto text-xs">{JSON.stringify(
					{
						activeController: selectedGamepadIndex,
						connectedControllers: connectedGamepads.map(({ id, index }) => ({ id, index })),
						buttons: buttons.map((b, i) => ({ label: buttonLabel(i), ...b })),
						axes,
					},
					null,
					2,
				)}</pre>
		</details>
	{/if}
</div>
