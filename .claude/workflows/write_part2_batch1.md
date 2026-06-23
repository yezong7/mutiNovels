export const meta = {
  name: 'write-part2-batch1',
  description: 'Write chapters 1-5 of Part 2 (星魂传说：崛起)',
  phases: [
    { title: 'Load Context', detail: 'Load rules, style, outline' },
    { title: 'Write Chapters', detail: 'Write 5 chapters with anti-AI detection' },
  ],
}

phase('Load Context')

const rulesContent = await agent('Read /mnt/g/tmpRepo/mutiNovels/project1_part2/rules.md and output its FULL content verbatim.', {
  label: 'load-rules',
  phase: 'Load Context',
})

const styleContent = await agent('Read /mnt/g/tmpRepo/mutiNovels/authors/luan.md and output its FULL content verbatim.', {
  label: 'load-style',
  phase: 'Load Context',
})

const outlineContent = await agent('Read /mnt/g/tmpRepo/mutiNovels/project1_part2/outline.md and output its FULL content verbatim.', {
  label: 'load-outline',
  phase: 'Load Context',
})

const part1Ending = await agent('Read /mnt/g/tmpRepo/mutiNovels/project1/chapters/chapter_80.md and output its FULL content verbatim.', {
  label: 'load-part1-ending',
  phase: 'Load Context',
})

phase('Write Chapters')

const results = await pipeline(
  [1, 2, 3, 4, 5],
  async (chNum, prevResult, index) => {
    const chapterNum = String(chNum).padStart(2, '0')
    const prevChapterEnd = index > 0 ? prevResult : '这是第二部第一章，承接第一部第80章结尾。林默回到地球三个月，银白小猫陪伴在侧。'

    const prompt = `你是一个专业中文小说写作助手。请按照以下要求写作《星魂传说：崛起》第二部第${chNum}章。

## 大纲要求
${outlineContent}

请找到 chapter_${chapterNum} 的预设事件、核心转折、情绪基调，严格按照大纲写作。

## 前文衔接
上一章结尾（用于保持剧情连续性）：
${prevChapterEnd}

## 写作风格要求（luan风格）
${styleContent}

## 项目规则
${rulesContent}

## 反AI检测约束（硬性要求，必须遵守）
1. 同一句式结构连续不超过2句
2. 同一角色名开头连续不超过3句
3. 同一动词在同一段落内不重复使用
4. 每10句至少包含1句极短句（2-5字）和1句长句（30字以上）
5. 段落长度必须不规则：1行、3行、7行、2行交替，禁止连续3个段落长度相同
6. 每500字至少有1-2处"废笔"（与主线无关的感官/动作细节，触觉嗅觉优先）
7. 每个场景至少1处内心独白碎片（不用引号，不用"想"字）
8. 对话必须包含至少10%的不完美特征（打断/省略/跑题/未说完）
9. 禁止"声音平稳""注视着""不由得""缓缓""仿佛""似乎""竟然"等AI高频词
10. 禁止段末/章末总结性语句
11. 感官类型分布：视觉<60%，增加触觉/嗅觉/听觉
12. 转场方式多样，不用固定---
13. 用物件/动作传达情绪，不直接写"他很悲伤""他感到愤怒"
14. 对话每句≤40字，允许打断和未说完

## 写作质量要求
- 内容不入俗套，避免常见网文套路
- 每章5000-8000中文字
- 章节标题格式：# 第X章 标题
- 注重细节描写，环境服务于情绪
- 人物行为符合设定，理性克制

## 输出步骤
1. 先用Write工具将完整章节写入 /mnt/g/tmpRepo/mutiNovels/project1_part2/chapters/chapter_${chapterNum}.md
2. 然后输出该章最后300字（用于下一章衔接）

请开始写作。`

    const chapter = await agent(prompt, {
      label: `write-ch${chapterNum}`,
      phase: 'Write Chapters',
      model: 'opus',
    })

    return chapter
  }
)

return { chaptersWritten: 5, status: 'Batch 1 complete. Please clear context and start new session for next batch.' }
