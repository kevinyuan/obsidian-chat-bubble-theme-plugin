# MS Copilot Theme Plugin

A warm, earthy Obsidian theme with cream backgrounds, brown typography, rounded tables, and chat bubble callouts — bundled as a plugin.

## Why a plugin instead of a pure theme?

Obsidian themes are CSS-only and cannot execute JavaScript. This plugin adds one feature that requires JS:

- **Chat callout outline injection** — parses `> [!chat-r]` and `> [!chat-l]` callouts and injects them as virtual headings into Obsidian's metadata cache, so they appear in the Outline pane (including Quiet Outline).

All theme styling is delivered via `styles.css`, and the outline logic lives in `main.js`.

## Preview

> Click the image to view full size.

<a href="screenshots/preview.png"><img src="screenshots/preview.png" alt="Theme Preview" width="520"></a>

## Features

- Warm cream background with dark brown text
- Rounded tables with warm-toned headers
- Dark code blocks with language label and always-visible copy button
- Chat bubble callouts (`chat-r` for right-aligned, `chat-l` for left-aligned)
- Styled inline code, blockquotes, links, and lists
- Chat callouts visible in Outline / Quiet Outline as h1 entries

## Installation

1. Copy the `ms-copilot-theme-plugin` folder into `.obsidian/plugins/`
2. Enable the plugin in **Settings > Community plugins**
3. Set **Settings > Appearance > CSS Theme** to none (the plugin provides all styling)

## Chat Bubble Callouts

Use `[!chat-r]` and `[!chat-l]` for right- and left-aligned chat bubbles:

```markdown
> [!chat-r]
> This appears as a right-aligned bubble.

> [!chat-l]
> This appears as a left-aligned bubble.
```

## Color Palette

| Element     | Color                         |
|-------------|-------------------------------|
| Background  | `rgb(248, 244, 242)` cream    |
| Body text   | `rgb(38, 35, 32)` dark brown  |
| Headings    | `rgb(49, 45, 42)` brown       |
| Links       | `#A0522D` saddle brown        |
| Inline code | `#8B4513` on `#F0E8DC`        |
| Borders     | `rgb(217, 199, 184)` warm tan |
| Code blocks | `rgb(29, 26, 23)` dark        |
| Chat bubble | `rgb(249, 227, 208)` peach    |

## License

MIT
