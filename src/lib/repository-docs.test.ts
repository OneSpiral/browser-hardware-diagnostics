import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const sponsoringPath = resolve(root, "SPONSORING.md");
const contributingPath = resolve(root, "CONTRIBUTING.md");
const codeOfConductPath = resolve(root, "CODE_OF_CONDUCT.md");
const codeownersPath = resolve(root, ".github/CODEOWNERS");
const compatibilityPath = resolve(root, "COMPATIBILITY.md");
const measurementLimitsPath = resolve(root, "MEASUREMENT_LIMITS.md");
const permissionChecklistPath = resolve(root, "PERMISSION_CHECKLIST.md");
const discussionsPath = resolve(root, "DISCUSSIONS.md");
const triagePath = resolve(root, "TRIAGE.md");
const securityPath = resolve(root, "SECURITY.md");
const licensePath = resolve(root, "LICENSE");
const bugTemplatePath = resolve(root, ".github/ISSUE_TEMPLATE/bug-report.yml");
const featureTemplatePath = resolve(root, ".github/ISSUE_TEMPLATE/feature-request.yml");
const ciWorkflowPath = resolve(root, ".github/workflows/ci.yml");
const dependabotPath = resolve(root, ".github/dependabot.yml");
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
		expect(existsSync(compatibilityPath)).toBe(true);
		expect(existsSync(measurementLimitsPath)).toBe(true);
		expect(existsSync(permissionChecklistPath)).toBe(true);
		expect(existsSync(discussionsPath)).toBe(true);
		expect(existsSync(triagePath)).toBe(true);
		expect(existsSync(securityPath)).toBe(true);
		expect(existsSync(licensePath)).toBe(true);
		expect(existsSync(ciWorkflowPath)).toBe(true);
		expect(existsSync(dependabotPath)).toBe(true);
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

	it("includes a standard MIT license file", () => {
		const license = readFileSync(licensePath, "utf8");
		expect(license).toContain("MIT License");
		expect(license).toContain("Permission is hereby granted, free of charge");
	});

	it("surfaces maintainer, sponsor, and community positioning in the README", () => {
		const readme = readFileSync(readmePath, "utf8");
		expect(readme).toContain("browser hardware diagnostics toolkit");
		expect(readme).toContain("Maintained by **[OneSpiral](https://github.com/OneSpiral)**");
		expect(readme).toContain("Sponsored by **[hwprobe.com](https://hwprobe.com)**");
		expect(readme).toContain("community");
		expect(readme).toContain("actions/workflows/ci.yml");
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
		expect(security).toContain("PERMISSION_CHECKLIST.md");
	});

	it("asks for richer technical context in issue forms", () => {
		const bugTemplate = readFileSync(bugTemplatePath, "utf8");
		const featureTemplate = readFileSync(featureTemplatePath, "utf8");
		expect(bugTemplate).toContain("Summary");
		expect(bugTemplate).toContain("Browser");
		expect(bugTemplate).toContain("Expected behavior");
		expect(bugTemplate).toContain("Actual behavior");
		expect(bugTemplate).toContain("Console output");
		expect(bugTemplate).toContain("SECURITY.md");
		expect(featureTemplate).toContain("[scope]: concise action");
		expect(featureTemplate).toContain("Summary");
		expect(featureTemplate).toContain("Scope");
		expect(featureTemplate).toContain("Why this matters");
		expect(featureTemplate).toContain("API surface");
		expect(featureTemplate).toContain("Acceptance criteria");
		expect(featureTemplate).toContain("Non-goals");
	});

	it("includes GitHub automation for CI and dependency updates", () => {
		const ciWorkflow = readFileSync(ciWorkflowPath, "utf8");
		const dependabot = readFileSync(dependabotPath, "utf8");
		expect(ciWorkflow).toContain("pull_request");
		expect(ciWorkflow).toContain("push");
		expect(ciWorkflow).toContain("pnpm install");
		expect(ciWorkflow).toContain("npx vitest run");
		expect(ciWorkflow).toContain("pnpm check");
		expect(ciWorkflow).toContain("pnpm build");
		expect(dependabot).toContain("package-ecosystem: npm");
		expect(dependabot).toContain("package-ecosystem: github-actions");
		expect(dependabot).toContain('directory: "/"');
	});

	it("documents how discussions should be used", () => {
		const discussions = readFileSync(discussionsPath, "utf8");
		expect(discussions).toContain("design ideas");
		expect(discussions).toContain("security");
		expect(discussions).toContain("browser compatibility");
	});

	it("documents public issue writing conventions", () => {
		const contributing = readFileSync(contributingPath, "utf8");
		expect(contributing).toContain("scope: concise action");
		expect(contributing).toContain("Summary");
		expect(contributing).toContain("Acceptance criteria");
	});

	it("documents triage rules for labels and collaboration flow", () => {
		const triage = readFileSync(triagePath, "utf8");
		expect(triage).toContain("good first issue");
		expect(triage).toContain("help wanted");
		expect(triage).toContain("security");
		expect(triage).toContain("compatibility");
		expect(triage).toContain("priority: p1");
		expect(triage).toContain("status: ready");
		expect(triage).toContain("milestone");
		expect(triage).toContain("scope: concise action");
	});

	it("publishes a browser compatibility matrix for all diagnostics modules", () => {
		const compatibility = readFileSync(compatibilityPath, "utf8");
		expect(compatibility).toContain("Chrome");
		expect(compatibility).toContain("Edge");
		expect(compatibility).toContain("Safari");
		expect(compatibility).toContain("Firefox");
		expect(compatibility).toContain("Gamepad");
		expect(compatibility).toContain("Keyboard");
		expect(compatibility).toContain("Mouse");
		expect(compatibility).toContain("Monitor");
		expect(compatibility).toContain("Microphone");
		expect(compatibility).toContain("Speakers");
		expect(compatibility).toContain("Gamepad API");
		expect(compatibility).toContain("MediaDevices");
	});

	it("publishes measurement guidance for refresh-rate and polling estimates", () => {
		const measurementLimits = readFileSync(measurementLimitsPath, "utf8");
		expect(measurementLimits).toContain("refresh-rate");
		expect(measurementLimits).toContain("polling");
		expect(measurementLimits).toContain("event loop");
		expect(measurementLimits).toContain("requestAnimationFrame");
		expect(measurementLimits).toContain("approximate");
		expect(measurementLimits).toContain("not a replacement for dedicated hardware tools");
	});

	it("publishes a permission-handling checklist for media diagnostics", () => {
		const checklist = readFileSync(permissionChecklistPath, "utf8");
		expect(checklist).toContain("permission prompt");
		expect(checklist).toContain("denied");
		expect(checklist).toContain("secure context");
		expect(checklist).toContain("user gesture");
		expect(checklist).toContain("microphone");
	});

	it("links compatibility, measurement, and permission docs from the README", () => {
		const readme = readFileSync(readmePath, "utf8");
		expect(readme).toContain("[COMPATIBILITY.md](./COMPATIBILITY.md)");
		expect(readme).toContain("[MEASUREMENT_LIMITS.md](./MEASUREMENT_LIMITS.md)");
		expect(readme).toContain("[PERMISSION_CHECKLIST.md](./PERMISSION_CHECKLIST.md)");
	});
});
