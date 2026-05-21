import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: false, linkify: true, breaks: true });

const defaultFenceRenderer = md.renderer.rules.fence;

const copyIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
const checkIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>';
const errorIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>';

md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const codeContent = md.utils.escapeHtml(token.content);
  const className = token.info ? ` class="language-${md.utils.escapeHtml(token.info.trim().split(/\s+/)[0])}"` : '';
  const fallback = defaultFenceRenderer
    ? defaultFenceRenderer(tokens, idx, options, env, self)
    : `<pre><code${className}>${codeContent}</code></pre>`;

  const shouldRenderCopyButtons = (env as { codeCopyButtons?: boolean } | undefined)?.codeCopyButtons !== false;
  if (!shouldRenderCopyButtons) return fallback;

  return `<div class="codeBlockWrap"><button type="button" class="codeCopyButton" data-code="${codeContent.replace(/"/g, '&quot;')}" data-status="idle" aria-label="Copiar" title="Copiar"><span class="icon iconCopy">${copyIcon}</span><span class="icon iconCheck">${checkIcon}</span><span class="icon iconError">${errorIcon}</span><span class="codeCopyTooltip" role="tooltip">Copiar</span></button>${fallback}</div>`;
};

export type RenderMarkdownOptions = {
  codeCopyButtons?: boolean;
};

export function renderMarkdown(input: string, options: RenderMarkdownOptions = {}): string {
  return md.render(input, { codeCopyButtons: options.codeCopyButtons });
}
