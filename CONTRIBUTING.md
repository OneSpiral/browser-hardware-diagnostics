# Contributing

Thanks for helping improve **Browser Hardware Diagnostics**.

This repository is for growing shared **technical capabilities** in browser-based hardware diagnostics, not for shipping private growth systems for any branded website.

## Good contribution areas

We especially welcome issues and pull requests for:

- browser compatibility fixes
- cleaner hardware diagnostics APIs
- more accurate measurements
- accessibility improvements
- test coverage
- performance improvements
- extensibility for new diagnostic modules
- better developer ergonomics

## Before opening work

1. Search existing **issues** first.
2. If the change is non-trivial, open an issue describing the problem and proposed approach.
3. Keep feature requests focused on reusable technical value.

## Pull requests

Please keep pull requests scoped and technical.

A good pull request should:

- improve the toolkit itself
- include tests when behavior changes
- avoid private growth logic or monetization logic
- explain the technical tradeoffs clearly

## Development flow

This repository follows a TDD-first workflow:

1. write a failing test
2. make it pass
3. refactor safely
4. run checks before commit

## Validation

Run before submitting pull requests:

```bash
pnpm check
npx vitest run
pnpm build
```

## Out of scope

Please do not submit pull requests for:

- ads / affiliate logic
- private SEO systems
- branded landing-page growth tactics
- analytics experiments tied to a private deployment

Those belong outside the open-source technical solution.
