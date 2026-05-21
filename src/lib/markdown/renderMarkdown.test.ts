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
});
