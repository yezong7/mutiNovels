# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

mutiNovels is a file-driven multi-project novel creation system. It uses `.md` files to manage settings, outlines, progress, and content with a four-phase writing workflow and strict consistency validation.

**Rule Files**: `.trae/rules/novelworkflow.md` defines the complete workflow (auto-injected). `.trae/rules/templates.md` defines file structure templates (auto-injected). `.trae/rulelog.md` contains violation cases (read on demand, not auto-injected).

## Architecture

```
.trae/rules/
├── novelworkflow.md    ← Global workflow rules (auto-injected)
├── templates.md        ← File structure templates (auto-injected)
└── rulelog.md          ← Rule log + violations (read on demand, NOT auto-injected)

authors/
├── cold_hard_school.md ← Shared style template (samples/checklist/anchors)
└── [custom].md         ← Create new: 【切换风格】 new

{项目名}/
├── bible.md            ← World/characters/locations/items (8 fixed categories)
├── outline.md          ← Proposition/structure/chapters/foreshadowing roadmap
├── state.md            ← Current progress/stage/staged content
├── rules.md            ← Project constraints + style reference (e.g., `风格参考：authors/cold_hard_school.md`)
├── changelog.md        ← Change log
└── chapters/chapter_XX.md
```

## Initialization Workflow

When user inputs `【初始化】`:
1. Read `.trae/rules/templates.md` to get file structure templates
2. Create `chapters/` directory
3. Write `bible.md` (templates.md §1), `outline.md` (templates.md §4), `state.md` (templates.md §2), `rules.md` (templates.md §5)
4. Create `chapters/chapter_01.md` empty file
5. Ask user to fill bible.md/outline.md or provide story concept; ask for author style file in rules.md §7

## Layered Loading Strategy

`【加载上下文】` loads files in three layers to avoid context overflow:

| Layer | Files | When |
|-------|-------|------|
| **必读层** | state.md, rulelog.md | Always |
| **阶段层** | Varies by current stage (see novelworkflow.md §指令1) | Based on stage |
| **章节层** | Last 500 words of current chapter | Always |

Stage-specific loading:
- 空闲: outline 卷章+伏笔
- 构思: outline全文 + bible人物/势力
- 草稿: outline卷章+偏差 + rules + bible人物/地点/道具
- 正文: bible全文 + style anchors/samples + outline卷章
- 润色: style file全文 + rules §8覆盖项

## Commands

| Command | Trigger | Action |
|---------|---------|--------|
| 初始化 | `【初始化】` | Read templates.md → create project structure (see Initialization Workflow) |
| 加载上下文 | `【加载上下文】` | Load state.md + outline chapters → display progress box |
| 存档下班 | `【存档下班】` | Write chapter → cascade updates (no double-confirm) |
| 查设定 | `【查设定】名字` | Search bible + chapters for entity appearances |
| 新建章节 | `【新建章节】` | Create chapter_XX.md |
| 修订 | `【修订】chapter_XX` | Local/consistency revision + cascade (requires user confirm) |
| 回退 | `【回退】` | Rollback 1 stage max, clear staged content |
| 切换风格 | `【切换风格】xxx.md` | Switch style reference in rules.md; `【切换风格】 new` to create |

## Four-Phase Workflow

```
构思 → 草稿 → 正文 → 润色
创意型   速度型   精准型   风格型
```

- **构思**: Conflict detection → 3-5 proposals with outline/proposition alignment
- **草稿**: Complete scene, mark deviations, `[草稿待确认]`
- **正文**: 7-point consistency check + proposition anchor, `[正文待确认]`
- **润色**: 12-point style calibration (sample comparison), `[润色完成待存档]`

## Confirmation Mechanism

**Valid triggers**: "确认" "通过" "存档" "定稿" "可以写入"

**Invalid**: "还行" "不错" "可以" "行" "嗯" "好的" "继续" (directional approval only)

**Two-step confirmation**:
1. User says valid trigger → Assistant responds "收到确认，即将[动作]。确认执行？"
2. User confirms again → Assistant executes

**Exception**: `【存档下班】` executes directly without two-step (user-initiated = confirmed)

## Critical Rules

1. **NEVER** write to chapters without user confirmation
2. **NEVER** skip reading state.md before writing
3. **NEVER** enter 构思 without reading outline.md
4. **ALWAYS** read changelog.md before work; read rulelog.md only if violations exist
5. **ALWAYS** use Edit/Write tools for `.md` files
6. **ALWAYS** perform conflict detection in 构思
7. **ALWAYS** perform 7-point consistency check in 正文
8. **ALWAYS** perform 12-point style calibration in 润色
9. **ALWAYS** confirm before cascade updates in 修订
10. Append violation cases to rulelog.md when user points out errors

## Rollback Rules

- Max 1 stage rollback: 润色→正文/草稿, 正文→草稿/构思
- Clears staged content for target + subsequent stages

## Consistency Check (正文)

- [ ] New characters in bible.md
- [ ] Character status matches bible
- [ ] Locations consistent with bible
- [ ] Items match bible descriptions
- [ ] Timeline no conflicts
- [ ] Terms match bible definitions
- [ ] No contradictions with existing chapters

## Style System

- `rules.md §7` references style file: `风格参考：authors/xxx.md`
- Style files contain: anchors, samples (A-H), 20-point checklist
- Project can override specific parameters in `rules.md §8`

**Loading priority**: Author style file (base) → rules.md §8 overrides (layered) → Final style

**润色 stage**: Execute style checklist with sample comparison mode:
- Select 4 paragraphs from polished text matching samples A-D
- Compare side-by-side with corresponding style samples
- Mark each checklist item ✅/❌ with location and suggestions