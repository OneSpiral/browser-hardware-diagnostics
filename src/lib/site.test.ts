import { describe, expect, it } from "vitest";
import {
	GITHUB_REPOSITORY_URL,
	MAINTAINER_NAME,
	MAINTAINER_PROFILE_URL,
	SITE_NAME,
	SPONSOR_NAME,
	SPONSOR_TAGLINE,
	SPONSOR_URL,
} from "./site";

describe("site branding", () => {
	it("positions the public project as a neutral technical toolkit", () => {
		expect(SITE_NAME).toBe("Browser Hardware Diagnostics");
		expect(SPONSOR_NAME).toBe("hwprobe.com");
		expect(MAINTAINER_NAME).toBe("OneSpiral");
		expect(SPONSOR_NAME).not.toBe(MAINTAINER_NAME);
	});

	it("uses the renamed public GitHub repository", () => {
		expect(GITHUB_REPOSITORY_URL).toBe(
			"https://github.com/OneSpiral/browser-hardware-diagnostics",
		);
	});

	it("separates maintainer and sponsor URLs", () => {
		expect(MAINTAINER_PROFILE_URL).toBe("https://github.com/OneSpiral");
		expect(SPONSOR_URL).toBe("https://hwprobe.com");
	});

	it("presents the website as sponsor and OneSpiral as maintainer", () => {
		expect(SPONSOR_TAGLINE).toContain("Sponsored by");
		expect(SPONSOR_TAGLINE).toContain(SPONSOR_NAME);
		expect(SPONSOR_TAGLINE).not.toContain("All rights reserved");
	});
});
