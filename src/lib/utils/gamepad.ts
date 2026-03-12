/** Standard gamepad button labels (Xbox layout) */
export const BUTTON_LABELS = [
	"A",
	"B",
	"X",
	"Y",
	"LB",
	"RB",
	"LT",
	"RT",
	"Back",
	"Start",
	"LS",
	"RS",
	"Up",
	"Down",
	"Left",
	"Right",
	"Home",
] as const;

export interface GamepadSnapshot {
	id: string;
	index: number;
	buttons: { pressed: boolean; value: number }[];
	axes: number[];
	timestamp: number;
}

function snapshotGamepad(gamepad: Gamepad): GamepadSnapshot {
	return {
		id: gamepad.id,
		index: gamepad.index,
		buttons: gamepad.buttons.map((b) => ({ pressed: b.pressed, value: b.value })),
		axes: gamepad.axes.map((a) => a),
		timestamp: gamepad.timestamp,
	};
}

/** Read current state of a connected gamepad */
export function readGamepad(index: number): GamepadSnapshot | null {
	const gp = navigator.getGamepads()[index];
	if (!gp) return null;
	return snapshotGamepad(gp);
}

/** Read snapshots for all currently connected gamepads */
export function readConnectedGamepads(): GamepadSnapshot[] {
	return Array.from(navigator.getGamepads())
		.filter((gamepad): gamepad is Gamepad => gamepad !== null)
		.map(snapshotGamepad);
}

/** Resolve the active controller from the current connected snapshots */
export function resolveActiveGamepad(
	snapshots: GamepadSnapshot[],
	selectedIndex: number | null,
): GamepadSnapshot | null {
	if (snapshots.length === 0) return null;
	if (selectedIndex !== null) {
		const selected = snapshots.find((snapshot) => snapshot.index === selectedIndex);
		if (selected) return selected;
	}
	return snapshots[0];
}

/** Calculate deadzone percentage from axis values */
export function calcDeadzone(axisValue: number): number {
	return Math.round(Math.abs(axisValue) * 100);
}

/** Map axis value to pixel position in a square area */
export function axisToPixel(
	axisValue: number,
	size: number,
): number {
	return ((axisValue + 1) / 2) * size;
}
