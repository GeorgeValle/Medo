export type MarkdownFormatAction =
  | 'h0'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'bulletList'
  | 'numberedList'
  | 'alphaList'
  | 'checkList'
  | 'bold'
  | 'italic'
  | 'strikethrough'
  | 'link'
  | 'image'
  | 'quote'
  | 'codeInline'
  | 'codeBlock'
  | 'table'
  | 'tableRow'
  | 'tableColumn'
  | 'separator'
  | 'treeBranch'
  | 'treeSubdirectory'
  | 'treeLast';

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

function getAlphaListStart(before: string): number {
  const lines = before.split('\n');

  for (let index = lines.length - 1; index >= 0; index -= 1) {
    const line = lines[index].trim();
    if (!line) continue;

    const alphaMatch = line.match(/^([a-zA-Z])\.\s+/);
    if (!alphaMatch) {
      return 1;
    }

    const previousCode = alphaMatch[1].toLowerCase().charCodeAt(0);
    if (previousCode < 97 || previousCode > 122) {
      return 1;
    }

    return Math.min(previousCode - 96 + 1, 26);
  }

  return 1;
}

function applyList(text: string, listType: 'bullet' | 'numbered' | 'alpha' | 'check', startAt = 1): string {
  let itemNumber = startAt - 1;
  return text
    .split('\n')
    .map((line) => {
      const clean = line.replace(/^\s*([-*]|\d+\.|[a-zA-Z]\.)\s+/, '').trim();
      if (!clean) return '';
      if (listType === 'bullet') return `- ${clean}`;
      if (listType === 'check') return `- [ ] ${clean}`;
      itemNumber += 1;
      if (listType === 'numbered') {
        return `${itemNumber}. ${clean}`;
      }
      return `${String.fromCharCode(96 + ((itemNumber - 1) % 26) + 1)}. ${clean}`;
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
      const baseLine = line.endsWith('|') ? line.slice(0, -1) : line;
      if (index === 1) return `${baseLine} | --- |`;
      return `${baseLine} | Nueva columna |`;
    })
    .join('\n');
}


function ensureMarkdownBlockBoundaries(before: string, block: string, after: string): { beforePad: string; block: string; afterPad: string } {
  const beforePad = before.length === 0 || before.endsWith('\n\n') ? '' : before.endsWith('\n') ? '\n' : '\n\n';
  const afterPad = after.length === 0 || after.startsWith('\n\n') ? '' : after.startsWith('\n') ? '\n' : '\n\n';
  const normalizedBlock = block.replace(/^\n+/, '').replace(/\n+$/, '');
  return { beforePad, block: normalizedBlock, afterPad };
}

function insertTreeSymbol(content: string, from: number, to: number, symbol: string): ApplyMarkdownFormatResult {
  const start = Math.min(from, to);
  const end = Math.max(from, to);
  const before = content.slice(0, start);
  const after = content.slice(end);

  const lineStart = content.lastIndexOf('\n', start - 1) + 1;
  const nextNewlineIndex = content.indexOf('\n', end);
  const lineEnd = nextNewlineIndex === -1 ? content.length : nextNewlineIndex;
  const currentLine = content.slice(lineStart, lineEnd);
  const currentLineHasContent = currentLine.trim().length > 0;

  if (!currentLineHasContent) {
    const next = `${before}${symbol}${after}`;
    const caret = before.length + symbol.length;
    return { content: next, selectionFrom: caret, selectionTo: caret };
  }

  const insertionPoint = lineEnd;
  const prefix = content.slice(0, insertionPoint);
  const suffix = content.slice(insertionPoint);
  const needsNewline = insertionPoint === content.length || content[insertionPoint] !== '\n';
  const inserted = `${needsNewline ? '\n' : ''}${symbol}`;
  const next = `${prefix}${inserted}${suffix}`;
  const caret = prefix.length + inserted.length;
  return { content: next, selectionFrom: caret, selectionTo: caret };
}

export function applyMarkdownFormat({ content, from, to, action }: ApplyMarkdownFormatInput): ApplyMarkdownFormatResult {
  if (action === 'treeBranch') {
    return insertTreeSymbol(content, from, to, '├── ');
  }
  if (action === 'treeSubdirectory') {
    return insertTreeSymbol(content, from, to, '│   └── ');
  }
  if (action === 'treeLast') {
    return insertTreeSymbol(content, from, to, '└── ');
  }

  const start = Math.min(from, to);
  const end = Math.max(from, to);
  const before = content.slice(0, start);
  const selected = content.slice(start, end);
  const after = content.slice(end);
  const hasSelection = start !== end;

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
      inserted = applyList(selected || 'Elemento', 'bullet');
      break;
    case 'numberedList':
      inserted = applyList(selected || 'Elemento', 'numbered');
      break;
    case 'alphaList':
      inserted = applyList(selected || 'Elemento', 'alpha', getAlphaListStart(before));
      break;
    case 'checkList':
      inserted = applyList(selected || 'Elemento', 'check');
      break;
    case 'bold':
      inserted = wrapInline(selected, '**', '**', 'texto en negrita');
      break;
    case 'italic':
      inserted = wrapInline(selected, '*', '*', 'texto en cursiva');
      break;
    case 'strikethrough':
      inserted = wrapInline(selected, '~~', '~~', 'texto tachado');
      break;
    case 'link':
      inserted = hasSelection ? `${selected}

[texto del enlace](https://)
` : '[texto del enlace](https://)';
      break;
    case 'image':
      inserted = hasSelection ? `${selected}

![descripción de la imagen](https://)
` : '![descripción de la imagen](https://)';
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
    case 'separator':
      inserted = hasSelection ? `${selected}\n\n---\n` : '---';
      break;
  }

  const needsBlockBoundaries =
    (action === 'separator' && !hasSelection) ||
    ((action === 'table' || action === 'tableRow' || action === 'tableColumn') && !hasSelection);

  const { beforePad, block, afterPad } = needsBlockBoundaries
    ? ensureMarkdownBlockBoundaries(before, inserted, after)
    : { beforePad: '', block: inserted, afterPad: '' };

  const nextInserted = `${beforePad}${block}${afterPad}`;
  const next = `${before}${nextInserted}${after}`;
  return {
    content: next,
    selectionFrom: before.length,
    selectionTo: before.length + nextInserted.length
  };
}
