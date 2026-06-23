# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**This is NOT a code project.** mutiNovels is a file-driven multi-project novel creation system. There is no build, no tests, no linting, no CI. The "codebase" is prose; the "entrypoints" are `.md` files.

The system manages novel writing through structured markdown files with a four-phase workflow (构思→草稿→正文→润色), strict consistency checks, and style calibration.

## Architecture

```
.trae/rules/         ← Workflow + templates (auto-injected via settings.local.json)
.trae/skills/        ← Skills: init-project, load-context, new-chapter, 润色章节
authors/             ← Shared style files (cold_hard_school.md, luan.md, etc.)
{项目名}/
├── bible.md         ← World/characters/locations/items (8 fixed categories, never add/remove)
├── outline.md       ← Proposition/structure/chapters/foreshadowing roadmap (single source of truth)
├── state.md         ← Current progress/stage/staged content (cross-session recovery)
├── rules.md         ← Project constraints + style ref (§7) + overrides (§8)
├── changelog.md     ← Change log (appended after each save/revision)
└── chapters/chapter_XX.md
```

## Commands

| Trigger | Action |
|---------|--------|
| `【初始化】` | Create project from templates |
| `【加载上下文】` | Layered context load → continuity check → progress box |
| `【存档下班】` | Write chapter → cascade updates (NO double-confirm needed) |
| `【查设定】名字` | Search bible + chapters for entity |
| `【新建章节】` | Create chapter_XX.md, update state |
| `【修订】chapter_XX` | Revision + cascade (requires user confirm) |
| `【回退】` | Rollback 1 stage max |
| `【切换风格】xxx.md` | Switch style in rules.md §7 |

## Four-Phase Workflow

```
构思 → 草稿 → 正文 → 润色
```

All output goes to conversation only during phases. **Only `【存档下班】` writes to chapter files.**

| Phase | Core Responsibility | Output Marker |
|-------|-------------------|---------------|
| 构思 | Conflict detection → 3-5 proposals with outline/proposition alignment | None |
| 草稿 | Write complete scene based on selected proposal, mark deviations | `[草稿待确认]` |
| 正文 | 7-point consistency check + style/proposition alignment | `[正文待确认]` |
| 润色 | Style calibration (sample comparison A-D, 12-point checklist) | `[润色完成待存档]` |

## Confirmation Mechanism

**Valid triggers** (execute): `确认` `通过` `存档` `定稿` `可以写入`
**NOT valid** (directional only): `还行` `不错` `可以` `行` `嗯` `好的` `继续`

Two-step confirmation: user says trigger → agent echoes back → user confirms again → agent executes.
Exception: `【存档下班】` executes directly (user-initiated is the confirmation).

## Critical Rules

1. **NEVER** write to chapters without user confirmation
2. **NEVER** skip reading state.md before writing
3. **NEVER** enter 构思 without reading outline.md
4. **ALWAYS** read changelog.md before work
5. **ALWAYS** use Edit/Write tools for `.md` files
6. **ALWAYS** perform conflict detection in 构思
7. **ALWAYS** perform 7-point consistency check in 正文
8. **ALWAYS** perform style calibration in 润色
9. **ALWAYS** confirm before cascade updates in 修订
10. Append violations to rulelog.md when user points out errors
11. Memory vs .md files: **trust the .md files**
12. Style samples must be user-provided or confirmed
13. **ALWAYS** verify word count before archiving (rules.md §5 minimum)

## Layered Loading (`【加载上下文】`)

| Layer | Files | When |
|-------|-------|------|
| 必读层 | state.md, changelog.md (last 3) | Always |
| 前置章节层 | Previous chapters (ch1:none, ch2:ch01, ch3-5:prev2+summary, ch6+:prev3+summary) | Always |
| 阶段层 | Varies by stage (outline/bible/rules/style) | Per stage |
| 章节层 | Current chapter last 500 + first 200 words | Always |

After loading, output:
- **上一章衔接**: 章末钩子/在场人物/未解决冲突/开头建议
- **剧情连续性检查**: ✅/❌ 人物状态/时间线/场景/伏笔
- **进度可视化**: 章节/阶段/字数/大纲/待回收伏笔/已加载章节

## Cross-Session Recovery

state.md "阶段暂存内容" field: 构思→proposal#, 草稿→3-5 sentence summary, 正文→3-5 sentences, 润色→2-3 sentences. On 【加载上下文】: if ≠"无", prompt user to continue from staged point.

## Foreshadowing (Single Source of Truth)

- `outline.md` 伏笔路线图 = **ONLY source** (full detail + status)
- `bible.md` 伏笔索引 = quick lookup only (keyword + status + ref to outline)
- Add foreshadowing: outline first → bible index
- **NEVER** add foreshadowing to bible that doesn't exist in outline

## Style System

- `rules.md §7` → author style file path (anchors, samples, checklist)
- `rules.md §8` → project-level overrides (priority over author file)
- Characters leaving → "已退场人物" in bible.md, never deleted
- 润色 is style-aware: loads author file first, filters readability fixes through style constraints

## MCP Servers

`.mcp.json` configures:
- **filesystem**: `/mnt/g/tmpRepo/mutiNovels` (Windows G: drive)
- **filesystem-local**: `/home/elio/Documents/novel/mutiNovels` (local Linux)
- **memorymesh**: Knowledge graph for novel entities

## Skills

| Skill | Trigger | Purpose |
|-------|---------|---------|
| init-project | `【初始化】` | Create project from templates |
| load-context | `【加载上下文】` | Layered loading + continuity checks |
| new-chapter | `【新建章节】` | Create next chapter, update state |
| 润色章节 | `润色第X章` | Polish for human-readable prose |

## Current Project State

`project1/` is the active project (《星魂传说：星尘归途》), with 80 chapters completed (~419,000 words). The first arc is finished. See `project1/state.md` for current progress.
