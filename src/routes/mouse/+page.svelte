<script lang="ts">
	import { onMount } from "svelte";
	import { Mouse, RotateCcw } from "lucide-svelte";
	import {
		MOUSE_BUTTON_NAMES,
		createMouseDiagnosticsState,
		getCurrentHoldMs,
		isDragging,
		recordMouseDown,
		recordMouseMove,
		recordMouseUp,
		type MouseButtonMetrics,
	} from "$lib/utils/mouse";

	let mouseDiagnostics = $state(createMouseDiagnosticsState());
	let cpsClicks = $state<number[]>([]);
	let cps = $state(0);
	let scrollDelta = $state(0);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let moveDistance = $state(0);
	let lastMousePosition = $state<{ x: number; y: number } | null>(null);
	let holdClock = $state(Date.now());
	let testActive = $state(false);
	let cpsTimer: ReturnType<typeof setInterval> | null = null;
	let holdTimer: ReturnType<typeof setInterval> | null = null;

	function buttonMetrics(button: number): MouseButtonMetrics {
		return (
			mouseDiagnostics.buttons[button] ?? {
				count: 0,
				isPressed: false,
				pressStartedAt: null,
				lastHoldMs: 0,
				maxHoldMs: 0,
			}
		);
	}

	function currentHold(button: number): number {
		return getCurrentHoldMs(mouseDiagnostics, button, holdClock);
	}

	function activeButtonName(): string {
		if (mouseDiagnostics.activeDragButton === null) return "None";
		return MOUSE_BUTTON_NAMES[mouseDiagnostics.activeDragButton] ?? `Button ${mouseDiagnostics.activeDragButton}`;
	}

	function latestHoldMs(): number {
		return Object.values(mouseDiagnostics.buttons).reduce(
			(max, metrics) => Math.max(max, metrics.lastHoldMs),
			0,
		);
	}

	function handleMouseDown(e: MouseEvent) {
		mouseDiagnostics = recordMouseDown(mouseDiagnostics, e.button, Date.now(), {
			x: e.clientX,
			y: e.clientY,
		});
	}

	function handleMouseMove(e: MouseEvent) {
		mouseX = e.clientX;
		mouseY = e.clientY;

		if (lastMousePosition) {
			const dx = e.clientX - lastMousePosition.x;
			const dy = e.clientY - lastMousePosition.y;
			moveDistance += Math.sqrt(dx * dx + dy * dy);
		}
		lastMousePosition = { x: e.clientX, y: e.clientY };

		mouseDiagnostics = recordMouseMove(mouseDiagnostics, {
			x: e.clientX,
			y: e.clientY,
		});
	}

	function handleMouseUp(e: MouseEvent) {
		mouseDiagnostics = recordMouseUp(
			recordMouseMove(mouseDiagnostics, { x: e.clientX, y: e.clientY }),
			e.button,
			Date.now(),
			{ x: e.clientX, y: e.clientY },
		);
	}

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
	}

	function handleWheel(e: WheelEvent) {
		scrollDelta += Math.abs(e.deltaY);
	}

	function startCpsTest() {
		testActive = true;
		cpsClicks = [];
		cps = 0;

		cpsTimer = setInterval(() => {
			const now = Date.now();
			cpsClicks = cpsClicks.filter((t) => now - t < 1000);
			cps = cpsClicks.length;
		}, 100);

		setTimeout(() => {
			stopCpsTest();
		}, 10000);
	}

	function cpsClick() {
		if (!testActive) return;
		cpsClicks.push(Date.now());
		cpsClicks = [...cpsClicks];
	}

	function stopCpsTest() {
		testActive = false;
		if (cpsTimer) clearInterval(cpsTimer);
		cpsTimer = null;
	}

	function reset() {
		mouseDiagnostics = createMouseDiagnosticsState();
		scrollDelta = 0;
		moveDistance = 0;
		mouseX = 0;
		mouseY = 0;
		lastMousePosition = null;
		cps = 0;
		cpsClicks = [];
		testActive = false;
		if (cpsTimer) clearInterval(cpsTimer);
		cpsTimer = null;
	}

	onMount(() => {
		holdTimer = setInterval(() => {
			holdClock = Date.now();
		}, 50);

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);

		return () => {
			if (cpsTimer) clearInterval(cpsTimer);
			if (holdTimer) clearInterval(holdTimer);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	});
</script>

<svelte:head>
	<title>Mouse Tester — Browser Hardware Diagnostics</title>
	<meta
		name="description"
		content="Test mouse click speed (CPS), buttons, scroll wheel, drag, hold duration, and tracking accuracy. Free online tool."
	/>
</svelte:head>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="mx-auto max-w-5xl px-4 py-8"
	onmousedown={handleMouseDown}
	oncontextmenu={handleContextMenu}
	onwheel={handleWheel}
