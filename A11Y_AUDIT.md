# Accessibility Audit

This audit reviews **keyboard navigation** and **focus visibility** across the public Browser Hardware Diagnostics toolkit.

## Scope reviewed

The audit covered:

- top navigation
- homepage tool cards
- reset and action buttons across diagnostic pages
- the `Keyboard Tester` interaction model
- native disclosure UI such as the gamepad raw-data `<details>` / `<summary>` block

## Findings

### 1. Focus visibility depended too heavily on browser defaults

The toolkit uses a dark visual style, but interactive elements such as links, buttons, `summary`, and range inputs did not have a shared focus treatment. That made focus visibility inconsistent across pages and browsers.

### 2. The top navigation needed stronger semantics

The primary navigation did not expose `aria-current` for the active route, and the mobile menu button did not explicitly identify the controlled menu region.

### 3. The `Keyboard Tester` could interfere with keyboard navigation

The page captured keyboard events at the window level and prevented default browser behavior for every key. That approach risks blocking normal navigation keys such as Tab and can interfere with browser shortcuts.

### 4. The toolkit did not provide a skip link

Without a skip link, keyboard users must move through the sticky top navigation on every page before reaching the main content.

### 5. Some selectable button groups needed state semantics

Speaker waveform and frequency preset controls behave like toggle/select buttons, but they did not expose pressed state through `aria-pressed`.

## Reusable fixes implemented

### Skip link and main landmark target

- added a visible-on-focus **skip link**
- added a focusable `main` target with `id="main-content"`

### Shared focus-visible treatment

Added global focus styles for:

- links
- buttons
- `summary`
- `input`
- other focusable elements with `tabindex`

This gives the toolkit a reusable focus visibility baseline instead of relying on browser defaults alone.

### Navigation semantics

Updated the navigation to:

- mark the current route with `aria-current="page"`
- label the nav as primary navigation
- connect the mobile toggle button to the controlled region with `aria-controls`

### Keyboard Tester behavior

Updated the `Keyboard Tester` so that:

- Tab remains available for keyboard navigation
- Escape remains available
- browser shortcuts are not blocked
- focused interactive controls are not treated as key-capture targets

### Toggle button state

Updated speaker preset and waveform controls to expose `aria-pressed` state for assistive technologies.

## Notes

- The public repo currently has no FAQ accordion, so there was no separate FAQ keyboard audit item to review here.
- The gamepad raw-data disclosure uses native `details` / `summary`, which benefits directly from the new focus visibility treatment.

## Follow-up guidance

For future UI work:

- preserve keyboard navigation before adding custom event capture
- prefer native controls and landmarks where possible
- add explicit state semantics when buttons behave like toggles or selections
- keep shared focus visibility rules in the global layer so new tools inherit them automatically
