import { describe, expect, it } from 'vitest';
import { renderMarkdown } from './renderMarkdown';

describe('renderMarkdown', () => {
  it('renderiza botón de copiado con clases e íconos por estado', () => {
    const html = renderMarkdown('```js\nconsole.log(1)\n```');
    expect(html).toContain('class="codeBlockWrap"');
    expect(html).toContain('class="codeCopyButton"');
    expect(html).toContain('data-status="idle"');
    expect(html).toContain('class="icon iconCopy"');
    expect(html).toContain('class="icon iconCheck"');
    expect(html).toContain('class="icon iconError"');
    expect(html).toContain('class="codeCopyTooltip"');
  });

  it('omite UI de copiado cuando codeCopyButtons es false', () => {
    const html = renderMarkdown('```txt\n├── src\n│   └── index.ts\n└── README.md\n```', { codeCopyButtons: false });
    expect(html).not.toContain('codeBlockWrap');
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

  it('agrega IDs estables a headings renderizados', () => {
    const html = renderMarkdown('# Intro\n## Intro\n## Vista general');
    expect(html).toContain('<h1 id="intro">Intro</h1>');
    expect(html).toContain('<h2 id="intro-2">Intro</h2>');
    expect(html).toContain('<h2 id="vista-general">Vista general</h2>');
  });

  it('usa el mismo slug que la tabla de contenidos para headings con Markdown inline', () => {
    const html = renderMarkdown(['## [Intro](https://example.com)', '## **Intro**', '## Uso de `pnpm`', '## ![Logo](logo.png) Medo'].join('\n'));

    expect(html).toContain('<h2 id="intro"><a href="https://example.com">Intro</a></h2>');
    expect(html).toContain('<h2 id="intro-2"><strong>Intro</strong></h2>');
    expect(html).toContain('<h2 id="uso-de-pnpm">Uso de <code>pnpm</code></h2>');
    expect(html).toContain('<h2 id="logo-medo"><img src="logo.png" alt="Logo"> Medo</h2>');
  });
});
