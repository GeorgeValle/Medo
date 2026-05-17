import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: false, linkify: true, breaks: true });

const defaultFenceRenderer = md.renderer.rules.fence;

md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const codeContent = md.utils.escapeHtml(token.content);
  const className = token.info ? ` class="language-${md.utils.escapeHtml(token.info.trim().split(/\s+/)[0])}"` : '';
  const fallback = defaultFenceRenderer
    ? defaultFenceRenderer(tokens, idx, options, env, self)
    : `<pre><code${className}>${codeContent}</code></pre>`;

  return `<div class="codeBlockWrap"><button type="button" class="codeCopyButton" data-code="${codeContent.replace(/"/g, '&quot;')}" aria-label="Copiar bloque de código">Copiar</button>${fallback}</div>`;
};

export function renderMarkdown(input: string): string {
  return md.render(input);
}
