import { save } from '@tauri-apps/plugin-dialog';
import { writeTextFile } from '@tauri-apps/plugin-fs';
import type { DocumentState } from './documentState';
import { renderMarkdown } from '../markdown/renderMarkdown';

const embeddedStyles = `:root { color-scheme: light dark; }
body {
  margin: 0;
  font-family: Inter, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  background: #0b1220;
  color: #e6edf7;
}
main {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 24px 72px;
  line-height: 1.6;
}
h1, h2, h3, h4, h5, h6 { line-height: 1.25; }
a { color: #76b3ff; }
pre {
  background: #0f1a30;
  border: 1px solid #1b2a4a;
  border-radius: 10px;
  overflow: auto;
  padding: 12px;
}
code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #31456f; padding: 8px; text-align: left; }
blockquote {
  margin: 0;
  border-left: 4px solid #3f5f94;
  padding: 0 0 0 12px;
  color: #bccbe6;
}`;

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function buildStandaloneHtmlDocument(title: string, markdownContent: string): string {
  const escapedTitle = escapeHtml(title);
  const renderedContent = renderMarkdown(markdownContent, { codeCopyButtons: false });
  return `<!doctype html>\n<html lang="es">\n<head>\n  <meta charset="utf-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1" />\n  <title>${escapedTitle}</title>\n  <style>${embeddedStyles}</style>\n</head>\n<body>\n  <main>\n${renderedContent}\n  </main>\n</body>\n</html>`;
}

export function buildSuggestedHtmlFilename(displayName: string): string {
  const base = (displayName || 'medo-note').replace(/\.[^/.]+$/, '');
  return `${base}.html`;
}

export async function exportDocumentAsHtml(state: DocumentState): Promise<boolean> {
  const selected = await save({
    defaultPath: state.path ? state.path.replace(/\.[^/.]+$/, '.html') : buildSuggestedHtmlFilename(state.displayName),
    filters: [{ name: 'HTML', extensions: ['html'] }]
  });

  if (!selected) return false;

  const documentHtml = buildStandaloneHtmlDocument(state.displayName, state.content);
  await writeTextFile(selected, documentHtml);
  return true;
}
