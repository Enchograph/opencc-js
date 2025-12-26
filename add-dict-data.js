/**
 * 用于将字典数据从文本文件格式转换为 opencc-js 可用格式的工具脚本
 */

import fs from 'fs';
import path from 'path';

// 检查是否提供了源文件路径参数
if (process.argv.length < 3) {
  console.log('用法: node add-dict-data.js <源字典文件路径>');
  console.log('示例: node add-dict-data.js ./my-dict.txt');
  process.exit(1);
}

const sourceFilePath = process.argv[2];
const outputDir = './dict-data';

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 读取源文件
let sourceData;
try {
  sourceData = fs.readFileSync(sourceFilePath, 'utf-8');
} catch (error) {
  console.error(`无法读取文件: ${sourceFilePath}`);
  console.error(error.message);
  process.exit(1);
}

// 解析数据 - 假设源文件使用空格或制表符分隔
const lines = sourceData.split('\n')
  .filter(line => line.trim() !== '' && !line.trim().startsWith('#')) // 过滤空行和注释
  .map(line => {
    // 尝试用制表符或空格分割
    let parts = line.split('\t');
    if (parts.length < 2) {
      parts = line.split(' ');
    }
    
    if (parts.length >= 2) {
      return [parts[0], parts.slice(1).join(' ')]; // 将后续部分合并为一个值
    }
    return null;
  })
  .filter(Boolean);

// 生成输出文件名
const fileName = path.basename(sourceFilePath, path.extname(sourceFilePath));
const outputFilePath = path.join(outputDir, `${fileName}.txt`);

// 写入处理后的数据
const outputContent = lines
  .map(([key, value]) => `${key}\t${value}`)
  .join('\n');

fs.writeFileSync(outputFilePath, outputContent);

console.log(`字典数据已成功转换并保存到: ${outputFilePath}`);
console.log(`共处理了 ${lines.length} 条转换规则`);