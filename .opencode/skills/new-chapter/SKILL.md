---
name: new-chapter
description: Creates a new chapter file and updates project state. Use when user inputs 【新建章节】 or asks to start a new chapter.
license: MIT
compatibility: opencode
metadata:
  workflow: novel-new-chapter
---

# 新建章节

当用户输入【新建章节】或要求开始新章节时，执行以下流程。

## 执行步骤

### 1. 读取当前状态

使用 Read 工具读取 `{项目}/state.md`，获取：
- 当前章节编号
- 项目目录路径

### 2. 计算新章节编号

- 新编号 = 当前最大章节编号 + 1
- 两位数补零格式：01, 02, ..., 99
- 章节文件名：`chapter_XX.md`

**如何确定当前最大编号**：
- 从 `state.md` 的"章节编号"字段获取当前编号
- 同时用 Glob 工具扫描 `chapters/chapter_*.md`，取最大编号，防止编号跳跃

### 3. 创建章节文件

使用 Write 工具创建 `{项目}/chapters/chapter_XX.md`，内容为：

```markdown
# 第X章 章节标题

```

其中 X 为新章节编号，"章节标题"留空待用户在存档时指定。

### 4. 更新 outline.md

使用 Read 工具读取 `{项目}/outline.md` 的"卷章规划"部分。

在卷章规划表格末尾追加一行：

```markdown
| chapter_XX | | | | 🔲 待写 |
```

其中 XX 为新章节编号。

使用 Edit 工具将新行插入表格。

### 5. 更新 state.md

使用 Read 工具读取 `{项目}/state.md`，然后使用 Edit 工具更新以下字段：

- `当前章节` → `chapter_XX.md`
- `章节编号` → 新编号
- `当前阶段` → `空闲`
- `待存档正文` → `否`
- `待存档内容摘要` → `无`
- `阶段暂存内容` → `无`

### 6. 完成提示

输出：

```
✅ 已创建 chapter_XX.md，可以开始新章节。

已更新：
  - chapters/chapter_XX.md  ← 新章节文件
  - outline.md 卷章规划     ← 追加 chapter_XX 待写行
  - state.md               ← 当前章节已切换

下一步：输入【构思】开始构思新章节内容
```
