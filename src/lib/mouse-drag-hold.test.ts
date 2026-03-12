import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const mousePagePath = resolve(root, "src/routes/mouse/+page.svelte");
const measurementLimitsPath = resolve(root, "MEASUREMENT_LIMITS.md");

describe("mouse drag and hold diagnostics", () => {
	it("adds a dedicated hold and drag diagnostics section to the mouse page", () => {
		const page = readFileSync(mousePagePath, "utf8");
		expect(page).toContain("Hold & Drag");
		expect(page).toContain("recordMouseDown");
		expect(page).toContain("recordMouseMove");
		expect(page).toContain("recordMouseUp");
		expect(page).toContain("Current Hold");
		expect(page).toContain("Drag Distance");
	});

	it("documents browser-event caveats for drag and hold diagnostics", () => {
		const measurement = readFileSync(measurementLimitsPath, "utf8").toLowerCase();
		expect(measurement).toContain("drag");
		expect(measurement).toContain("hold");
		expect(measurement).toContain("pointer");
		expect(measurement).toContain("focus");
	});
});
