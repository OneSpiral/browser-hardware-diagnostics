import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const sponsoringPath = resolve(root, "SPONSORING.md");
const contributingPath = resolve(root, "CONTRIBUTING.md");
const codeOfConductPath = resolve(root, "CODE_OF_CONDUCT.md");
const codeownersPath = resolve(root, ".github/CODEOWNERS");
const architecturePath = resolve(root, "ARCHITECTURE.md");
const roadmapPath = resolve(root, "ROADMAP.md");
const fundingPath = resolve(root, ".github/FUNDING.yml");
const readmePath = resolve(root, "README.md");

describe("repository sponsorship docs", () => {
	it("has dedicated sponsorship and community documents", () => {
		expect(existsSync(sponsoringPath)).toBe(true);
		expect(existsSync(contributingPath)).toBe(true);
		expect(existsSync(codeOfConductPath)).toBe(true);
		expect(existsSync(codeownersPath)).toBe(true);
		expect(existsSync(architecturePath)).toBe(true);
		expect(existsSync(roadmapPath)).toBe(true);
	});

	it("explains that OSS is the technical solution and the branded website is a sponsor", () => {
		const sponsoring = readFileSync(sponsoringPath, "utf8");
		expect(sponsoring).toContain("technical solution");
		expect(sponsoring).toContain("hwprobe.com");
		expect(sponsoring).toContain("OneSpiral");
		expect(sponsoring).toContain("separate");
	});

	it("wires GitHub funding metadata with a fallback maintainer profile link", () => {
		const funding = readFileSync(fundingPath, "utf8");
		expect(funding).toContain("github: OneSpiral");
		expect(funding).toContain("https://github.com/OneSpiral");
	});

	it("surfaces maintainer, sponsor, and community positioning in the README", () => {
		const readme = readFileSync(readmePath, "utf8");
		expect(readme).toContain("browser hardware diagnostics toolkit");
		expect(readme).toContain("Maintained by **[OneSpiral](https://github.com/OneSpiral)**");
		expect(readme).toContain("Sponsored by **[hwprobe.com](https://hwprobe.com)**");
		expect(readme).toContain("community");
	});

	it("describes how contributors can improve technical capabilities", () => {
		const contributing = readFileSync(contributingPath, "utf8");
		expect(contributing).toContain("technical capabilities");
		expect(contributing).toContain("issues");
		expect(contributing).toContain("pull requests");
	});

	it("includes a contributor code of conduct", () => {
		const conduct = readFileSync(codeOfConductPath, "utf8");
		expect(conduct).toContain("respectful");
		expect(conduct).toContain("welcoming");
		expect(conduct).toContain("report");
	});

	it("declares maintainers through CODEOWNERS", () => {
		const codeowners = readFileSync(codeownersPath, "utf8");
		expect(codeowners).toContain("@OneSpiral");
		expect(codeowners).toContain("*");
	});
});
