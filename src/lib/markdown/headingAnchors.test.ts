import { describe, expect, it } from 'vitest';
import { buildHeadingAnchors, buildTableOfContents, extractHeadingPlainText, slugifyHeading } from './headingAnchors';

describe('headingAnchors', () => {
  it('slugifyHeading normaliza acentos, signos, espacios y español', () => {
    expect(slugifyHeading('Instalación local')).toBe('instalacion-local');
    expect(slugifyHeading('¿Qué es Medo?')).toBe('que-es-medo');
    expect(slugifyHeading('Exportar HTML y PDF')).toBe('exportar-html-y-pdf');
    expect(slugifyHeading('  Muchos   espacios --- juntos  ')).toBe('muchos-espacios-juntos');
  });

  it('extrae texto visible de headings con Markdown inline', () => {
    expect(extractHeadingPlainText('[Intro](https://example.com)')).toBe('Intro');
    expect(extractHeadingPlainText('**Intro**')).toBe('Intro');
    expect(extractHeadingPlainText('Uso de `pnpm`')).toBe('Uso de pnpm');
    expect(extractHeadingPlainText('![Logo](logo.png) Medo')).toBe('Logo Medo');
  });

  it('usa texto visible para anchors y tabla de contenidos con Markdown inline', () => {
    const markdown = ['## [Intro](https://example.com)', '## **Intro**', '## Uso de `pnpm`', '## ![Logo](logo.png) Medo'].join('\n');

    expect(buildHeadingAnchors(markdown)).toEqual([
      { level: 2, text: 'Intro', slug: 'intro' },
      { level: 2, text: 'Intro', slug: 'intro-2' },
      { level: 2, text: 'Uso de pnpm', slug: 'uso-de-pnpm' },
      { level: 2, text: 'Logo Medo', slug: 'logo-medo' }
    ]);
    expect(buildTableOfContents(markdown)).toContain('- [Intro](#intro)');
    expect(buildTableOfContents(markdown)).toContain('- [Intro](#intro-2)');
    expect(buildTableOfContents(markdown)).toContain('- [Uso de pnpm](#uso-de-pnpm)');
    expect(buildTableOfContents(markdown)).toContain('- [Logo Medo](#logo-medo)');
  });

  it('resuelve duplicados de forma estable', () => {
    const anchors = buildHeadingAnchors('# Intro\n## Intro\n### Intro');
    expect(anchors.map((anchor) => anchor.slug)).toEqual(['intro', 'intro-2', 'intro-3']);
  });

  it('ignora headings dentro de bloques de código fenced', () => {
    const anchors = buildHeadingAnchors(['# Visible', '```md', '# Oculto', '```', '~~~', '## También oculto', '~~~', '## Otra sección'].join('\n'));
    expect(anchors).toEqual([
      { level: 1, text: 'Visible', slug: 'visible' },
      { level: 2, text: 'Otra sección', slug: 'otra-seccion' }
    ]);
  });

  it('omite headings vacíos y Tabla de contenidos', () => {
    const anchors = buildHeadingAnchors('## Tabla de contenidos\n# #\n## Contenido');
    expect(anchors).toEqual([{ level: 2, text: 'Contenido', slug: 'contenido' }]);
  });

  it('buildTableOfContents genera un índice básico con indentación por nivel', () => {
    const toc = buildTableOfContents('# Medo\n## Vista general\n## Características principales\n### Instalación local');
    expect(toc).toBe([
      '## Tabla de contenidos',
      '',
      '- [Medo](#medo)',
      '- [Vista general](#vista-general)',
      '- [Características principales](#caracteristicas-principales)',
      '  - [Instalación local](#instalacion-local)'
    ].join('\n'));
  });
});
