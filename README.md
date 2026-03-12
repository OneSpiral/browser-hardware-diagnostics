# Browser Hardware Diagnostics

[![CI](https://github.com/OneSpiral/browser-hardware-diagnostics/actions/workflows/ci.yml/badge.svg)](https://github.com/OneSpiral/browser-hardware-diagnostics/actions/workflows/ci.yml)
[![Live Sponsor](https://img.shields.io/badge/sponsor-hwprobe.com-6366f1)](https://hwprobe.com)
[![Maintainer](https://img.shields.io/badge/maintainer-OneSpiral-111827)](https://github.com/OneSpiral)
[![License: MIT](https://img.shields.io/badge/license-MIT-22c55e)](./LICENSE)

**Open-source browser hardware diagnostics toolkit.**

Maintained by **[OneSpiral](https://github.com/OneSpiral)**.  
Sponsored by **[hwprobe.com](https://hwprobe.com)**.

This repository is the neutral, community-facing technical solution for browser-based hardware testing. It is meant to be improved in public so the ecosystem can collectively expand browser hardware diagnostics capabilities.

## Why this repository exists

This project exists to provide a reusable toolkit for testing hardware directly in the browser:

- gamepad input diagnostics
- keyboard state and rollover testing
- mouse click / movement / scroll testing
- monitor refresh and dead-pixel checks
- microphone capture diagnostics
- speaker / tone playback testing

The branded production website is **not** the repository itself.

Instead:

- this repo is the **technical solution**
- **hwprobe.com** is a sponsored production adopter
- **OneSpiral** maintains the open-source core
- community contributors can help improve technical capabilities for everyone

## Live production adopter

The primary sponsored production deployment is:

- **hwprobe.com** → https://hwprobe.com

That site can sponsor the open-source project with high-quality backlinks, adoption proof, and real-world usage, while the repository stays neutral and open for broader community contribution.

## Workspace layers

We use a three-layer portfolio model:

- **solutions** — reusable technical solutions that can be shared publicly
- **apps** — branded products and monetized deployments built on top of solutions
- **labs** — exploratory prototypes and research work that may later graduate into solutions or apps

This repository belongs in **solutions**.

## Repository boundary

This repository contains:

- browser API integrations
- UI components for diagnostics
- maintainable core logic
- thin public validation for repo and boundary checks
- local development workflow
- public technical documentation

This repository does **not** contain:

- the private growth stack for any branded deployment
- private evaluation assets
- browser / device regression suites
- golden datasets, hidden fixtures, or tolerance thresholds

See [SPONSORING.md](./SPONSORING.md) for the sponsor / maintainer / production boundary.
See [TESTING_BOUNDARY.md](./TESTING_BOUNDARY.md) for the public-vs-private validation split.

## ❤️ Support the maintainer and sponsor

- **Maintainer:** [OneSpiral](https://github.com/OneSpiral)
- **GitHub Sponsors:** https://github.com/sponsors/OneSpiral
- **Sponsor / production adopter:** [hwprobe.com](https://hwprobe.com)

If GitHub Sponsors is not yet enabled on the account, the funding metadata still falls back cleanly to the maintainer profile.

## Community

If you want to help expand browser hardware diagnostics capabilities, start here:

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [ROADMAP.md](./ROADMAP.md)
- [TRIAGE.md](./TRIAGE.md)
- [A11Y_AUDIT.md](./A11Y_AUDIT.md)
- [COMPATIBILITY.md](./COMPATIBILITY.md)
- [MEASUREMENT_LIMITS.md](./MEASUREMENT_LIMITS.md)
- [PERMISSION_CHECKLIST.md](./PERMISSION_CHECKLIST.md)
- [CHANGELOG.md](./CHANGELOG.md)
- [TESTING_BOUNDARY.md](./TESTING_BOUNDARY.md)
- [DISCUSSIONS.md](./DISCUSSIONS.md)
- [Discussions](https://github.com/OneSpiral/browser-hardware-diagnostics/discussions)
- [Releases](https://github.com/OneSpiral/browser-hardware-diagnostics/releases)
- [Project board](https://github.com/users/OneSpiral/projects/3)

We want contributors to improve the toolkit itself — better diagnostics primitives, better browser compatibility, better public validation ergonomics, and better extensibility.

## Public testing boundary

This repository intentionally keeps only thin public validation:

- repository governance and boundary checks
- sponsor / maintainer / branding boundary checks
- non-sensitive smoke coverage for the OSS surface

Comprehensive browser and device evaluation work stays private as private evaluation assets.
That includes browser / device regression suites, golden datasets, hidden fixtures, and tolerance thresholds.

## Quick start

```bash
git clone https://github.com/OneSpiral/browser-hardware-diagnostics.git
cd browser-hardware-diagnostics
pnpm install
pnpm dev
```

## Tech stack

- **Framework**: SvelteKit 2 + Svelte 5 (runes)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide
- **Build**: Vite 7
- **Testing**: Vitest
- **Deploy target for branded sites**: Cloudflare Pages

## Validation

```bash
pnpm test:public
pnpm check
pnpm build
```

## License

MIT
