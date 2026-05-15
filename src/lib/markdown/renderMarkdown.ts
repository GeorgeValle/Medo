import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: false, linkify: true, breaks: true });

export function renderMarkdown(input: string): string {
  return md.render(input);
}
