import { describe, expect, it } from 'vitest';
import { createNewDocument } from './documentState';
import { buildStandaloneHtmlDocument } from './htmlExport';
import { buildPdfSourceHtml, exportDocumentAsPdf, PDF_EXPORT_NOT_AVAILABLE_MESSAGE } from './pdfExport';

describe('pdfExport', () => {
  it('reutiliza el mismo HTML limpio que Exportar HTML', () => {
    const state = createNewDocument('```txt\n├── src\n```', 'nota.md');
    expect(buildPdfSourceHtml(state)).toBe(buildStandaloneHtmlDocument(state.displayName, state.content));
  });

  it('comunica que la exportación PDF real aún no está disponible', async () => {
    const state = createNewDocument('# Hola', 'nota.md');
    await expect(exportDocumentAsPdf(state)).rejects.toThrow(PDF_EXPORT_NOT_AVAILABLE_MESSAGE);
  });
});
