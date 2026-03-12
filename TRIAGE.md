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

### Priority labels

- **priority: p0** — critical work
- **priority: p1** — high-priority work
- **priority: p2** — medium-priority work
- **priority: p3** — low-priority work

### Status labels

- **status: ready** — scoped and ready for contribution
- **status: needs-design** — needs design discussion before implementation
- **status: in-progress** — actively being worked on
- **status: blocked** — blocked on another decision or dependency

## Milestones

Use milestone buckets to group work:

- **Foundation & Governance**
- **Compatibility & Measurement**
- **Accessibility & Contributor Experience**

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

## Project board

The current public backlog lives in the project board:

- https://github.com/users/OneSpiral/projects/3

## Boundary reminder

The public backlog should stay focused on reusable technical capabilities, not branded growth or monetization work.
