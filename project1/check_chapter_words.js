const fs = require('fs');
const path = require('path');

function countChineseWords(text) {
    const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;
    const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;
    const numbers = (text.match(/\d+\.?\d*/g) || []).length;
    return chineseChars + englishWords + numbers;
}

function analyzeChapter(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const contentNoMarkdown = content
        .replace(/[#*`\[\]()>_~\-|\\]/g, '')
        .replace(/\n{3,}/g, '\n\n');

    return countChineseWords(contentNoMarkdown);
}

function main() {
    const chaptersDir = path.join(__dirname, 'chapters');
    const minWords = 5000;
    const maxWords = 9000;

    const results = [];
    const invalidChapters = [];

    for (let i = 1; i <= 80; i++) {
        const chapterFile = path.join(chaptersDir, `chapter_${String(i).padStart(2, '0')}.md`);
        if (fs.existsSync(chapterFile)) {
            const wordCount = analyzeChapter(chapterFile);
            const status = (wordCount >= minWords && wordCount <= maxWords) ? '[OK]' : '[FAIL]';
            results.push({ chapter: i, count: wordCount, status });

            if (wordCount < minWords) {
                invalidChapters.push({ chapter: i, count: wordCount, issue: '字数不足', diff: minWords - wordCount });
            } else if (wordCount > maxWords) {
                invalidChapters.push({ chapter: i, count: wordCount, issue: '字数超出', diff: wordCount - maxWords });
            }
        }
    }

    let output = '';
    output += '='.repeat(60) + '\n';
    output += '章节字数统计报告\n';
    output += '='.repeat(60) + '\n';
    output += `要求：${minWords} - ${maxWords} 字\n`;
    output += '='.repeat(60) + '\n';

    output += '\n【所有章节字数】\n';
    output += '-'.repeat(40) + '\n';
    for (const { chapter, count, status } of results) {
        output += `第${String(chapter).padStart(2, '0')}章: ${String(count).padStart(5)} 字 ${status}\n`;
    }

    output += '\n' + '='.repeat(60) + '\n';
    output += '【不符合要求的章节】\n';
    output += '='.repeat(60) + '\n';

    if (invalidChapters.length > 0) {
        for (const { chapter, count, issue, diff } of invalidChapters) {
            output += `第${String(chapter).padStart(2, '0')}章: ${count} 字 -> ${issue} (差 ${diff} 字)\n`;
        }
    } else {
        output += '所有章节字数都符合要求！\n';
    }

    output += '\n' + '='.repeat(60) + '\n';
    output += `统计结果：共 ${results.length} 章\n`;
    output += `符合要求：${results.filter(r => r.status === '[OK]').length} 章\n`;
    output += `不符合要求：${invalidChapters.length} 章\n`;
    output += '='.repeat(60) + '\n';

    const outputFile = path.join(__dirname, 'word_count_report.txt');
    fs.writeFileSync(outputFile, output, 'utf-8');
    console.log(`报告已生成: ${outputFile}`);
    console.log(output);
}

main();
