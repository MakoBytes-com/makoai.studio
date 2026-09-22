---
name: kimi-ebusy-makobot-watcher-fix
description: "Kimi \"EBUSY wire.jsonl\" was MakoBot's watcher holding a write-blocking read; fixed Build 318 — diagnostic pattern for any agent's file-write errors while MakoBot runs"
metadata: 
  node_type: memory
  type: project
  originSessionId: cfc65cdb-1b0d-488a-a5b3-618c72ca7bd1
  modified: 2026-07-26T23:33:42.836Z
---

**Incident (2026-07-26, RESOLVED):** Kimi Code kept erroring `Failed to write agent records: EBUSY: resource busy or locked ... .kimi-code\...\wire.jsonl`. Root cause was MakoBot, not Kimi: KimiSessionWatcher (Build 316/317) read the live `wire.jsonl` with a default `StreamReader(path)` — on Windows that open demands `FileShare.Read`, forbidding every other process from opening the file for WRITE for the duration of the read. Kimi appends per-event (open-write-close), MakoBot re-read on every change (5s debounce) + every 60s → constant collisions.

**Fix (MakoBot Build 318, commit `39bbbb1`, tag v2.0.0-build-318, installed + running):** `AtomicFile.OpenSharedRead` opens with `FileShare.ReadWrite | FileShare.Delete` (Delete so a writer's atomic rename-replace of `state.json` can't collide either). Whole class swapped — 8 sites: Kimi wire+state, TranscriptParser's read of Claude Code's live transcript `.jsonl` (identical latent bug), 5 ClaudeMemoryWatcher reads of Claude-written memory files.

**Why (diagnostic pattern):** if ANY coding agent (Kimi, Claude Code, future tools) reports EBUSY/locked-file errors writing its own session/transcript/memory files while MakoBot is running, suspect a MakoBot watcher first — check the reader opens with shared flags before blaming antivirus/OneDrive/indexers. Quick triage: exit MakoBot; if the error stops, it's a watcher lock.

**How to apply:** any C#/.NET code that reads a file a live external process writes must use `AtomicFile.OpenSharedRead` / `ReadAllTextShared` / `ReadAllLinesShared` (MakoBot) or an explicit `FileStream(..., FileShare.ReadWrite | FileShare.Delete)` — never a bare `StreamReader(path)` / `File.ReadAllText`. Torn tail lines from mid-append reads are handled by per-line try/catch + re-render on next change.
