# Permission Handling Checklist

Use this checklist when reviewing diagnostics flows that depend on browser permissions, especially anything involving the **microphone** or related media capture APIs.

## Checklist

### 1. Permission prompt behavior

- confirm the browser permission prompt appears only when needed
- avoid requesting permissions before the user intentionally starts a diagnostic flow
- make it obvious which action triggers the permission prompt

### 2. Denied state handling

- verify the UI handles a **denied** permission cleanly
- show a useful error or recovery message instead of failing silently
- explain how the user can retry after changing browser settings

### 3. Secure context requirements

- confirm media capture paths run in a **secure context** (`https` or localhost during development)
- document any browser behavior that changes outside secure contexts

### 4. User gesture requirements

- verify the flow works with required **user gesture** constraints
- do not assume autoplay-like behavior for audio or capture flows without direct interaction

### 5. Minimal scope

- request only the permission needed for the current diagnostic
- avoid bundling unrelated permission requests together

### 6. Device selection and fallback

- confirm the UI behaves safely when no device is available
- handle missing, disconnected, or changed devices without crashing
- document any browser-specific device selection caveats

### 7. Privacy-safe behavior

- do not imply capture starts before permission is actually granted
- make it clear when media is processed locally in the browser
- avoid collecting or transmitting captured data in the public toolkit by default

### 8. Failure and retry flow

- test first-run success
- test denied permission
- test revoked permission after a previous grant
- test retry after the user changes browser settings

## Where this matters most

This checklist is especially relevant for:

- microphone diagnostics
- any future webcam diagnostics
- other browser hardware flows that depend on permission-gated APIs

## Sensitive findings

If a permission-related issue looks security-sensitive, do **not** open a public issue first.

Follow the private reporting path described in [SECURITY.md](./SECURITY.md).
