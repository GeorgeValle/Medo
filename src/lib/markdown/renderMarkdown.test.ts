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
});
