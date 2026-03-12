<script lang="ts">
	import { onMount } from "svelte";
	import { Volume2, Play, Square } from "lucide-svelte";

	let audioCtx: AudioContext | null = null;
	let oscillator: OscillatorNode | null = null;
	let gainNode: GainNode | null = null;
	let panner: StereoPannerNode | null = null;

	let playing = $state(false);
	let frequency = $state(440);
	let volumeLevel = $state(0.5);
	let waveform = $state<OscillatorType>("sine");
	let pan = $state(0);

	const WAVEFORMS: { value: OscillatorType; label: string }[] = [
		{ value: "sine", label: "Sine" },
		{ value: "square", label: "Square" },
		{ value: "sawtooth", label: "Sawtooth" },
		{ value: "triangle", label: "Triangle" },
	];

	const PRESETS: { label: string; freq: number }[] = [
		{ label: "Sub Bass (60 Hz)", freq: 60 },
		{ label: "Bass (120 Hz)", freq: 120 },
		{ label: "Mid (1 kHz)", freq: 1000 },
		{ label: "High (4 kHz)", freq: 4000 },
		{ label: "Very High (8 kHz)", freq: 8000 },
		{ label: "Ultra High (16 kHz)", freq: 16000 },
	];

	function initAudio() {
		if (!audioCtx) {
			audioCtx = new AudioContext();
		}
	}

	function startTone() {
		initAudio();
		if (!audioCtx) return;

		stopTone();

		oscillator = audioCtx.createOscillator();
		gainNode = audioCtx.createGain();
		panner = audioCtx.createStereoPanner();

		oscillator.type = waveform;
		oscillator.frequency.value = frequency;
		gainNode.gain.value = volumeLevel;
		panner.pan.value = pan;

		oscillator.connect(gainNode);
		gainNode.connect(panner);
		panner.connect(audioCtx.destination);

		oscillator.start();
		playing = true;
	}

	function stopTone() {
		oscillator?.stop();
		oscillator?.disconnect();
		oscillator = null;
		playing = false;
	}

	function updateFreq(f: number) {
		frequency = f;
		if (oscillator) oscillator.frequency.value = f;
	}

	function updateVolume(v: number) {
		volumeLevel = v;
		if (gainNode) gainNode.gain.value = v;
	}

	function updatePan(p: number) {
		pan = p;
		if (panner) panner.pan.value = p;
	}

	function updateWaveform(w: OscillatorType) {
		waveform = w;
		if (oscillator) oscillator.type = w;
	}

	function playChannelTest(panValue: number) {
		initAudio();
		if (!audioCtx) return;

		const osc = audioCtx.createOscillator();
		const gain = audioCtx.createGain();
		const p = audioCtx.createStereoPanner();

		osc.type = "sine";
		osc.frequency.value = 440;
		gain.gain.value = 0.5;
		p.pan.value = panValue;

		osc.connect(gain);
		gain.connect(p);
		p.connect(audioCtx.destination);

		osc.start();
		gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
		gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);
		osc.stop(audioCtx.currentTime + 1.5);
	}

	onMount(() => {
		return () => {
			stopTone();
			audioCtx?.close();
		};
	});
</script>

