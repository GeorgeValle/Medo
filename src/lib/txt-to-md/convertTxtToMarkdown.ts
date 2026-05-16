const listRegex = /^\s*([-*]|\d+\.)\s+/;
const urlRegex = /(https?:\/\/[^\s]+)/g;

export function convertTxtToMarkdown(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';

  const lines = input.split(/\r?\n/);
  const blocks: string[] = [];
  const firstMeaningful = lines.findIndex((line) => line.trim().length > 0);

  for (let index = 0; index < lines.length; index += 1) {
    const clean = lines[index].trim();
    if (!clean) {
      if (blocks[blocks.length - 1] !== '') {
        blocks.push('');
      }
      continue;
    }

    if (index === firstMeaningful && !listRegex.test(clean) && !clean.startsWith('#')) {
      blocks.push(`# ${clean.replace(urlRegex, '[$1]($1)')}`);
      continue;
    }

    if (listRegex.test(clean) || clean.startsWith('#')) {
      blocks.push(clean);
      continue;
    }

    blocks.push(clean.replace(urlRegex, '[$1]($1)'));
  }

  while (blocks[blocks.length - 1] === '') blocks.pop();
  return blocks.join('\n');
}
