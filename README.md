# 🔧 HWProbe

[![Live Site](https://img.shields.io/badge/live-hwprobe.com-6366f1)](https://hwprobe.com)
[![Sponsor](https://img.shields.io/badge/sponsor-OneSpiral-111827)](https://github.com/OneSpiral)
[![License: MIT](https://img.shields.io/badge/license-MIT-22c55e)](./LICENSE)

**Open-source technical solution for browser-based hardware diagnostics.**

👉 **[hwprobe.com](https://hwprobe.com)**

Test your gamepad, keyboard, mouse, monitor, microphone & speakers — directly in the browser. No downloads. No data collection. 100% client-side.

> Sponsored by **[OneSpiral](https://github.com/OneSpiral)**.
>
> This repository contains the open-source technical implementation. Production distribution, localization, content, and commercial layers are maintained separately.
>
> See [SPONSORING.md](./SPONSORING.md) for sponsorship positioning and repository boundaries.

## ❤️ Support the sponsor

If this technical solution is useful, support the sponsor behind it:

- **Sponsor profile:** [OneSpiral](https://github.com/OneSpiral)
- **GitHub Sponsors URL:** https://github.com/sponsors/OneSpiral

If GitHub Sponsors is not yet enabled on the account, the repository still keeps the sponsor link and funding metadata ready.

## ✨ Features

| Tool | Description |
|---|---|
| 🎮 **Gamepad Tester** | Joystick deadzone, button mapping, trigger pressure, drift detection |
| ⌨️ **Keyboard Tester** | Visual key layout, press counter, test progress, ghosting detection |
| 🖱️ **Mouse Tester** | Click speed (CPS), button detection, scroll distance, movement tracking |
| 🖥️ **Monitor Tester** | Refresh rate (FPS), dead pixel test, color gradient, display info |
| 🎤 **Microphone Tester** | Real-time waveform, volume meter, frequency spectrum, recording |
| 🔊 **Speaker Tester** | L/R channel test, tone generator, frequency presets, waveform types |

## 🚀 Quick Start

```bash
git clone https://github.com/OneSpiral/hwprobe.git
cd hwprobe
pnpm install
pnpm dev
```

## 🏗️ Tech Stack

- **Framework**: SvelteKit 2 + Svelte 5 (runes)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide
- **Build**: Vite 7
- **Testing**: Vitest
- **Deploy**: Cloudflare Pages

## 📦 Deploy

```bash
pnpm build
npx wrangler pages deploy build --project-name=hwprobe
```

## 🤝 Contributing

PRs welcome! TDD workflow: write a failing test → make it pass → refactor.

## 📄 License

MIT
