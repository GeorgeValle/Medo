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
    expect(html).toContain('<h2 id="subtitulo">Subtítulo</h2>');
  });

  it('preserva anchors internos y IDs de headings en el HTML exportado', () => {
    const html = buildStandaloneHtmlDocument('Nota', '[Vista general](#vista-general)\n\n## Vista general');
    expect(html).toContain('<a href="#vista-general">Vista general</a>');
    expect(html).toContain('<h2 id="vista-general">Vista general</h2>');
  });

  it('exporta headings con Markdown inline usando los mismos IDs de la tabla de contenidos', () => {
    const markdown = ['- [Intro](#intro)', '- [Uso de pnpm](#uso-de-pnpm)', '', '## [Intro](https://example.com)', '## Uso de `pnpm`'].join('\n');
    const html = buildStandaloneHtmlDocument('Nota', markdown);

    expect(html).toContain('<a href="#intro">Intro</a>');
    expect(html).toContain('<h2 id="intro"><a href="https://example.com">Intro</a></h2>');
    expect(html).toContain('<a href="#uso-de-pnpm">Uso de pnpm</a>');
    expect(html).toContain('<h2 id="uso-de-pnpm">Uso de <code>pnpm</code></h2>');
  });

  it('exporta bloques de código sin UI interna de copiado', () => {
    const html = buildStandaloneHtmlDocument('Nota', '```txt\n├── src\n│   └── index.ts\n└── README.md\n```');
    expect(html).not.toContain('codeCopyButton');
    expect(html).not.toContain('codeCopyTooltip');
    expect(html).not.toContain('iconCopy');
    expect(html).not.toContain('iconCheck');
    expect(html).not.toContain('iconError');
    expect(html).toContain('<pre><code class="language-txt">');
    expect(html).toContain('├── src');
    expect(html).toContain('│   └── index.ts');
    expect(html).toContain('└── README.md');
  });

  it('incluye estilos embebidos legibles', () => {
    const html = buildStandaloneHtmlDocument('Nota', 'Texto');
    expect(html).toContain('<style>');
    expect(html).toContain('font-family: Inter');
    expect(html).toContain('max-width: 960px');
  });

  it('incluye reglas @media print para impresión/PDF legible', () => {
    const html = buildStandaloneHtmlDocument('Nota', 'Texto con `code` y [link](https://example.com)');
    expect(html).toContain('@media print');
    expect(html).toContain('color-scheme: light;');
    expect(html).toContain('background: #ffffff !important;');
    expect(html).toContain('color: #111827 !important;');
    expect(html).toContain('a {');
    expect(html).toContain('code {');
    expect(html).toContain('pre code {');
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
