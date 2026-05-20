import { renderMarkdown } from '../markdown/renderMarkdown';

const DEFAULT_EXPORT_FILE_NAME = 'medo-document';

function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeBaseName(displayName: string): string {
  const trimmed = displayName.trim();
  if (!trimmed) return DEFAULT_EXPORT_FILE_NAME;
  return trimmed.replace(/\.[^/.]+$/, '') || DEFAULT_EXPORT_FILE_NAME;
}

export function getSuggestedHtmlFileName(displayName: string): string {
  return `${normalizeBaseName(displayName)}.html`;
}

export function buildExportHtmlDocument(markdown: string, displayName: string): string {
  const titleBase = displayName.trim() || DEFAULT_EXPORT_FILE_NAME;
  const escapedTitle = escapeHtmlAttribute(titleBase);
  const renderedMarkdown = renderMarkdown(markdown);

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapedTitle}</title>
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    body {
      margin: 0 auto;
      max-width: 860px;
      padding: 2rem 1.25rem 3rem;
      font-family: Inter, "Segoe UI", Roboto, Arial, sans-serif;
      line-height: 1.65;
      color: #1f2937;
      background: #ffffff;
      word-wrap: break-word;
    }
    h1, h2, h3, h4, h5, h6 {
      margin: 1.5rem 0 0.75rem;
      line-height: 1.25;
      color: #0f172a;
    }
    a { color: #0b57d0; }
    a:hover { color: #0842a0; }
    p, ul, ol, blockquote, pre, table, hr {
      margin: 0 0 1rem;
    }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.925em;
      background: #f3f4f6;
      border-radius: 0.33rem;
      padding: 0.12rem 0.35rem;
    }
    pre {
      background: #0f172a;
      color: #e5e7eb;
      border-radius: 0.5rem;
      padding: 0.9rem;
      overflow-x: auto;
    }
    pre code {
      padding: 0;
      background: transparent;
      color: inherit;
    }
    blockquote {
      border-left: 4px solid #cbd5e1;
      padding: 0.35rem 0.9rem;
      color: #334155;
      background: #f8fafc;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #d1d5db;
    }
    th, td {
      border: 1px solid #d1d5db;
      text-align: left;
      padding: 0.5rem 0.65rem;
      vertical-align: top;
    }
    th { background: #f3f4f6; }
    hr {
      border: 0;
      border-top: 1px solid #d1d5db;
    }
  </style>
</head>
<body>
${renderedMarkdown}
</body>
</html>`;
}