>
	<div class="mb-8 text-center">
		<h1 class="mb-2 flex items-center justify-center gap-2 text-3xl font-bold">
			<Mouse class="text-brand h-8 w-8" />
			Mouse Tester
		</h1>
		<p class="text-text-muted">
			Click, scroll, move, hold, and drag to test common mouse interactions.
		</p>
	</div>

	<div class="mb-6 flex justify-end">
		<button
			type="button"
			onclick={reset}
			class="bg-surface-light hover:bg-surface-lighter flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors"
		>
			<RotateCcw class="h-3.5 w-3.5" />
			Reset
		</button>
	</div>

	<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
		<div class="bg-surface-light rounded-xl p-5 xl:col-span-2">
			<h2 class="mb-4 text-sm font-semibold uppercase tracking-wider">Button Clicks</h2>
			<div class="grid gap-2 sm:grid-cols-2">
				{#each Object.entries(MOUSE_BUTTON_NAMES) as [btn, name]}
					{@const metrics = buttonMetrics(Number(btn))}
					<div
						class="rounded-lg px-3 py-3 {metrics.isPressed
							? 'bg-brand/15 text-brand-light'
							: metrics.count > 0
								? 'bg-surface text-text'
								: 'bg-surface text-text-muted'}"
					>
						<div class="mb-1 flex items-center justify-between gap-3">
							<span class="text-sm font-medium">{name}</span>
							<span class="font-mono text-sm font-bold">{metrics.count}</span>
						</div>
						<div class="text-xs text-current/80">
							{#if metrics.isPressed}
								Holding: {currentHold(Number(btn))} ms
							{:else if metrics.lastHoldMs > 0}
								Last hold: {metrics.lastHoldMs} ms
							{:else}
								Hold duration not recorded yet
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="bg-surface-light rounded-xl p-5">
			<h2 class="mb-4 text-sm font-semibold uppercase tracking-wider">Click Speed (CPS)</h2>
			{#if !testActive}
				<button
					type="button"
					onclick={startCpsTest}
					class="bg-brand hover:bg-brand-dark w-full rounded-lg px-4 py-8 text-lg font-bold text-white transition-colors"
				>
					Start 10s Test
				</button>
			{:else}
				<button
					type="button"
					onclick={cpsClick}
					class="bg-brand hover:bg-brand-dark w-full rounded-lg px-4 py-6 transition-colors"
				>
					<div class="text-3xl font-bold text-white">{cps}</div>
					<div class="text-sm text-white/70">clicks/sec</div>
				</button>
				<p class="text-text-muted mt-2 text-center text-xs">Total: {cpsClicks.length} clicks</p>
			{/if}
		</div>

		<div class="bg-surface-light rounded-xl p-5">
			<h2 class="mb-4 text-sm font-semibold uppercase tracking-wider">Movement</h2>
			<div class="space-y-4">
				<div>
					<p class="text-text-muted text-xs">Scroll Distance</p>
					<p class="text-brand-light font-mono text-2xl font-bold">{Math.round(scrollDelta)}</p>
				</div>
				<div>
					<p class="text-text-muted text-xs">Move Distance (px)</p>
					<p class="text-brand-light font-mono text-2xl font-bold">{Math.round(moveDistance)}</p>
				</div>
				<div>
					<p class="text-text-muted text-xs">Position</p>
					<p class="text-text-muted font-mono text-sm">{Math.round(mouseX)}, {Math.round(mouseY)}</p>
				</div>
			</div>
		</div>

		<div class="bg-surface-light rounded-xl p-5">
			<h2 class="mb-4 text-sm font-semibold uppercase tracking-wider">Hold & Drag</h2>
			<div class="space-y-4 text-sm">
				<div class="flex items-center justify-between gap-3">
					<span class="text-text-muted">Status</span>
					<span class={isDragging(mouseDiagnostics) ? "text-brand-light font-medium" : "text-text"}>
						{#if isDragging(mouseDiagnostics)}
							Dragging
						{:else if mouseDiagnostics.activeDragButton !== null}
							Holding
						{:else}
							Ready
						{/if}
					</span>
				</div>
				<div class="flex items-center justify-between gap-3">
					<span class="text-text-muted">Active Button</span>
					<span class="font-medium">{activeButtonName()}</span>
				</div>
				<div class="flex items-center justify-between gap-3">
					<span class="text-text-muted">Current Hold</span>
					<span class="font-mono">{mouseDiagnostics.activeDragButton === null ? 0 : currentHold(mouseDiagnostics.activeDragButton)} ms</span>
				</div>
				<div class="flex items-center justify-between gap-3">
					<span class="text-text-muted">Latest Hold</span>
					<span class="font-mono">{latestHoldMs()} ms</span>
				</div>
				<div class="flex items-center justify-between gap-3">
					<span class="text-text-muted">Drag Distance</span>
					<span class="font-mono">{Math.round(mouseDiagnostics.dragDistance)} px</span>
				</div>
			</div>
			<p class="text-text-muted mt-4 text-xs">
				Drag and hold values are based on browser mouse events, so lost focus or leaving the
				browser window can interrupt a run.
			</p>
		</div>
	</div>
</div>
