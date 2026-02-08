"use strict";

const obsidian = require("obsidian");

class ChatCalloutOutlinePlugin extends obsidian.Plugin {
  async onload() {
    // Per-file cache of parsed callout headings: Map<filePath, HeadingCache[]>
    this._calloutCache = new Map();
    // Guard flag to prevent recursion when we trigger 'changed'
    this._updating = false;

    // Monkey-patch metadataCache.getFileCache
    this._originalGetFileCache = this.app.metadataCache.getFileCache.bind(
      this.app.metadataCache
    );
    this.app.metadataCache.getFileCache = (file) => {
      return this._patchedGetFileCache(file);
    };

    // Listen for metadata changes (fires when file content changes)
    this.registerEvent(
      this.app.metadataCache.on("changed", (file) => {
        if (this._updating) return;
        this._updateCallouts(file);
      })
    );

    // Listen for active file changes
    this.registerEvent(
      this.app.workspace.on("active-leaf-change", () => {
        const file = this.app.workspace.getActiveFile();
        if (file) {
          this._updateCallouts(file);
        }
      })
    );

    // Initial parse of the currently active file
    const activeFile = this.app.workspace.getActiveFile();
    if (activeFile) {
      this._updateCallouts(activeFile);
    }
  }

  onunload() {
    // Restore original getFileCache
    if (this._originalGetFileCache) {
      this.app.metadataCache.getFileCache = this._originalGetFileCache;
    }
    this._calloutCache.clear();
  }

  _patchedGetFileCache(file) {
    const cache = this._originalGetFileCache(file);
    if (!cache || !file) return cache;

    const calloutHeadings = this._calloutCache.get(file.path);
    if (!calloutHeadings || calloutHeadings.length === 0) return cache;

    // Merge callout headings into the real headings array
    const realHeadings = cache.headings || [];
    const merged = [...realHeadings, ...calloutHeadings];

    // Sort by line position so outline order is correct
    merged.sort((a, b) => a.position.start.line - b.position.start.line);

    // Return a shallow copy of cache with merged headings
    return { ...cache, headings: merged };
  }

  async _updateCallouts(file) {
    if (!file || file.extension !== "md") return;

    try {
      const content = await this.app.vault.cachedRead(file);
      const calloutHeadings = this._parseCallouts(content);
      this._calloutCache.set(file.path, calloutHeadings);

      // Trigger a metadata 'changed' event so Quiet Outline refreshes
      this._updating = true;
      this.app.metadataCache.trigger("changed", file);
      this._updating = false;
    } catch (e) {
      this._updating = false;
    }
  }

  _parseCallouts(content) {
    const lines = content.split("\n");
    const headings = [];
    let offset = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check for > [!chat-r] or > [!chat-l] (with optional trailing whitespace)
      if (/^> \[!chat-[rl]\]\s*$/.test(line)) {
        // Collect text from subsequent > lines
        const textParts = [];
        let endLine = i;
        let endCol = line.length;

        for (let j = i + 1; j < lines.length; j++) {
          const nextLine = lines[j];
          // Continuation lines start with > followed by space and text
          if (/^> .+/.test(nextLine)) {
            // Strip the "> " prefix
            textParts.push(nextLine.slice(2));
            endLine = j;
            endCol = nextLine.length;
          } else {
            break;
          }
        }

        // Calculate end offset: start offset + sum of all lines in this callout block
        let endOffset = offset;
        for (let k = i; k <= endLine; k++) {
          endOffset += lines[k].length + 1; // +1 for newline
        }
        endOffset -= 1; // point to last char, not past it

        if (textParts.length > 0) {
          const headingText = textParts.join(" ").trim();
          // Truncate long questions for readability in the outline
          const displayText =
            headingText.length > 80
              ? headingText.slice(0, 77) + "..."
              : headingText;

          headings.push({
            heading: displayText,
            level: 1,
            position: {
              start: { line: i, col: 0, offset: offset },
              end: {
                line: endLine,
                col: endCol,
                offset: endOffset,
              },
            },
          });
        }
      }

      offset += line.length + 1; // +1 for newline
    }

    return headings;
  }
}

module.exports = ChatCalloutOutlinePlugin;
