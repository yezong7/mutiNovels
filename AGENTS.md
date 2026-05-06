# AGENTS.md

## This is NOT a code project

There is no build, no tests, no linting, no CI. This is a file-driven **novel creation system**.
The "entrypoints" are `.md` files; the "codebase" is prose.

## Configuration

`opencode.json` at project root auto-injects these rule files as context:
- `.trae/rules/novelworkflow.md` — complete four-phase workflow spec
- `.trae/rules/templates.md` — mandatory file structure templates for bible/outline/state/rules

Other rule files (read on demand):
- `.trae/rulelog.md` — violation cases to avoid repeating (read on `【加载上下文】`)
- `.trae/rulelog_history.md` — rule change history (read on demand only)

## Skills (load on demand via the `skill` tool)

Three skills in `.opencode/skills/`:
- **init-project** — `【初始化】` creates new project from templates
- **load-context** — `【加载上下文】` layered context loading with continuity checks
- **new-chapter** — `【新建章节】` creates next chapter file, updates state and outline

Skills can also be loaded via Claude-compatible `.claude/skills/` (disabled by default in opencode.json).

## Project structure

Each subdirectory under root is an independent novel project (e.g., `project1/`, `TEST1/`):

```
{project}/
├── bible.md      — world/characters/locations/items (8 fixed categories, never add/remove)
├── outline.md    — proposition, structure, chapter plan, foreshadowing roadmap (single data source)
├── state.md      — current stage, chapter, word count, staged content (cross-session recovery)
├── rules.md      — project constraints + style reference (§7: path to authors/xxx.md) + overrides (§8)
├── changelog.md  — appended after every save/revision
└── chapters/chapter_XX.md
```

`authors/` — shared style files (cold_hard_school.md, luan.md) with anchors, samples, and 20-point checklists.

## Commands (Chinese trigger words)

| Trigger | Action |
|---------|--------|
| `【初始化】` | Create new project from templates |
| `【加载上下文】` | Layered context load (see layered loading below) |
| `【构思】` / `【草稿】` / `【正文】` / `【润色】` | Enter a writing phase |
| `【存档下班】` | Write chapter to file → cascade update bible/outline/changelog/state (NO confirmation needed) |
| `【查设定】名字` | Search bible + chapters for entity |
| `【修订】chapter_XX` | Local or consistency revision + cascade |
| `【回退】` | Rollback 1 stage max |
| `【切换风格】xxx.md` | Switch author style in rules.md §7 |
| `【新建章节】` | Create next chapter file |
| `【批量构思】X-Y章` | Batch ideation workflow |

## CRITICAL: Never write chapters without user confirmation

**Only `【存档下班】` writes to chapter files.** During 构思/草稿/正文/润色, all output goes to the conversation only. The phases mark content with annotations like `[草稿待确认]`, `[正文待确认]`, `[润色完成待存档]`.

## Confirmation mechanism

**Valid triggers** (execute): `确认` `通过` `存档` `定稿` `可以写入`
**NOT valid** (directional only): `还行` `不错` `可以` `行` `嗯` `好的` `继续`

Two-step confirmation: user says trigger → agent echoes back "收到确认，即将[...]。确认执行？" → user confirms again → agent executes. Exception: `【存档下班】` executes directly.

## Layered loading strategy (`【加载上下文】`)

1. **必读层** (always): state.md, rulelog.md, changelog.md (last 3 entries)
2. **前置章节层**: previous chapters for continuity (see table below)
3. **阶段层**: varies by stage
4. **章节层**: current chapter last 500 + first 200 words

**前置章节 loading**: Ch1=none, Ch2=ch01 full, Ch3-5=prev 2 full+prev3 summary, Ch6+=prev 3 full+prev4-5 summary

**阶段层 loading**: 构思→outline full+bible chars+factions; 草稿→outline chaps+deviations+rules+bible; 正文→bible full+style anchors/samples+outline; 润色→style file full+rules §8 overrides+current chapter full

## Foreshadowing: single data source

- `outline.md` 伏笔路线图 = **ONLY source** (full detail + status)
- `bible.md` 伏笔索引 = quick lookup index only (keyword + status + ref to outline)
- Add foreshadowing: outline first → then bible index
- NEVER add foreshadowing to bible that doesn't exist in outline

## Changelog formats are strict

Three distinct formats: save, revision, style switch. Each has specific required fields. See CLAUDE.md §Changelog Format for exact templates.

## Other hard rules

- Memory vs files: if Memory records conflict with bible.md/state.md, **trust the .md files**
- Style samples must be user-provided or confirmed — never invent them
- Characters leaving the story move to "已退场人物" in bible.md, never deleted
- outline.md deviations only append, never delete
- `【修订】` cascade updates to subsequent chapters require user confirmation before execution
- 正文 phase must run the 7-point consistency checklist
- 润色 phase must run the 12-point style calibration with sample comparison
- Before 构思, must read outline.md — never enter ideation blind
