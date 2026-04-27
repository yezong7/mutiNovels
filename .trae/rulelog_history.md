# 规则变更记录

> 本文件位于 `.trae/rulelog_history.md`，**不自动加载**，仅在需要查阅规则演进时按需读取。
> 违规案例记录见 `.trae/rulelog.md`（加载上下文时必读）。

---

| 日期 | 变更内容 | 受影响文件 |
|------|---------|-----------|
| 2026-04-25 | v2 规则建立：多项目支持、四阶段写作流程、bible 严格结构、确认机制 | novelworkflow.md |
| 2026-04-25 | rules.md 重新定位为项目专属创作约束（非全局规则副本） | rules.md |
| 2026-04-25 | 新增 changelog.md 存档变更日志 | changelog.md |
| 2026-04-25 | 新增 rulelog.md 规则更新日志与违规案例记录 | rulelog.md |
| 2026-04-25 | 强制行为准则新增第 7、8 条：读 Memory 防重犯、违规案例必须记录 | novelworkflow.md |
| 2026-04-25 | v3 规则更新：新增 outline.md 主体大纲（核心命题/故事结构/卷章规划/人物弧线/伏笔路线图/偏差记录） | novelworkflow.md, outline.md |
| 2026-04-25 | v3 规则更新：rules.md 扩展作者风格定义（风格锚点/风格样本/风格校准清单） | rules.md |
| 2026-04-25 | 强制行为准则新增第 9、10 条：构思必须对照大纲、润色必须执行风格校准清单 | novelworkflow.md |
| 2026-04-25 | 四阶段流程升级：构思增加大纲对齐标注、草稿增加偏差标注、正文增加风格一致性检查、润色增加校准结果输出 | novelworkflow.md |
| 2026-04-25 | 存档下班指令增加第 5 步：检查并更新 outline.md 偏差记录 | novelworkflow.md |
| 2026-04-25 | changelog 格式新增"outline.md 偏差"字段 | novelworkflow.md |
| 2026-04-27 | v4 规则更新：加载上下文指令改为分层加载策略（必读层/阶段层/章节层），按阶段决定读取范围，避免上下文窗口爆炸 | novelworkflow.md |
| 2026-04-27 | v4 规则更新：state.md 新增"阶段暂存内容"字段，解决跨会话状态断裂问题 | novelworkflow.md, state.md |
| 2026-04-27 | v4 规则更新：伏笔单一数据源——outline.md 伏笔路线图为唯一数据源，bible.md"未解伏笔"改为"伏笔索引"（仅快速查找） | novelworkflow.md, bible.md, outline.md |
| 2026-04-27 | v4 规则更新：查设定指令增加伏笔关联查询，指向 outline.md | novelworkflow.md |
| 2026-04-27 | TEST1 项目同步：state.md 增加暂存字段、bible.md 伏笔索引重构、outline.md 伏笔路线图补齐已回收条目 | TEST1/state.md, TEST1/bible.md, TEST1/outline.md |
| 2026-04-27 | v5 规则更新：确认机制细化——定义确认触发词白名单（确认/通过/存档/定稿/可以写入）、非确认措辞清单、二次确认机制 | novelworkflow.md |
| 2026-04-27 | v5 规则更新：阶段跳转增加校验——跳过某阶段时仍需执行该阶段核心检查，输出"快速检查报告" | novelworkflow.md |
| 2026-04-27 | v5 规则更新：构思阶段增加"命题对齐标注"，正文阶段增加"命题对齐检查"，防止核心命题漂移 | novelworkflow.md |
| 2026-04-27 | v5 规则更新：新增【修订】指令（指令5），支持局部修订和一致性修订，含连锁更新和后续章节影响检查 | novelworkflow.md |
| 2026-04-27 | v5 规则更新：风格校准改为"样本对比标注"模式——润色时从正文选取段落与风格样本A-D并列对比，校准清单从9条扩展为12条（新增4条样本对比项） | novelworkflow.md, rules.md |
| 2026-04-27 | TEST1/rules.md 同步：风格校准清单扩展为12条，新增样本对比说明 | TEST1/rules.md |
| 2026-04-27 | P0修复：确认触发词统一（删除"就这样"）；确认机制逻辑澄清——区分"阶段确认"（需二次确认）与"存档下班"（用户主动发起，无需二次确认） | novelworkflow.md |
| 2026-04-27 | P1修复：阶段回退规则明确——回退范围限制（当前阶段或最多上一阶段）、暂存清空规则（回退后清空目标阶段及其后续阶段暂存内容） | novelworkflow.md |
| 2026-04-27 | P1修复：正文一致性检查清单——新增7条具体检查项（人物登记/状态一致/地点描述/道具使用/时间线/术语使用/已有章节矛盾） | novelworkflow.md |
| 2026-04-27 | P1修复：修订连锁更新流程——后续章节连锁更新必须经用户确认后才执行，不可自动修改 | novelworkflow.md |
| 2026-04-27 | P2新增：进度可视化输出（加载上下文时显示进度状态框） | novelworkflow.md |
| 2026-04-27 | P2新增：冲突检测机制（构思阶段输出方案前自动检测人物/地点/道具冲突） | novelworkflow.md |
| 2026-04-27 | P2重构：规则文件拆分——模板内容（270行）独立为templates.md，novelworkflow.md保留工作流核心 | novelworkflow.md, templates.md |
| 2026-04-27 | P0修复：初始化指令增加读取templates.md步骤 | novelworkflow.md |
| 2026-04-27 | P1修复：阶段跳转规则补提回退指引 | novelworkflow.md |
| 2026-04-27 | P1修复：伏笔索引列名统一为"outline.md 参考"（行号易失效） | templates.md, bible.md |
| 2026-04-27 | P3修复：bible.md伏笔索引补齐3条（清除计划全貌/陈默立场/义肢信号） | TEST1/bible.md |
| 2026-04-27 | 架构修正：rulelog.md从`.trae/rules/`移至`.trae/`——日志文件不应自动注入上下文，改为按需读取，避免浪费上下文窗口 | rulelog.md, novelworkflow.md, README.md, CLAUDE.md |
| 2026-04-27 | 架构新增：作者风格文件系统——风格锚点/样本/校准清单从rules.md解耦为独立`authors/xxx.md`，支持多项目共享和动态切换 | novelworkflow.md, templates.md, README.md, TEST1/rules.md, authors/cold_hard_school.md |
| 2026-04-27 | 模板强化：作者风格文件模板从4锚点+4样本+12清单升级为8锚点+8样本(含锚点解析)+20清单(5类分层)；新增`authors/_template.md`空模板；`cold_hard_school.md`按新模板重写 | authors/_template.md, authors/cold_hard_school.md, templates.md |
| 2026-04-27 | rulelog拆分：违规案例保留在`rulelog.md`（必读层），变更记录移至`rulelog_history.md`（按需读取）；伏笔索引列改为伏笔关键词 | rulelog.md, rulelog_history.md, novelworkflow.md, templates.md, TEST1/bible.md, TEST1/outline.md |
