import { describe, expect, it } from 'vitest';
import { buildExportHtmlDocument, getSuggestedHtmlFileName } from './exportHtml';

describe('exportHtml', () => {
  it('genera un documento HTML completo', () => {
    const html = buildExportHtmlDocument('# Título', 'nota.md');

    expect(html).toContain('<!doctype html>');
    expect(html).toContain('<html lang="es">');
    expect(html).toContain('<meta charset="utf-8">');
    expect(html).toContain('<meta name="viewport" content="width=device-width, initial-scale=1">');
    expect(html).toContain('<title>nota.md</title>');
    expect(html).toContain('</body>');
    expect(html).toContain('</html>');
  });

  it('escapa correctamente el título', () => {
    const html = buildExportHtmlDocument('texto', 'xss <tag> "quote" & test');

    expect(html).toContain('<title>xss &lt;tag&gt; &quot;quote&quot; &amp; test</title>');
  });

  it('incluye el html renderizado desde markdown', () => {
    const html = buildExportHtmlDocument('## Hola\n\n`inline`', 'doc.md');

    expect(html).toContain('<h2>Hola</h2>');
    expect(html).toContain('<code>inline</code>');
  });

  it('incluye estilos básicos embebidos', () => {
    const html = buildExportHtmlDocument('texto', 'doc.md');

    expect(html).toContain('body {');
    expect(html).toContain('h1, h2, h3, h4, h5, h6 {');
    expect(html).toContain('a { color:');
    expect(html).toContain('code {');
    expect(html).toContain('pre {');
    expect(html).toContain('blockquote {');
    expect(html).toContain('table {');
    expect(html).toContain('hr {');
  });

  it('no habilita html crudo adicional', () => {
    const html = buildExportHtmlDocument('<script>alert(1)</script>', 'doc.md');

    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(html).not.toContain('<script>alert(1)</script>');
  });

  it('sugiere nombre html basado en displayName', () => {
    expect(getSuggestedHtmlFileName('nota.md')).toBe('nota.html');
    expect(getSuggestedHtmlFileName('nota')).toBe('nota.html');
    expect(getSuggestedHtmlFileName('')).toBe('medo-document.html');
  });
});
