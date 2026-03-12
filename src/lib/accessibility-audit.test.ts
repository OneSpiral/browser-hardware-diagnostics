import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const auditPath = resolve(root, "A11Y_AUDIT.md");
const appCssPath = resolve(root, "src/app.css");
const layoutPath = resolve(root, "src/routes/+layout.svelte");
const navPath = resolve(root, "src/lib/components/nav.svelte");
const keyboardPath = resolve(root, "src/routes/keyboard/+page.svelte");
const speakersPath = resolve(root, "src/routes/speakers/+page.svelte");
const readmePath = resolve(root, "README.md");

describe("accessibility audit", () => {
	it("publishes an accessibility audit document", () => {
		expect(existsSync(auditPath)).toBe(true);
		const audit = readFileSync(auditPath, "utf8");
		expect(audit).toContain("keyboard navigation");
		expect(audit).toContain("focus visibility");
		expect(audit).toContain("top navigation");
		expect(audit).toContain("Keyboard Tester");
		expect(audit).toContain("skip link");
	});

	it("adds a skip link and a focusable main landmark target", () => {
		const layout = readFileSync(layoutPath, "utf8");
		expect(layout).toContain("Skip to main content");
		expect(layout).toContain('id="main-content"');
		expect(layout).toContain('tabindex="-1"');
	});

	it("improves navigation semantics for active links and the mobile menu", () => {
		const nav = readFileSync(navPath, "utf8");
		expect(nav).toContain('aria-label="Primary"');
		expect(nav).toContain("aria-current=");
		expect(nav).toContain('aria-controls="mobile-navigation"');
		expect(nav).toContain('id="mobile-navigation"');
	});

	it("applies reusable focus-visible styles to interactive elements", () => {
		const css = readFileSync(appCssPath, "utf8");
		expect(css).toContain(":focus-visible");
		expect(css).toContain("a:focus-visible");
		expect(css).toContain("button:focus-visible");
		expect(css).toContain("summary:focus-visible");
		expect(css).toContain("input:focus-visible");
	});

	it("does not globally block keyboard navigation in the keyboard tester", () => {
		const keyboard = readFileSync(keyboardPath, "utf8");
		expect(keyboard).toContain("interactiveSelector");
		expect(keyboard).toContain('e.key === "Tab"');
		expect(keyboard).not.toContain("e.preventDefault();");
	});

	it("adds pressed-state semantics for speaker toggle buttons", () => {
		const speakers = readFileSync(speakersPath, "utf8");
		expect(speakers).toContain("aria-pressed={frequency === preset.freq}");
		expect(speakers).toContain("aria-pressed={waveform === w.value}");
	});

	it("links the accessibility audit from the README", () => {
		const readme = readFileSync(readmePath, "utf8");
		expect(readme).toContain("[A11Y_AUDIT.md](./A11Y_AUDIT.md)");
	});
});
