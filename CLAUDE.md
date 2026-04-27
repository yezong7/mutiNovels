# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

mutiNovels is a file-driven multi-project novel creation system. It uses `.md` files to manage settings, outlines, progress, and content with a four-phase writing workflow and strict consistency validation.

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

## Commands

| Command | Trigger | Action |
|---------|---------|--------|
| 初始化 | `【初始化】` | Read templates.md → create project structure |
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

**Valid**: "确认" "通过" "存档" "定稿" "可以写入"

**Invalid**: "还行" "不错" "可以" "行" "嗯" "好的" "继续"

**Two-step**: User confirms → Assistant asks "收到确认，即将[动作]。确认执行？" → User confirms again → Execute

**Exception**: `【存档下班】` executes directly (user-initiated = confirmed)

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

- `rules.md` references style: `风格参考：authors/xxx.md`
- Style files contain: anchors, samples (A-D), 12-point checklist
- Project can override specific parameters in rules.md