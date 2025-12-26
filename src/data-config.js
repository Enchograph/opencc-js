export const variants2standard = {
  cn: ['STCharacters', 'STPhrases'], // 简体到繁体的转换规则
};

export const standard2variants = {
  // 为空，因为我们只做简体到繁体转换
};

export const presets = [
  {
    filename: 'cn2t', // 只保留简体到繁体的预设
    from: ['cn'],
    to: [] // 不需要 to，因为我们只做简体到繁体的转换
  }
];
