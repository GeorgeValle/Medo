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

  it('inserta separador horizontal markdown', () => {
    const result = applyMarkdownFormat({ content: 'Texto', from: 5, to: 5, action: 'separator' });
    expect(result.content).toBe(`Texto\n---\n`);
  });

});
