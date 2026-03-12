import { afterEach, describe, expect, it } from "vitest";
import {
	createGamepadStub,
	createMediaStreamStub,
	restoreBrowserMocks,
	stubMediaDevicesGetUserMedia,
	stubNavigatorGamepads,
} from "./browser";

afterEach(() => {
	restoreBrowserMocks();
});

describe("browser test fixtures", () => {
	it("creates reusable gamepad stubs with sensible defaults", () => {
		const gamepad = createGamepadStub({ id: "Pad A", index: 2, axes: [0.5, -0.5] });
		expect(gamepad.id).toBe("Pad A");
		expect(gamepad.index).toBe(2);
		expect(gamepad.connected).toBe(true);
		expect(gamepad.axes).toEqual([0.5, -0.5]);
	});

	it("stubs navigator.getGamepads with connected controller slots", () => {
		stubNavigatorGamepads([
			createGamepadStub({ id: "Pad A", index: 0 }),
			null,
			createGamepadStub({ id: "Pad B", index: 2 }),
		]);

		expect(navigator.getGamepads()[0]?.id).toBe("Pad A");
		expect(navigator.getGamepads()[1]).toBeNull();
		expect(navigator.getGamepads()[2]?.id).toBe("Pad B");
	});

	it("stubs mediaDevices.getUserMedia with a reusable media stream fixture", async () => {
		const stream = createMediaStreamStub({ id: "stream-1", trackCount: 2 });
		const getUserMedia = stubMediaDevicesGetUserMedia(async () => stream);

		await expect(navigator.mediaDevices.getUserMedia({ audio: true })).resolves.toBe(stream);
		expect(getUserMedia).toHaveBeenCalledWith({ audio: true });
		expect(stream.getTracks()).toHaveLength(2);
	});
});
