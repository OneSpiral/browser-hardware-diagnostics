import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const sponsoringPath = resolve(root, "SPONSORING.md");
const contributingPath = resolve(root, "CONTRIBUTING.md");
const codeOfConductPath = resolve(root, "CODE_OF_CONDUCT.md");
const codeownersPath = resolve(root, ".github/CODEOWNERS");
const discussionsPath = resolve(root, "DISCUSSIONS.md");
const triagePath = resolve(root, "TRIAGE.md");
const securityPath = resolve(root, "SECURITY.md");
const bugTemplatePath = resolve(root, ".github/ISSUE_TEMPLATE/bug-report.yml");
const featureTemplatePath = resolve(root, ".github/ISSUE_TEMPLATE/feature-request.yml");
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
		expect(existsSync(discussionsPath)).toBe(true);
		expect(existsSync(triagePath)).toBe(true);
		expect(existsSync(securityPath)).toBe(true);
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

	it("documents a responsible security reporting path", () => {
		const security = readFileSync(securityPath, "utf8");
		expect(security).toContain("security");
		expect(security).toContain("OneSpiral");
		expect(security).toContain("public issue");
	});

	it("asks for richer technical context in issue forms", () => {
		const bugTemplate = readFileSync(bugTemplatePath, "utf8");
		const featureTemplate = readFileSync(featureTemplatePath, "utf8");
		expect(bugTemplate).toContain("Browser");
		expect(bugTemplate).toContain("Console output");
		expect(featureTemplate).toContain("API surface");
		expect(featureTemplate).toContain("Acceptance criteria");
	});

	it("documents how discussions should be used", () => {
		const discussions = readFileSync(discussionsPath, "utf8");
		expect(discussions).toContain("design ideas");
		expect(discussions).toContain("security");
		expect(discussions).toContain("browser compatibility");
	});

	it("documents triage rules for labels and collaboration flow", () => {
		const triage = readFileSync(triagePath, "utf8");
		expect(triage).toContain("good first issue");
		expect(triage).toContain("help wanted");
		expect(triage).toContain("security");
		expect(triage).toContain("compatibility");
	});
});
