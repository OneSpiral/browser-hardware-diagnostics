import { vi } from "vitest";

export interface GamepadButtonStubOptions {
	pressed?: boolean;
	touched?: boolean;
	value?: number;
}

export interface GamepadStubOptions {
	id?: string;
	index?: number;
	buttons?: GamepadButton[];
	axes?: number[];
	timestamp?: number;
	mapping?: GamepadMappingType;
}

export interface MediaStreamStubOptions {
	id?: string;
	trackCount?: number;
	kind?: "audio" | "video";
}

function withNavigatorPatch(patch: Record<string, unknown>) {
	const currentNavigator = (globalThis.navigator ?? {}) as unknown as Record<string, unknown>;
	vi.stubGlobal("navigator", {
		...currentNavigator,
		...patch,
	});
}

export function createGamepadButtonStub(
	options: GamepadButtonStubOptions = {},
): GamepadButton {
	const { pressed = false, touched = pressed, value = pressed ? 1 : 0 } = options;
	return {
		pressed,
		touched,
		value,
	} as GamepadButton;
}

export function createGamepadStub(options: GamepadStubOptions = {}): Gamepad {
	const {
		id = "Test Controller",
		index = 0,
		buttons = [createGamepadButtonStub()],
		axes = [],
		timestamp = 0,
		mapping = "standard",
	} = options;

	return {
		connected: true,
		id,
		index,
		mapping,
		timestamp,
		buttons,
		axes,
		vibrationActuator: null,
	} as unknown as Gamepad;
}

export function stubNavigatorGamepads(gamepads: (Gamepad | null)[]) {
	withNavigatorPatch({
		getGamepads: () => gamepads,
	});
}

export function createMediaStreamStub(options: MediaStreamStubOptions = {}): MediaStream {
	const { id = "stream-1", trackCount = 1, kind = "audio" } = options;
	const tracks = Array.from({ length: trackCount }, (_, index) => {
		return {
			id: `${id}-track-${index + 1}`,
			kind,
			label: `${kind} track ${index + 1}`,
			enabled: true,
			muted: false,
			readyState: "live",
			stop: vi.fn(),
		} as unknown as MediaStreamTrack;
	});

	return {
		id,
		active: true,
		getTracks: () => tracks,
		getAudioTracks: () => tracks.filter((track) => track.kind === "audio"),
		getVideoTracks: () => tracks.filter((track) => track.kind === "video"),
	} as MediaStream;
}

export function stubMediaDevicesGetUserMedia(
	implementation: (constraints: MediaStreamConstraints) => Promise<MediaStream> = async () =>
		createMediaStreamStub(),
) {
	const getUserMedia = vi.fn(implementation);
	const currentNavigator = (globalThis.navigator ?? {}) as unknown as Record<string, unknown>;
	const currentMediaDevices = (currentNavigator.mediaDevices ?? {}) as Record<string, unknown>;

	withNavigatorPatch({
		mediaDevices: {
			...currentMediaDevices,
			getUserMedia,
		},
	});

	return getUserMedia;
}

export function restoreBrowserMocks() {
	vi.unstubAllGlobals();
}
