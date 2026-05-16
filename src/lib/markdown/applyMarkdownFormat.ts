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
  | 'codeInline'
  | 'codeBlock'
  | 'table'
  | 'tableRow'
  | 'tableColumn';

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
  let itemNumber = 0;
  return text
    .split('\n')
    .map((line) => {
      const clean = line.replace(/^\s*([-*]|\d+\.)\s+/, '').trim();
      if (!clean) return '';
      if (!ordered) return `- ${clean}`;
      itemNumber += 1;
      return `${itemNumber}. ${clean}`;
    })
    .join('\n');
}

function wrapInline(selected: string, left: string, right = left, fallback = 'texto'): string {
  const base = selected || fallback;
  return `${left}${base}${right}`;
}

function ensureTableBase(selected: string): string {
  if (selected.trim()) return selected;
  return '| Columna 1 | Columna 2 |\n| --- | --- |\n| Valor 1 | Valor 2 |';
}

function appendTableRow(selected: string): string {
  const base = ensureTableBase(selected);
  const suffix = '\n| Valor nuevo 1 | Valor nuevo 2 |';
  return base.endsWith('\n') ? `${base}| Valor nuevo 1 | Valor nuevo 2 |` : `${base}${suffix}`;
}

function appendTableColumn(selected: string): string {
  const lines = ensureTableBase(selected).split('\n');
  return lines
    .map((line, index) => {
      const trimmed = line.trim();
      if (!trimmed.startsWith('|')) return line;
      if (index === 1) return `${line.slice(0, -1)} | --- |`;
      return `${line.slice(0, -1)} | Nueva columna |`;
    })
    .join('\n');
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
    case 'codeInline':
      inserted = wrapInline(selected, '`', '`', 'codigo');
      break;
    case 'codeBlock':
      inserted = `\n\`\`\`\n${selected || 'codigo'}\n\`\`\`\n`;
      break;
    case 'table':
      inserted = ensureTableBase(selected);
      break;
    case 'tableRow':
      inserted = appendTableRow(selected);
      break;
    case 'tableColumn':
      inserted = appendTableColumn(selected);
      break;
  }

  const next = `${before}${inserted}${after}`;
  return {
    content: next,
    selectionFrom: before.length,
    selectionTo: before.length + inserted.length
  };
}
