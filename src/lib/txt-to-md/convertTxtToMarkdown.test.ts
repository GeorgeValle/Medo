import { describe, expect, it } from 'vitest';
import { convertTxtToMarkdown } from './convertTxtToMarkdown';

describe('convertTxtToMarkdown', () => {
  it('retorna vacío para texto vacío', () => expect(convertTxtToMarkdown('   ')).toBe(''));
  it('convierte primera línea en título simple', () => expect(convertTxtToMarkdown('Titulo\n\nTexto')).toContain('# Titulo'));
  it('preserva párrafos', () => expect(convertTxtToMarkdown('Titulo\n\nParrafo uno\n\nParrafo dos')).toContain('Parrafo dos'));
  it('preserva listas simples', () => expect(convertTxtToMarkdown('Lista\n- item 1\n- item 2')).toContain('- item 2'));
  it('detecta URL simple', () => expect(convertTxtToMarkdown('Titulo\nhttps://example.com')).toContain('[https://example.com](https://example.com)'));
});
