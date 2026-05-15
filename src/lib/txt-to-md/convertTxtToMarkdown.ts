const listRegex = /^\s*([-*]|\d+\.)\s+/;
const urlRegex = /(https?:\/\/[^\s]+)/g;

export function convertTxtToMarkdown(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';

  const lines = input.split(/\r?\n/);
  const firstMeaningful = lines.findIndex((line) => line.trim().length > 0);

  return lines
    .map((line, index) => {
      const clean = line.trim();
      if (!clean) return '';
      if (index === firstMeaningful && !listRegex.test(clean) && !clean.startsWith('#')) return `# ${clean}`;
      if (listRegex.test(clean)) return clean;
      return clean.replace(urlRegex, '[$1]($1)');
    })
    .join('\n');
}
