import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const gamepadPagePath = resolve(root, "src/routes/gamepad/+page.svelte");
const compatibilityPath = resolve(root, "COMPATIBILITY.md");

describe("gamepad multi-controller support", () => {
	it("lists connected controllers and makes slot selection explicit", () => {
		const page = readFileSync(gamepadPagePath, "utf8");
		expect(page).toContain("Connected Controllers");
		expect(page).toContain("selectedGamepadIndex");
		expect(page).toContain("resolveActiveGamepad");
		expect(page).toContain("aria-pressed={selectedGamepadIndex === gamepad.index}");
		expect(page).toContain("Controller {gamepad.index + 1}");
	});

	it("documents browser caveats for multiple connected gamepads", () => {
		const compatibility = readFileSync(compatibilityPath, "utf8").toLowerCase();
		expect(compatibility).toContain("multiple connected controllers");
		expect(compatibility).toContain("slot");
	});
});
