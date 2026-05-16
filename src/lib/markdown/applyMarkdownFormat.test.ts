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

});
