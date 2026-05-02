# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

mutiNovels is a file-driven multi-project novel creation system. It uses `.md` files to manage settings, outlines, progress, and content with a four-phase writing workflow and strict consistency validation.

**Rule Files**: `.trae/rules/novelworkflow.md` defines the complete workflow (auto-injected). `.trae/rules/templates.md` defines file structure templates (auto-injected). `.trae/rulelog.md` contains violation cases (read on demand, not auto-injected). `.trae/rulelog_history.md` contains rule change history (read on demand).

## Architecture

```
.trae/
├── rules/
│   ├── novelworkflow.md    ← Global workflow rules (auto-injected)
│   └── templates.md        ← File structure templates (auto-injected)
├── rulelog.md              ← Violation cases (read on demand, NOT auto-injected)
├── rulelog_history.md      ← Rule change history (read on demand)
└── skills/
│   ├── init-project/SKILL.md   ← 【初始化】 workflow
│   ├── load-context/SKILL.md   ← 【加载上下文】 layered loading
│   └── new-chapter/SKILL.md    ← 【新建章节】 creation

authors/
├── _template.md            ← Empty template for new style files
├── cold_hard_school.md     ← Shared style template (samples/checklist/anchors)
└── [custom].md             ← Create new: 【切换风格】 new

source/
└── 139.txt                 ← Reference material for style analysis

{项目名}/
├── bible.md                ← World/characters/locations/items (8 fixed categories)
├── outline.md              ← Proposition/structure/chapters/foreshadowing roadmap
├── state.md                ← Current progress/stage/staged content (cross-session recovery)
├── rules.md                ← Project constraints + style reference (§7) + overrides (§8)
├── changelog.md            ← Change log (appended after each save/revision)
└── chapters/chapter_XX.md

.claude/                    ← Claude Code project configuration
.mcp.json                   ← MCP server config (filesystem + memorymesh)
```

## Initialization Workflow

When user inputs `【初始化】`:
1. Read `.trae/rules/templates.md` to get file structure templates
2. Create `chapters/` directory
3. Write `bible.md` (templates.md §1), `outline.md` (templates.md §4), `state.md` (templates.md §2), `rules.md` (templates.md §5)
4. Create `chapters/chapter_01.md` empty file
5. Ask user to fill bible.md/outline.md or provide story concept; ask for author style file in rules.md §7

## Layered Loading Strategy

`【加载上下文】` loads files in four layers to avoid context overflow:

| Layer | Files | When |
|-------|-------|------|
| **必读层** | state.md, rulelog.md, changelog.md (last 3 entries) | Always |
| **前置章节层** | Previous chapters for plot continuity | Always (except chapter 1) |
| **阶段层** | Varies by current stage (see novelworkflow.md §指令1) | Based on stage |
| **章节层** | Current chapter (last 500 words + opening 200 words if >3000字) | Always |

**前置章节加载规则**:
- Chapter 1: No previous chapters
- Chapter 2: chapter_01 full text
- Chapters 3-5: Previous 2 chapters full + previous 3 ending summary
- Chapters 6+: Previous 3 chapters full + chapters 4-5 ending summary

**阶段层加载**:
- 空闲: outline 卷章+伏笔
- 构思: outline全文 + bible人物/势力 + 前置章节层
- 草稿: outline卷章+偏差 + rules + bible人物/地点/道具 + 前置章节层
- 正文: bible全文 + style anchors/samples + outline卷章 + 前置章节层
- 润色: style file全文 + rules §8覆盖项 + 当前章节全文

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

## Changelog Format

Each save/revision appends to `changelog.md`:

**Save format:**
```markdown
## [日期时间]
- 写入章节：chapters/chapter_XX.md
- 当前章节：[state.md 当前章节]
- 剧情进度：[大纲预设 + 实际摘要]
- 最后一句话：[state.md 最后一句]
- 下一步计划：[state.md 下一步]
- bible.md 更新：[新增/修改条目 or "无"]
- outline.md 偏差：[新增偏差 or "无"]
```

