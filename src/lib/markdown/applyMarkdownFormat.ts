export type MarkdownFormatAction =
  | 'h0'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'bulletList'
  | 'numberedList'
  | 'bold'
  | 'italic'
  | 'link'
  | 'image'
  | 'quote'
  | 'code';

export type ApplyMarkdownFormatInput = {
  content: string;
  from: number;
  to: number;
  action: MarkdownFormatAction;
};

export type ApplyMarkdownFormatResult = {
  content: string;
  selectionFrom: number;
  selectionTo: number;
};

const linePrefixByAction = {
  h1: '# ',
  h2: '## ',
  h3: '### ',
  quote: '> '
} as const;

function applyLinePrefix(text: string, prefix: string): string {
  return text
    .split('\n')
    .map((line) => {
      const unprefixed = line.replace(/^(#{1,6}\s+|>\s+)/, '');
      return `${prefix}${unprefixed}`;
    })
    .join('\n');
}

function applyList(text: string, ordered: boolean): string {
  return text
    .split('\n')
    .map((line, index) => {
      const clean = line.replace(/^\s*([-*]|\d+\.)\s+/, '').trim();
      if (!clean) return '';
      return ordered ? `${index + 1}. ${clean}` : `- ${clean}`;
    })
    .join('\n');
}

function wrapInline(selected: string, left: string, right = left, fallback = 'texto'): string {
  const base = selected || fallback;
  return `${left}${base}${right}`;
}

export function applyMarkdownFormat({ content, from, to, action }: ApplyMarkdownFormatInput): ApplyMarkdownFormatResult {
  const start = Math.min(from, to);
  const end = Math.max(from, to);
  const before = content.slice(0, start);
  const selected = content.slice(start, end);
  const after = content.slice(end);

  let inserted = selected;

  switch (action) {
    case 'h0':
      inserted = selected ? selected.split('\n').map((line) => line.replace(/^(#{1,6}\s+|>\s+)/, '')).join('\n') : 'Texto normal';
      break;
    case 'h1':
    case 'h2':
    case 'h3':
    case 'quote':
      inserted = applyLinePrefix(selected || 'Texto', linePrefixByAction[action]);
      break;
    case 'bulletList':
      inserted = applyList(selected || 'Elemento', false);
      break;
    case 'numberedList':
      inserted = applyList(selected || 'Elemento', true);
      break;
    case 'bold':
      inserted = wrapInline(selected, '**', '**', 'texto en negrita');
      break;
    case 'italic':
      inserted = wrapInline(selected, '*', '*', 'texto en cursiva');
      break;
    case 'link':
      inserted = selected ? `[${selected}](https://)` : '[texto del enlace](https://)';
      break;
    case 'image':
      inserted = selected ? `![${selected}](https://)` : '![descripción de la imagen](https://)';
      break;
    case 'code':
      inserted = selected.includes('\n') ? `\n\`\`\`\n${selected || 'codigo'}\n\`\`\`\n` : wrapInline(selected, '`', '`', 'codigo');
      break;
  }

  const next = `${before}${inserted}${after}`;
  return {
    content: next,
    selectionFrom: before.length,
    selectionTo: before.length + inserted.length
  };
}
