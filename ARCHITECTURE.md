# Architecture

## Purpose

Browser Hardware Diagnostics is a browser-first toolkit for testing hardware capabilities without native installs.

## Layers

### 1. Diagnostics primitives

Reusable logic that talks to browser APIs such as:

- Gamepad API
- Keyboard events
- Pointer / wheel events
- Screen / fullscreen APIs
- MediaDevices / Web Audio APIs

### 2. Presentation components

UI components render diagnostic state and provide interactive controls for testing.

Examples:

- button state panels
- axis visualizers
- keyboard layouts
- refresh-rate charts
- waveform / spectrum displays
- tone generator controls

### 3. Page-level tool composition

Each tool page composes primitives plus UI into a focused diagnostic workflow.

Current tool modules:

- gamepad
- keyboard
- mouse
- monitor
- microphone
- speakers

### 4. Sponsor / adopter boundary

The open-source repository stops at the shared technical toolkit.

Branded production deployments can add:

- custom branding
- localization
- SEO layers
- monetization systems
- distribution logic

Those are intentionally outside the core architecture boundary.

## Design principles

- browser-native first
- testable utility logic
- minimal dependencies
- accessible UI
- static-host friendly
- clear separation between toolkit and branded deployment
