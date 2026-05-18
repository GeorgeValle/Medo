import { describe, expect, it } from 'vitest';
import { applyMarkdownFormat } from './applyMarkdownFormat';

describe('applyMarkdownFormat', () => {
  it('aplica encabezado h2 sobre selección', () => {
    const result = applyMarkdownFormat({ content: 'titulo', from: 0, to: 6, action: 'h2' });
    expect(result.content).toBe('## titulo');
  });

  it('inserta plantilla de enlace sin selección', () => {
    const result = applyMarkdownFormat({ content: '', from: 0, to: 0, action: 'link' });
    expect(result.content).toBe('[texto del enlace](https://)');
  });

  it('convierte varias líneas a lista numerada', () => {
    const result = applyMarkdownFormat({ content: 'uno\ndos', from: 0, to: 7, action: 'numberedList' });
    expect(result.content).toBe('1. uno\n2. dos');
  });

  it('renumera lista numerada ignorando líneas en blanco', () => {
    const result = applyMarkdownFormat({ content: 'uno\n\ndos', from: 0, to: 8, action: 'numberedList' });
    expect(result.content).toBe('1. uno\n\n2. dos');
  });

  it('convierte varias líneas a lista alfabética', () => {
    const result = applyMarkdownFormat({ content: 'uno\ndos\ntres', from: 0, to: 12, action: 'alphaList' });
    expect(result.content).toBe('a. uno\nb. dos\nc. tres');
  });

  it('continúa lista alfabética desde el contexto previo', () => {
    const content = 'a. uno\nb. dos\ntres\ncuatro';
    const result = applyMarkdownFormat({ content, from: 13, to: content.length, action: 'alphaList' });
    expect(result.content).toBe('a. uno\nb. dos\nc. tres\nd. cuatro');
  });

  it('convierte varias líneas a checklist markdown', () => {
    const result = applyMarkdownFormat({ content: 'uno\ndos\ntres', from: 0, to: 12, action: 'checkList' });
    expect(result.content).toBe('- [ ] uno\n- [ ] dos\n- [ ] tres');
  });

  it('inserta código inline sin selección', () => {
    const result = applyMarkdownFormat({ content: '', from: 0, to: 0, action: 'codeInline' });
    expect(result.content).toBe('`codigo`');
  });

  it('inserta bloque de código con triple backtick', () => {
    const result = applyMarkdownFormat({ content: '', from: 0, to: 0, action: 'codeBlock' });
    expect(result.content).toBe('\n```\ncodigo\n```\n');
  });

  it('inserta tabla base', () => {
    const result = applyMarkdownFormat({ content: '', from: 0, to: 0, action: 'table' });
    expect(result.content).toBe('| Columna 1 | Columna 2 |\n| --- | --- |\n| Valor 1 | Valor 2 |');
  });

  it('agrega columna preservando filas con pipe final', () => {
    const table = '| a | b |\n| --- | --- |\n| c | d |';
    const result = applyMarkdownFormat({ content: table, from: 0, to: table.length, action: 'tableColumn' });
    expect(result.content).toBe('| a | b  | Nueva columna |\n| --- | ---  | --- |\n| c | d  | Nueva columna |');
  });

  it('agrega columna preservando filas sin pipe final', () => {
    const table = '| a | b\n| --- | ---\n| c | d';
    const result = applyMarkdownFormat({ content: table, from: 0, to: table.length, action: 'tableColumn' });
    expect(result.content).toBe('| a | b | Nueva columna |\n| --- | --- | --- |\n| c | d | Nueva columna |');
  });



  it('envuelve selección en negrita sin perder contenido', () => {
    const result = applyMarkdownFormat({ content: 'Texto seleccionado', from: 0, to: 'Texto seleccionado'.length, action: 'bold' });
    expect(result.content).toBe('**Texto seleccionado**');
  });

  it('envuelve selección en cursiva sin perder contenido', () => {
    const result = applyMarkdownFormat({ content: 'Texto seleccionado', from: 0, to: 'Texto seleccionado'.length, action: 'italic' });
    expect(result.content).toBe('*Texto seleccionado*');
  });

  it('envuelve selección en código inline sin perder contenido', () => {
    const result = applyMarkdownFormat({ content: 'Texto seleccionado', from: 0, to: 'Texto seleccionado'.length, action: 'codeInline' });
    expect(result.content).toBe('`Texto seleccionado`');
  });

  it('inserta bloque de código usando selección como contenido', () => {
    const result = applyMarkdownFormat({ content: 'Texto seleccionado', from: 0, to: 'Texto seleccionado'.length, action: 'codeBlock' });
    expect(result.content).toBe('\n```\nTexto seleccionado\n```\n');
  });

  it('convierte cita multilinea preservando líneas seleccionadas', () => {
    const result = applyMarkdownFormat({ content: 'uno\ndos', from: 0, to: 7, action: 'quote' });
    expect(result.content).toBe('> uno\n> dos');
  });

  it('convierte lista con selección multilinea preservando líneas', () => {
    const result = applyMarkdownFormat({ content: 'uno\ndos', from: 0, to: 7, action: 'bulletList' });
    expect(result.content).toBe('- uno\n- dos');
  });

  it('con selección en enlace conserva texto y agrega plantilla debajo', () => {
    const result = applyMarkdownFormat({ content: 'Texto seleccionado', from: 0, to: 'Texto seleccionado'.length, action: 'link' });
    expect(result.content).toBe('Texto seleccionado\n\n[texto del enlace](https://)\n');
  });

  it('con selección en imagen conserva texto y agrega plantilla debajo', () => {
    const result = applyMarkdownFormat({ content: 'Texto seleccionado', from: 0, to: 'Texto seleccionado'.length, action: 'image' });
    expect(result.content).toBe('Texto seleccionado\n\n![descripción de la imagen](https://)\n');
  });

  it('con selección en separador conserva texto y agrega separador debajo', () => {
    const result = applyMarkdownFormat({ content: 'Texto seleccionado', from: 0, to: 'Texto seleccionado'.length, action: 'separator' });
    expect(result.content).toBe('Texto seleccionado\n\n---\n');
  });


  it('con selección intermedia en separador evita concatenar contenido posterior', () => {
    const content = 'Inicio Texto seleccionado final';
    const start = content.indexOf('Texto seleccionado');
    const end = start + 'Texto seleccionado'.length;
    const result = applyMarkdownFormat({ content, from: start, to: end, action: 'separator' });
    expect(result.content).toBe('Inicio Texto seleccionado\n\n---\n final');
  });

  it('con selección intermedia en enlace evita concatenar contenido posterior', () => {
    const content = 'Inicio Texto seleccionado final';
    const start = content.indexOf('Texto seleccionado');
    const end = start + 'Texto seleccionado'.length;
    const result = applyMarkdownFormat({ content, from: start, to: end, action: 'link' });
    expect(result.content).toBe('Inicio Texto seleccionado\n\n[texto del enlace](https://)\n final');
  });

  it('con selección intermedia en imagen evita concatenar contenido posterior', () => {
    const content = 'Inicio Texto seleccionado final';
    const start = content.indexOf('Texto seleccionado');
    const end = start + 'Texto seleccionado'.length;
    const result = applyMarkdownFormat({ content, from: start, to: end, action: 'image' });
    expect(result.content).toBe('Inicio Texto seleccionado\n\n![descripción de la imagen](https://)\n final');
  });

  it('inserta separador horizontal markdown', () => {
    const result = applyMarkdownFormat({ content: 'Texto', from: 5, to: 5, action: 'separator' });
    expect(result.content).toBe(`Texto\n---\n`);
  });
});
