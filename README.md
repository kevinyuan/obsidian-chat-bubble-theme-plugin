# MS Copilot Theme Plugin

A warm, earthy Obsidian theme with chat bubble callouts and outline injection — bundled as a plugin.

## Why a plugin instead of a pure theme?

Obsidian themes are CSS-only. This plugin adds **chat callout outline injection** — parsing `> [!chat-r]` and `> [!chat-l]` callouts as virtual headings in the Outline pane (including Quiet Outline).

All theme styling is now dynamically generated from settings, so colors, sizes, and features can be configured without editing CSS.

## Features

- Warm cream background with dark brown text
- Rounded tables, dark code blocks with language labels
- Chat bubble callouts (`chat-r` right-aligned, `chat-l` left-aligned)
- Chat callouts visible in Outline as configurable heading entries
- All visual settings configurable via **Settings > Community plugins > MS Copilot Theme Plugin**

## Settings

### Theme
- Enable/disable theme, markdown background color, code block radius, checkbox strikethrough

### Chat Bubbles
- User (chat-r) and response (chat-l) bubble colors, max bubble width

### Outline Injection
- Enable/disable injection, per-callout toggle, heading prefix (e.g. "Q:" / "A:"), heading level, max display length

## Chat Bubble Callouts

```markdown
> [!chat-r]
> Right-aligned user bubble.

> [!chat-l]
> Left-aligned response bubble.
```

## Installation

1. Copy `ms-copilot-theme-plugin` into `.obsidian/plugins/`
2. Enable in **Settings > Community plugins**
3. Set **Settings > Appearance > CSS Theme** to none

## License

MIT
