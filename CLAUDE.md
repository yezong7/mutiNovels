# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

mutiNovels is a file-driven multi-project novel creation system. `.md` files manage settings, outlines, progress, and content with a four-phase writing workflow.

**Rule Files**: `.trae/rules/novelworkflow.md` (workflow, auto-injected), `.trae/rules/templates.md` (file structure, auto-injected).

## Architecture

```
.trae/rules/         ← Workflow + templates (auto-injected)
.trae/skills/        ← init-project, load-context, new-chapter, 润色章节
authors/             ← Shared style files (cold_hard_school.md, luan.md, etc.)
{项目名}/
├── bible.md         ← World/characters/locations/items (8 fixed categories)
├── outline.md       ← Proposition/structure/chapters/foreshadowing roadmap
├── state.md         ← Current progress/stage/staged content
├── rules.md         ← Project constraints + style ref (§7) + overrides (§8)
├── changelog.md     ← Change log (appended after each save/revision)
└── chapters/chapter_XX.md
```

## Commands

| Command | Trigger | Action |
|---------|---------|--------|
| 初始化 | `【初始化】` | Create project from templates |
| 加载上下文 | `【加载上下文】` | Layered context load → progress box |
| 存档下班 | `【存档下班】` | Write chapter → cascade updates (no double-confirm) |
| 查设定 | `【查设定】名字` | Search bible + chapters for entity |
| 新建章节 | `【新建章节】` | Create chapter_XX.md |
| 修订 | `【修订】chapter_XX` | Revision + cascade (requires user confirm) |
| 回退 | `【回退】` | Rollback 1 stage max |
| 切换风格 | `【切换风格】xxx.md` | Switch style in rules.md §7 |

## Four-Phase Workflow

```
构思 → 草稿 → 正文 → 润色
```

Details in novelworkflow.md §二. All output in conversation only, not written to files until user confirms.

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

## Layered Loading

| Layer | Files | When |
|-------|-------|------|
| 必读层 | state.md, changelog.md (last 3) | Always |
| 前置章节层 | Previous chapters (ch1:none, ch2:ch01, ch3-5:prev2+summary, ch6+:prev3+summary) | Always |
| 阶段层 | Varies by stage (outline/bible/rules/style) | Per stage |
| 章节层 | Current chapter last 500 + first 200 words | Always |

## Cross-Session Recovery

state.md "阶段暂存内容" field: 构思→proposal#, 草稿→3-5 sentence summary, 正文→3-5 sentences, 润色→2-3 sentences. On 【加载上下文】: if ≠"无", prompt user to continue from staged point.

## Continuity Check

After loading previous chapters, output:
```
【上一章衔接】章末钩子/在场人物/未解决冲突/开头建议
【剧情连续性检查】✅/❌ 人物状态/时间线/场景/伏笔
```

## Foreshadowing

`outline.md` 伏笔路线图 = **ONLY source**. `bible.md` 伏笔索引 = quick lookup only. Add: outline first → bible index. Never add bible index without outline entry.

## Progress Visualization

After 【加载上下文】: display progress box (章节/阶段/字数/大纲/待回收伏笔/已加载章节).

## Style System

- `rules.md §7` → author style file (anchors, samples, checklist)
- `rules.md §8` → project-level overrides (priority over author file)
- Characters leaving → "已退场人物" in bible.md, never deleted
- 润色 is style-aware: loads author file first, filters readability fixes through style constraints

## MCP Servers

`.mcp.json`: filesystem (`/mnt/g/tmpRepo/mutiNovels`) + memorymesh. Auto-loaded.

## Skills

| Skill | Trigger | Purpose |
|-------|---------|---------|
| init-project | `【初始化】` | Create project from templates |
| load-context | `【加载上下文】` | Layered loading + continuity checks |
| new-chapter | `【新建章节】` | Create next chapter, update state |
| 润色章节 | `润色第X章` | Polish for human-readable prose |