<svelte:head>
	<title>Speaker Tester — Browser Hardware Diagnostics</title>
	<meta
		name="description"
		content="Test your speakers with tone generator, left/right channel test, frequency sweep, and bass response."
	/>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8">
	<div class="mb-8 text-center">
		<h1 class="mb-2 flex items-center justify-center gap-2 text-3xl font-bold">
			<Volume2 class="text-brand h-8 w-8" />
			Speaker Tester
		</h1>
		<p class="text-text-muted">Test your speakers and audio output with tone generation.</p>
	</div>

	<div class="grid gap-4 sm:grid-cols-2">
		<!-- Channel Test -->
		<div class="bg-surface-light rounded-xl p-6">
			<h2 class="mb-4 text-sm font-semibold uppercase tracking-wider">Channel Test</h2>
			<p class="text-text-muted mb-4 text-sm">
				Test if your left and right speakers are working and correctly positioned.
			</p>
			<div class="grid grid-cols-3 gap-2">
				<button
					onclick={() => playChannelTest(-1)}
					class="bg-brand/10 hover:bg-brand/20 text-brand-light rounded-lg px-4 py-3 font-medium transition-colors"
				>
					◀ Left
				</button>
				<button
					onclick={() => playChannelTest(0)}
					class="bg-brand/10 hover:bg-brand/20 text-brand-light rounded-lg px-4 py-3 font-medium transition-colors"
				>
					Both
				</button>
				<button
					onclick={() => playChannelTest(1)}
					class="bg-brand/10 hover:bg-brand/20 text-brand-light rounded-lg px-4 py-3 font-medium transition-colors"
				>
					Right ▶
				</button>
			</div>
		</div>

		<!-- Frequency Presets -->
		<div class="bg-surface-light rounded-xl p-6">
			<h2 class="mb-4 text-sm font-semibold uppercase tracking-wider">Frequency Presets</h2>
			<div class="grid grid-cols-2 gap-2">
				{#each PRESETS as preset}
					<button
						type="button"
						onclick={() => {
							updateFreq(preset.freq);
							if (!playing) startTone();
						}}
						class="hover:bg-surface-lighter rounded-lg px-3 py-2.5 text-left text-sm transition-colors
							{frequency === preset.freq ? 'bg-brand/20 text-brand-light' : 'bg-surface text-text-muted'}"
						aria-pressed={frequency === preset.freq}
					>
						{preset.label}
					</button>
				{/each}
			</div>
		</div>

		<!-- Tone Generator -->
		<div class="bg-surface-light rounded-xl p-6 sm:col-span-2">
			<h2 class="mb-4 text-sm font-semibold uppercase tracking-wider">Tone Generator</h2>

			<div class="grid gap-6 sm:grid-cols-2">
				<div>
					<!-- Frequency -->
					<label class="mb-4 block">
						<span class="text-text-muted text-xs">
							Frequency: <strong class="text-text">{frequency} Hz</strong>
						</span>
						<input
							type="range"
							min="20"
							max="20000"
							step="1"
							value={frequency}
							oninput={(e) => updateFreq(Number(e.currentTarget.value))}
							class="mt-1 w-full accent-[var(--color-brand)]"
						/>
					</label>

					<!-- Volume -->
					<label class="mb-4 block">
						<span class="text-text-muted text-xs">
							Volume: <strong class="text-text">{Math.round(volumeLevel * 100)}%</strong>
						</span>
						<input
							type="range"
							min="0"
							max="1"
							step="0.01"
							value={volumeLevel}
							oninput={(e) => updateVolume(Number(e.currentTarget.value))}
							class="mt-1 w-full accent-[var(--color-brand)]"
						/>
					</label>

					<!-- Pan -->
					<label class="block">
						<span class="text-text-muted text-xs">
							Pan: <strong class="text-text"
								>{pan < 0 ? `Left ${Math.abs(Math.round(pan * 100))}%` : pan > 0 ? `Right ${Math.round(pan * 100)}%` : "Center"}</strong
							>
						</span>
						<input
							type="range"
							min="-1"
							max="1"
							step="0.01"
							value={pan}
							oninput={(e) => updatePan(Number(e.currentTarget.value))}
							class="mt-1 w-full accent-[var(--color-brand)]"
						/>
					</label>
				</div>

				<div>
					<!-- Waveform -->
					<p class="text-text-muted mb-2 text-xs">Waveform</p>
					<div class="mb-4 grid grid-cols-2 gap-2">
						{#each WAVEFORMS as w}
							<button
								type="button"
								onclick={() => updateWaveform(w.value)}
								class="rounded-lg px-3 py-2 text-sm transition-colors
									{waveform === w.value ? 'bg-brand/20 text-brand-light' : 'bg-surface text-text-muted hover:bg-surface-lighter'}"
								aria-pressed={waveform === w.value}
							>
								{w.label}
							</button>
						{/each}
					</div>

					<!-- Play/Stop -->
					{#if !playing}
						<button
							onclick={startTone}
							class="bg-brand hover:bg-brand-dark flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium text-white transition-colors"
						>
							<Play class="h-4 w-4" />
							Play Tone
						</button>
					{:else}
						<button
							onclick={stopTone}
							class="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-600 px-4 py-3 font-medium text-white transition-colors hover:bg-gray-500"
						>
							<Square class="h-4 w-4" />
							Stop
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
