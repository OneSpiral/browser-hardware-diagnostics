import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const sponsoringPath = resolve(root, "SPONSORING.md");
const fundingPath = resolve(root, ".github/FUNDING.yml");
const readmePath = resolve(root, "README.md");

describe("repository sponsorship docs", () => {
	it("has a dedicated sponsoring document", () => {
		expect(existsSync(sponsoringPath)).toBe(true);
	});

	it("explains that OSS is the technical solution and distribution is separate", () => {
		const sponsoring = readFileSync(sponsoringPath, "utf8");
		expect(sponsoring).toContain("OneSpiral");
		expect(sponsoring).toContain("technical solution");
		expect(sponsoring).toContain("separate");
	});

	it("wires GitHub funding metadata with a fallback profile link", () => {
		const funding = readFileSync(fundingPath, "utf8");
		expect(funding).toContain("github: OneSpiral");
		expect(funding).toContain("https://github.com/OneSpiral");
	});

	it("surfaces sponsor positioning in the README", () => {
		const readme = readFileSync(readmePath, "utf8");
		expect(readme).toContain("Sponsored by **[OneSpiral](https://github.com/OneSpiral)**");
		expect(readme).toContain("technical implementation");
		expect(readme).toContain("Support the sponsor");
	});
});
