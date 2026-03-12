import { afterEach, describe, expect, it } from "vitest";
import {
	createGamepadButtonStub,
	createGamepadStub,
	restoreBrowserMocks,
	stubNavigatorGamepads,
} from "../test-fixtures/browser";
import {
	BUTTON_LABELS,
	axisToPixel,
	calcDeadzone,
	readConnectedGamepads,
	resolveActiveGamepad,
} from "./gamepad";

afterEach(() => {
	restoreBrowserMocks();
});

describe("gamepad utils", () => {
	describe("BUTTON_LABELS", () => {
		it("has standard 17 button labels", () => {
			expect(BUTTON_LABELS).toHaveLength(17);
		});

		it("starts with A, B, X, Y", () => {
			expect(BUTTON_LABELS[0]).toBe("A");
			expect(BUTTON_LABELS[1]).toBe("B");
			expect(BUTTON_LABELS[2]).toBe("X");
			expect(BUTTON_LABELS[3]).toBe("Y");
		});
	});

	describe("readConnectedGamepads", () => {
		it("returns snapshots for all connected controller slots", () => {
			stubNavigatorGamepads([
				createGamepadStub({
					id: "Pad A",
					index: 0,
					buttons: [createGamepadButtonStub({ pressed: true, value: 1 })],
					axes: [0.25, -0.5],
					timestamp: 10,
				}),
				null,
				createGamepadStub({
					id: "Pad B",
					index: 2,
					buttons: [createGamepadButtonStub()],
					axes: [0, 1],
					timestamp: 20,
				}),
			]);

			const snapshots = readConnectedGamepads();
			expect(snapshots).toHaveLength(2);
			expect(snapshots[0]).toMatchObject({ id: "Pad A", index: 0, axes: [0.25, -0.5] });
			expect(snapshots[1]).toMatchObject({ id: "Pad B", index: 2, axes: [0, 1] });
		});
	});

	describe("resolveActiveGamepad", () => {
		const snapshots = [
			{ id: "Pad A", index: 0, buttons: [], axes: [], timestamp: 1 },
			{ id: "Pad B", index: 2, buttons: [], axes: [], timestamp: 2 },
		];

		it("returns the selected controller when its slot is still connected", () => {
			expect(resolveActiveGamepad(snapshots, 2)?.id).toBe("Pad B");
		});

		it("falls back to the first connected controller when the selected slot disappears", () => {
			expect(resolveActiveGamepad(snapshots, 5)?.id).toBe("Pad A");
		});

		it("returns null when no controllers are connected", () => {
			expect(resolveActiveGamepad([], 0)).toBeNull();
		});
	});

	describe("calcDeadzone", () => {
		it("returns 0 for centered axis", () => {
			expect(calcDeadzone(0)).toBe(0);
		});

		it("returns 100 for fully pushed axis", () => {
			expect(calcDeadzone(1)).toBe(100);
			expect(calcDeadzone(-1)).toBe(100);
		});

		it("returns percentage for partial values", () => {
			expect(calcDeadzone(0.5)).toBe(50);
			expect(calcDeadzone(-0.25)).toBe(25);
		});
	});

	describe("axisToPixel", () => {
		it("maps center (0) to half the size", () => {
			expect(axisToPixel(0, 100)).toBe(50);
		});

		it("maps -1 to 0", () => {
			expect(axisToPixel(-1, 100)).toBe(0);
		});

		it("maps +1 to full size", () => {
			expect(axisToPixel(1, 100)).toBe(100);
		});

		it("works with arbitrary size", () => {
			expect(axisToPixel(0, 200)).toBe(100);
			expect(axisToPixel(0.5, 120)).toBe(90);
		});
	});
});
