# Browser Compatibility Matrix

This document summarizes the likely browser support expectations for the public **Browser Hardware Diagnostics** toolkit.

The toolkit is built on standard browser APIs, but individual diagnostics depend on API support, permission behavior, fullscreen policies, and event timing differences.

## Support legend

- **Good** — expected to work well in current browser versions
- **Partial** — core behavior works, but some features or measurements may vary
- **Limited** — browser support is weak, inconsistent, or missing for important parts

## Diagnostic module matrix

| Module | Primary APIs | Chrome | Edge | Safari | Firefox | Notes |
|---|---|---|---|---|---|---|
| Gamepad | Gamepad API | Good | Good | Partial | Partial | **Gamepad API** support is strongest in Chromium browsers. Safari and Firefox may detect fewer controller features or behave less consistently across devices. |
| Keyboard | Keyboard Events | Good | Good | Good | Good | Keyboard testing is broadly reliable because it depends on standard keyboard events rather than special hardware APIs. |
| Mouse | Pointer / Mouse / Wheel Events | Good | Good | Good | Good | Core click, movement, and scroll testing is widely supported. Precision can still vary with OS acceleration and browser event timing. |
| Monitor | requestAnimationFrame, Screen API, Fullscreen API | Good | Good | Partial | Partial | Refresh-rate and fullscreen patterns work broadly, but measurement accuracy depends on browser timing behavior, display configuration, and fullscreen policy differences. |
| Microphone | MediaDevices, getUserMedia, Web Audio API | Good | Good | Partial | Good | **MediaDevices** and audio capture are broadly available, but Safari often differs in permission UX, audio pipeline details, and autoplay-related behavior. |
| Speakers | Web Audio API | Good | Good | Partial | Good | Tone playback usually works well, but Safari may apply stricter autoplay or user-gesture requirements before audio can start. |

## API-specific notes

### Gamepad API

- Best support is typically in Chromium-based browsers
- Device mappings can vary by OS and browser
- Haptics / vibration support is less consistent than button and axis support

### Keyboard events

- Physical key layouts and IME behavior can vary by locale
- Browser shortcuts and OS shortcuts may prevent some keys from being captured

### Pointer / wheel events

- Reported movement and wheel deltas may vary by device, browser, and OS settings
- High-frequency measurements such as polling estimates should be treated as approximations

### requestAnimationFrame / display timing

- Refresh-rate diagnostics are affected by frame scheduling, throttling, power settings, and display routing
- Browser timing APIs do not replace dedicated hardware measurement tools

### MediaDevices / Web Audio API

- Permission prompts differ across browsers
- Secure contexts (`https`) are required for real capture behavior
- Audio start behavior may depend on explicit user interaction

## Practical guidance for contributors

- test at least one Chromium browser and one non-Chromium browser when changing diagnostics behavior
- document browser-specific caveats instead of hiding them
- prefer capability detection over browser sniffing
- keep measurement claims conservative when browser timing is only approximate
