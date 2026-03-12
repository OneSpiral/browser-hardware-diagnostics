# Measurement Limits

This document explains the practical limits of browser-based measurement in the public **Browser Hardware Diagnostics** toolkit.

Browser diagnostics are useful for visibility, rough comparison, and regression checks, but some results are inherently **approximate** because they depend on browser scheduling, display pipelines, input event delivery, and OS behavior.

## Core principle

Use browser-based diagnostics to:

- detect whether a capability is present
- compare relative behavior under similar conditions
- surface obvious anomalies for further investigation

Do not present browser-based diagnostics as lab-grade instrumentation. They are **not a replacement for dedicated hardware tools**.

## Refresh-rate and frame-timing limits

Monitor and timing diagnostics often rely on `requestAnimationFrame`, which is synchronized to browser rendering rather than direct access to panel hardware.

Important caveats:

- `requestAnimationFrame` reflects the browser's rendering cadence, not a direct hardware probe
- results depend on compositor timing, vsync behavior, fullscreen mode, and display routing
- browsers may throttle callbacks in background tabs, low-power states, or constrained environments
- multi-monitor setups can affect which display timing the page effectively follows
- dropped frames and scheduling jitter can make short samples look unstable
- the JavaScript **event loop** can add noise when the main thread is busy

Practical guidance:

- treat measured refresh-rate values as estimates unless you control the full test setup
- prefer longer sample windows over very short bursts
- document browser-specific throttling or fullscreen caveats when found

## Mouse polling estimation limits

Mouse polling estimates are based on incoming pointer or mouse events, not direct USB or firmware telemetry.

Important caveats:

- browsers may coalesce events or deliver them at timing boundaries that hide true device behavior
- OS pointer acceleration and smoothing can affect observed movement patterns
- browser scheduling and the JavaScript **event loop** can distort interval measurements
- sample size matters: short runs can overstate or understate the apparent polling rate
- trackpads and high-level pointing devices may not behave like dedicated mice

Practical guidance:

- describe polling numbers as estimates, not exact hardware sampling rates
- compare runs taken under similar conditions instead of mixing browsers or devices casually
- avoid making precision claims that exceed what the event stream can support

## Drag and hold interaction limits

Mouse drag and hold diagnostics are also based on browser-delivered pointer and mouse events rather than raw device telemetry.

Important caveats:

- drag distance reflects the event stream seen by the page, not the exact hardware path
- hold timing depends on event delivery and page focus rather than a dedicated timer in the device
- losing browser focus, opening a context menu, or leaving the browser window can interrupt the sequence
- browsers and operating systems may differ in pointer capture, coalescing, or delivery behavior

## Browser and environment factors

Measurement quality can vary with:

- browser engine differences
- OS power settings
- external monitor chains and adapters
- tab visibility and focus state
- background CPU load
- input device firmware or driver behavior

These variables are part of the measurement context and should be mentioned when documenting results or diagnosing reports.

## Contributor guidance

When changing measurement-related logic or docs:

- describe whether the result is direct, inferred, or estimated
- mention known browser or event delivery limitations
- keep claims conservative when the signal is only approximate
- prefer wording that helps users interpret results rather than over-trusting a single number
- point contributors to [COMPATIBILITY.md](./COMPATIBILITY.md) for browser support context
