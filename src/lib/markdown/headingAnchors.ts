export type HeadingAnchor = {
  level: number;
  text: string;
  slug: string;
};

const tableOfContentsSlug = 'tabla-de-contenidos';

function stripInlineMarkdown(input: string): string {
  return input
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .trim();
}

function stripTrailingHeadingMarkers(input: string): string {
  return input.replace(/\s+#+\s*$/, '').trim();
}

export function extractHeadingPlainText(markdownHeadingText: string): string {
  return stripInlineMarkdown(stripTrailingHeadingMarkers(markdownHeadingText));
}

export function slugifyHeading(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function createUniqueHeadingSlug(text: string, usedSlugs: Map<string, number>): string {
  const baseSlug = slugifyHeading(text) || 'seccion';
  const currentCount = usedSlugs.get(baseSlug) ?? 0;
  const nextCount = currentCount + 1;
  usedSlugs.set(baseSlug, nextCount);
  return nextCount === 1 ? baseSlug : `${baseSlug}-${nextCount}`;
}

export function buildHeadingAnchors(markdown: string): HeadingAnchor[] {
  const usedSlugs = new Map<string, number>();
  const anchors: HeadingAnchor[] = [];
  let fenceMarker: '`' | '~' | null = null;
  let fenceLength = 0;

  for (const line of markdown.split(/\r?\n/)) {
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
    if (fenceMatch) {
      const marker = fenceMatch[1][0] as '`' | '~';
      if (!fenceMarker) {
        fenceMarker = marker;
        fenceLength = fenceMatch[1].length;
        continue;
      }
      if (fenceMarker === marker && fenceMatch[1].length >= fenceLength) {
        fenceMarker = null;
        fenceLength = 0;
        continue;
      }
    }

    if (fenceMarker) continue;

    const headingMatch = line.match(/^\s{0,3}(#{1,6})\s+(.+)$/);
    if (!headingMatch) continue;

    const level = headingMatch[1].length;
    const text = extractHeadingPlainText(headingMatch[2]);
    if (!text) continue;

    const baseSlug = slugifyHeading(text);
    if (!baseSlug || baseSlug === tableOfContentsSlug) continue;

    anchors.push({
      level,
      text,
      slug: createUniqueHeadingSlug(text, usedSlugs)
    });
  }

  return anchors;
}

export function buildTableOfContents(markdown: string): string {
  const anchors = buildHeadingAnchors(markdown);
  if (anchors.length === 0) return '';

  const items = anchors.map((anchor) => {
    const indentation = '  '.repeat(Math.max(anchor.level - 2, 0));
    return `${indentation}- [${anchor.text}](#${anchor.slug})`;
  });

  return ['## Tabla de contenidos', '', ...items].join('\n');
}
