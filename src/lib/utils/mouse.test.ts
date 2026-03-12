import { describe, expect, it } from "vitest";
import {
	MOUSE_BUTTON_NAMES,
	createMouseDiagnosticsState,
	getCurrentHoldMs,
	isDragging,
	recordMouseDown,
	recordMouseMove,
	recordMouseUp,
} from "./mouse";

describe("mouse utils", () => {
	it("exposes standard mouse button labels", () => {
		expect(MOUSE_BUTTON_NAMES[0]).toBe("Left");
		expect(MOUSE_BUTTON_NAMES[1]).toBe("Middle");
		expect(MOUSE_BUTTON_NAMES[2]).toBe("Right");
	});

	it("starts hold tracking when a button is pressed", () => {
		const state = recordMouseDown(createMouseDiagnosticsState(), 0, 100, { x: 10, y: 20 });
		expect(state.buttons[0]).toMatchObject({ count: 1, isPressed: true, pressStartedAt: 100 });
		expect(state.activeDragButton).toBe(0);
	});

	it("accumulates drag distance while a button is held", () => {
		let state = recordMouseDown(createMouseDiagnosticsState(), 0, 100, { x: 0, y: 0 });
		state = recordMouseMove(state, { x: 3, y: 4 });
		state = recordMouseMove(state, { x: 6, y: 8 });
		expect(Math.round(state.dragDistance)).toBe(10);
		expect(isDragging(state)).toBe(true);
	});

	it("records hold durations when a button is released", () => {
		let state = recordMouseDown(createMouseDiagnosticsState(), 0, 100, { x: 5, y: 5 });
		state = recordMouseMove(state, { x: 10, y: 5 });
		state = recordMouseUp(state, 0, 450, { x: 10, y: 5 });
		expect(state.buttons[0]).toMatchObject({
			isPressed: false,
			lastHoldMs: 350,
			maxHoldMs: 350,
			pressStartedAt: null,
		});
		expect(state.activeDragButton).toBeNull();
	});

	it("reports the current hold duration for an active button", () => {
		const state = recordMouseDown(createMouseDiagnosticsState(), 2, 1000, { x: 1, y: 1 });
		expect(getCurrentHoldMs(state, 2, 1325)).toBe(325);
		expect(getCurrentHoldMs(state, 0, 1325)).toBe(0);
	});
});
