# Triage Guide

This document explains how maintainers and contributors should use labels and route work in **Browser Hardware Diagnostics**.

## Label meanings

### Contribution entry labels

- **good first issue** — safe onboarding tasks for first-time contributors
- **help wanted** — useful work where maintainers welcome outside contribution

### Technical scope labels

- **browser-api** — browser integration work
- **compatibility** — browser / OS / device support gaps
- **measurement** — accuracy, timing, or diagnostics methodology
- **a11y** — accessibility improvements
- **tooling** — repository workflow and developer experience
- **security** — security-sensitive review or documentation work
- **public-boundary** — open-source vs private deployment boundary questions

## Routing rules

- use **Discussions** for open-ended design exploration
- use **Issues** for scoped, actionable work
- use **SECURITY.md** for anything sensitive instead of a public issue

## Maintainer triage flow

1. decide whether the report is a discussion, issue, or private security report
2. add the closest technical scope label
3. mark onboarding-friendly work as **good first issue**
4. mark broader contribution-ready work as **help wanted**
5. keep anything private-deployment-specific out of the public toolkit backlog

## Boundary reminder

The public backlog should stay focused on reusable technical capabilities, not branded growth or monetization work.
