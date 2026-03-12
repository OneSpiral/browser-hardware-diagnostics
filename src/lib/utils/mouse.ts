export const MOUSE_BUTTON_NAMES: Record<number, string> = {
	0: "Left",
	1: "Middle",
	2: "Right",
	3: "Back",
	4: "Forward",
};

export interface PointerPosition {
	x: number;
	y: number;
}

export interface MouseButtonMetrics {
	count: number;
	isPressed: boolean;
	pressStartedAt: number | null;
	lastHoldMs: number;
	maxHoldMs: number;
}

export interface MouseDiagnosticsState {
	buttons: Record<number, MouseButtonMetrics>;
	activeDragButton: number | null;
	dragDistance: number;
	lastPosition: PointerPosition | null;
}

function createMouseButtonMetrics(): MouseButtonMetrics {
	return {
		count: 0,
		isPressed: false,
		pressStartedAt: null,
		lastHoldMs: 0,
		maxHoldMs: 0,
	};
}

function distanceBetween(a: PointerPosition, b: PointerPosition): number {
	const dx = b.x - a.x;
	const dy = b.y - a.y;
	return Math.sqrt(dx * dx + dy * dy);
}

export function createMouseDiagnosticsState(): MouseDiagnosticsState {
	return {
		buttons: {},
		activeDragButton: null,
		dragDistance: 0,
		lastPosition: null,
	};
}

export function recordMouseDown(
	state: MouseDiagnosticsState,
	button: number,
	at: number,
	position: PointerPosition,
): MouseDiagnosticsState {
	const metrics = state.buttons[button] ?? createMouseButtonMetrics();

	return {
		...state,
		buttons: {
			...state.buttons,
			[button]: {
				...metrics,
				count: metrics.count + 1,
				isPressed: true,
				pressStartedAt: at,
			},
		},
		activeDragButton: button,
		dragDistance: 0,
		lastPosition: position,
	};
}

export function recordMouseMove(
	state: MouseDiagnosticsState,
	position: PointerPosition,
): MouseDiagnosticsState {
	if (state.activeDragButton === null || !state.lastPosition) {
		return state;
	}

	return {
		...state,
		dragDistance: state.dragDistance + distanceBetween(state.lastPosition, position),
		lastPosition: position,
	};
}

export function recordMouseUp(
	state: MouseDiagnosticsState,
	button: number,
	at: number,
	position?: PointerPosition,
): MouseDiagnosticsState {
	const metrics = state.buttons[button] ?? createMouseButtonMetrics();
	const holdMs = metrics.pressStartedAt === null ? 0 : Math.max(0, at - metrics.pressStartedAt);

	return {
		...state,
		buttons: {
			...state.buttons,
			[button]: {
				...metrics,
				isPressed: false,
				pressStartedAt: null,
				lastHoldMs: holdMs,
				maxHoldMs: Math.max(metrics.maxHoldMs, holdMs),
			},
		},
		activeDragButton: state.activeDragButton === button ? null : state.activeDragButton,
		lastPosition: state.activeDragButton === button ? null : (position ?? state.lastPosition),
	};
}

export function getCurrentHoldMs(
	state: MouseDiagnosticsState,
	button: number,
	now: number,
): number {
	const metrics = state.buttons[button];
	if (!metrics?.isPressed || metrics.pressStartedAt === null) return 0;
	return Math.max(0, now - metrics.pressStartedAt);
}

export function isDragging(state: MouseDiagnosticsState): boolean {
	return state.activeDragButton !== null && state.dragDistance > 0;
}