**Revision format:**
```markdown
## [日期时间]（修订）
- 修订章节：chapters/chapter_XX.md
- 修订内容：[一句话描述]
- bible.md 更新：[受影响条目 or "无"]
- outline.md 更新：[受影响条目 or "无"]
- 后续章节影响：[受影响章节 or "无"]
```

**Style switch format:**
```markdown
## [日期时间]（风格切换）
- 旧风格：authors/xxx.md
- 新风格：authors/yyy.md
- 切换原因：[用户说明]
```

## Critical Rules

1. **NEVER** write to chapters without user confirmation
2. **NEVER** skip reading state.md before writing
3. **NEVER** enter 构思 without reading outline.md
4. **ALWAYS** read changelog.md before work; read rulelog.md (必读层) if violations exist; rulelog_history.md 按需读取
5. **ALWAYS** use Edit/Write tools for `.md` files
6. **ALWAYS** perform conflict detection in 构思
7. **ALWAYS** perform 7-point consistency check in 正文
8. **ALWAYS** perform 12-point style calibration in 润色
9. **ALWAYS** confirm before cascade updates in 修订 (后续章节连锁更新必须经用户确认后才执行)
10. Append violation cases to rulelog.md when user points out errors
11. **Memory conflict resolution**: If Memory records conflict with bible.md/state.md, **trust the .md files**
12. **Style samples must be user-provided or confirmed** - assistant cannot invent style samples

## Cross-Session Recovery

`state.md` contains "阶段暂存内容" field for mid-stage content recovery across sessions:

| Stage | Staged Content |
|-------|---------------|
| 构思 | Selected proposal number + core conflict (1 sentence) |
| 草稿 | Draft summary (3-5 sentences: scene/characters/turns) |
| 正文 | Final text summary (3-5 sentences) |
| 润色 | Polish changes summary (2-3 sentences) |

On `【加载上下文】`: if staged content ≠ "无", prompt user: "上次会话停留在[阶段]阶段，有暂存内容：[摘要]。是否从暂存点继续？"

## Previous Chapter Transition Analysis

When loading context for chapter > 1, analyze previous chapter ending:

```
【上一章衔接】
- 章末钩子：[suspense/turning point from last chapter]
- 在场人物：[characters present at end and their states]
- 未解决冲突：[unresolved issues from previous chapter]
- 本章开头建议：[suggestion for natural continuation]
```

## Continuity Check

After loading previous chapters, output continuity report:

```
【剧情连续性检查】
✅/❌ 人物状态连续性：[check character states match previous chapter end]
✅/❌ 时间线连续性：[check time progresses naturally, no jumps/backwards]
✅/❌ 场景连续性：[check location transitions reasonably]
✅/❌ 伏笔状态：[check foreshadowing at correct recovery stage]
⚠️ Issues: [list specific conflicts if found]
```

## Foreshadowing Management (Single Data Source)

**Data source hierarchy:**
- `outline.md` 伏笔路线图 → **ONLY source** (complete: foreshadowing/bury chapter/recover chapter/method/status)
- `bible.md` 伏笔索引 → Quick lookup only (keyword + status + reference to outline)

**Rules:**
- Add foreshadowing: write to `outline.md` first → add index row to `bible.md`
- Recover foreshadowing: update `outline.md` status to ✅ → sync `bible.md` index
- **NEVER** add foreshadowing to `bible.md` index that doesn't exist in `outline.md`

## Progress Visualization

After `【加载上下文】`, display progress box:

```
╔════════════════════════════════════════╗
║  进度状态                              ║
╠════════════════════════════════════════╣
║  章节：chapter_XX (第X章)              ║
║  阶段：[当前阶段]                      ║
║  字数：[累计字数]                      ║
║  大纲：[当前幕名] → [下一幕名]         ║
║  待回收伏笔：[数量]条                  ║
║  前置章节已加载：[章节列表]            ║
╚════════════════════════════════════════╝
```

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

## MCP Servers

`.mcp.json` configures MCP servers for extended capabilities:
- **filesystem**: File system access to `/mnt/g/tmpRepo/mutiNovels`
- **memorymesh**: Memory mesh for persistent context across sessions

These servers are automatically loaded when Claude Code starts in this project.