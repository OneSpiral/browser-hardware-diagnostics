import { describe, expect, it } from "vitest";
import {
	GITHUB_REPOSITORY_URL,
	SITE_NAME,
	SPONSOR_NAME,
	SPONSOR_PROFILE_URL,
	SPONSOR_TAGLINE,
} from "./site";

describe("site branding", () => {
	it("keeps the product brand separate from the sponsor", () => {
		expect(SITE_NAME).toBe("HWProbe");
		expect(SPONSOR_NAME).toBe("OneSpiral");
		expect(SPONSOR_NAME).not.toBe(SITE_NAME);
	});

	it("uses the OneSpiral GitHub repository", () => {
		expect(GITHUB_REPOSITORY_URL).toBe("https://github.com/OneSpiral/hwprobe");
	});

	it("links the sponsor profile", () => {
		expect(SPONSOR_PROFILE_URL).toBe("https://github.com/OneSpiral");
	});

	it("presents OneSpiral as sponsor instead of owner copy", () => {
		expect(SPONSOR_TAGLINE).toContain("Sponsored by");
		expect(SPONSOR_TAGLINE).toContain(SPONSOR_NAME);
		expect(SPONSOR_TAGLINE).not.toContain("All rights reserved");
	});
});
