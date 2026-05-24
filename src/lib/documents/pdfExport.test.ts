import { describe, expect, it, vi, beforeEach } from 'vitest';
import { createNewDocument } from './documentState';
import { buildStandaloneHtmlDocument } from './htmlExport';
import { buildPdfSourceHtml, exportDocumentAsPdf, PDF_EXPORT_WINDOWS_PENDING_MESSAGE, requestPdfDestination } from './pdfExport';

vi.mock('@tauri-apps/plugin-dialog', () => ({ save: vi.fn() }));
vi.mock('@tauri-apps/plugin-os', () => ({ platform: vi.fn() }));

import { save } from '@tauri-apps/plugin-dialog';
import { platform } from '@tauri-apps/plugin-os';

describe('pdfExport', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('reutiliza el mismo HTML limpio que Exportar HTML', () => {
    const state = createNewDocument('```txt\n├── src\n```', 'nota.md');
    expect(buildPdfSourceHtml(state)).toBe(buildStandaloneHtmlDocument(state.displayName, state.content));
    expect(buildPdfSourceHtml(state)).not.toContain('code-copy-button');
  });

  it('cancelar el diálogo no produce error', async () => {
    vi.mocked(save).mockResolvedValue(null);
    const state = createNewDocument('# Hola', 'nota.md');
    await expect(exportDocumentAsPdf(state)).resolves.toBe(false);
  });

  it('comunica fallback claro fuera de Windows', async () => {
    vi.mocked(save).mockResolvedValue('/tmp/nota.pdf');
    vi.mocked(platform).mockResolvedValue('linux');
    const state = createNewDocument('# Hola', 'nota.md');
    await expect(exportDocumentAsPdf(state)).rejects.toThrow(PDF_EXPORT_WINDOWS_PENDING_MESSAGE);
  });

  it('en Windows abre impresión del sistema sin noopener/noreferrer', async () => {
    vi.mocked(save).mockResolvedValue('C:/nota.pdf');
    vi.mocked(platform).mockResolvedValue('windows');

    const print = vi.fn();
    const focus = vi.fn();
    const doc = { open: vi.fn(), write: vi.fn(), close: vi.fn() };
    const originalOpen = (globalThis as { open?: typeof globalThis.open }).open;

    const openSpy = vi.fn(() => ({ document: doc, print, focus } as unknown as Window));
    (globalThis as { open?: (url?: string, target?: string, features?: string) => Window | null }).open = openSpy;

    const state = createNewDocument('# Hola', 'nota.md');
    await expect(exportDocumentAsPdf(state)).resolves.toBe(true);
    expect(openSpy).toHaveBeenCalledWith('', '_blank');
    const featuresArg = openSpy.mock.calls[0]?.[2];
    expect(featuresArg).toBeUndefined();
    expect(doc.write).toHaveBeenCalledWith(buildPdfSourceHtml(state));
    expect(print).toHaveBeenCalledOnce();
    (globalThis as { open?: typeof globalThis.open }).open = originalOpen;
  });

  it('requestPdfDestination sugiere extensión pdf', async () => {
    vi.mocked(save).mockResolvedValue('/tmp/nota.pdf');
    const state = createNewDocument('# Hola', 'nota.md');
    await requestPdfDestination(state);
    expect(save).toHaveBeenCalledOnce();
  });
});
