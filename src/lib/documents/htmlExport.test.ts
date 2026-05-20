import { describe, expect, it } from 'vitest';
import { buildStandaloneHtmlDocument, buildSuggestedHtmlFilename } from './htmlExport';

describe('htmlExport', () => {
  it('genera documento HTML completo standalone', () => {
    const html = buildStandaloneHtmlDocument('Nota', '# Hola');
    expect(html).toContain('<!doctype html>');
    expect(html).toContain('<html lang="es">');
    expect(html).toContain('<head>');
    expect(html).toContain('<body>');
    expect(html).toContain('<main>');
  });

  it('escapa el título HTML', () => {
    const html = buildStandaloneHtmlDocument('<script>alert("x")</script>', 'ok');
    expect(html).toContain('<title>&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;</title>');
  });

  it('incluye markdown renderizado', () => {
    const html = buildStandaloneHtmlDocument('Nota', '## Subtítulo');
    expect(html).toContain('<h2>Subtítulo</h2>');
  });

  it('incluye estilos embebidos legibles', () => {
    const html = buildStandaloneHtmlDocument('Nota', 'Texto');
    expect(html).toContain('<style>');
    expect(html).toContain('font-family: Inter');
    expect(html).toContain('max-width: 960px');
  });

  it('mantiene HTML crudo escapado del markdown', () => {
    const html = buildStandaloneHtmlDocument('Nota', '<div>hola</div>');
    expect(html).toContain('&lt;div&gt;hola&lt;/div&gt;');
    expect(html).not.toContain('<div>hola</div>');
  });

  it('sugiere nombre .html desde displayName', () => {
    expect(buildSuggestedHtmlFilename('archivo.md')).toBe('archivo.html');
    expect(buildSuggestedHtmlFilename('nota')).toBe('nota.html');
  });
});
