import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { createNewDocument } from './documentState';
import { buildStandaloneHtmlDocument } from './htmlExport';
import { buildPdfSourceHtml, exportDocumentAsPdf, PDF_EXPORT_WINDOWS_PENDING_MESSAGE } from './pdfExport';

vi.mock('@tauri-apps/plugin-os', () => ({ platform: vi.fn() }));
import { platform } from '@tauri-apps/plugin-os';

type FakeIframe = {
  style: Record<string, string>;
  setAttribute: ReturnType<typeof vi.fn>;
  remove: ReturnType<typeof vi.fn>;
  contentDocument: { open: ReturnType<typeof vi.fn>; write: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> } | null;
  contentWindow: { print?: ReturnType<typeof vi.fn>; focus?: ReturnType<typeof vi.fn> } | null;
};

function setupFakeDocument(iframe: FakeIframe) {
  const appendChild = vi.fn();
  const createElement = vi.fn((tag: string) => {
    if (tag !== 'iframe') throw new Error('tag inesperado');
    return iframe;
  });

  vi.stubGlobal('document', {
    createElement,
    body: { appendChild }
  });

  return { appendChild, createElement };
}

describe('pdfExport', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => vi.unstubAllGlobals());

  it('reutiliza el mismo HTML limpio que Exportar HTML', () => {
    const state = createNewDocument('```txt\n├── src\n```', 'nota.md');
    expect(buildPdfSourceHtml(state)).toBe(buildStandaloneHtmlDocument(state.displayName, state.content));
    expect(buildPdfSourceHtml(state)).not.toContain('code-copy-button');
  });

  it('comunica fallback claro fuera de Windows', async () => {
    vi.mocked(platform).mockResolvedValue('linux');
    const state = createNewDocument('# Hola', 'nota.md');
    await expect(exportDocumentAsPdf(state)).rejects.toThrow(PDF_EXPORT_WINDOWS_PENDING_MESSAGE);
  });

  it('no usa globalThis.open y crea iframe para imprimir', async () => {
    vi.mocked(platform).mockResolvedValue('windows');
    const openSpy = vi.fn((url?: string | URL, target?: string, features?: string): Window | null => {
      void url; void target; void features; return null;
    });
    const originalOpen = globalThis.open;
    globalThis.open = openSpy;

    const iframe: FakeIframe = {
      style: {},
      setAttribute: vi.fn(),
      remove: vi.fn(),
      contentDocument: { open: vi.fn(), write: vi.fn(), close: vi.fn() },
      contentWindow: { print: vi.fn(), focus: vi.fn() }
    };
    const { appendChild } = setupFakeDocument(iframe);

    await expect(exportDocumentAsPdf(createNewDocument('# Hola', 'nota.md'))).resolves.toBe(true);

    expect(openSpy).not.toHaveBeenCalled();
    expect(appendChild).toHaveBeenCalledWith(iframe);
    globalThis.open = originalOpen;
  });

  it('escribe buildPdfSourceHtml(state), llama print() y limpia iframe', async () => {
    vi.useFakeTimers();
    vi.mocked(platform).mockResolvedValue('windows');

    const doc = { open: vi.fn(), write: vi.fn(), close: vi.fn() };
    const print = vi.fn();
    const focus = vi.fn();
    const iframe: FakeIframe = { style: {}, setAttribute: vi.fn(), remove: vi.fn(), contentDocument: doc, contentWindow: { print, focus } };
    setupFakeDocument(iframe);

    const state = createNewDocument('# Hola', 'nota.md');
    await expect(exportDocumentAsPdf(state)).resolves.toBe(true);

    expect(doc.write).toHaveBeenCalledWith(buildPdfSourceHtml(state));
    expect(buildPdfSourceHtml(state)).not.toContain('code-copy-button');
    expect(focus).toHaveBeenCalledOnce();
    expect(print).toHaveBeenCalledOnce();
    vi.advanceTimersByTime(350);
    expect(iframe.remove).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });

  it('muestra error claro cuando no hay contentWindow o print', async () => {
    vi.mocked(platform).mockResolvedValue('windows');
    const iframe: FakeIframe = {
      style: {}, setAttribute: vi.fn(), remove: vi.fn(),
      contentDocument: { open: vi.fn(), write: vi.fn(), close: vi.fn() },
      contentWindow: null
    };
    setupFakeDocument(iframe);

    await expect(exportDocumentAsPdf(createNewDocument('# Hola', 'nota.md'))).rejects.toThrow('No se pudo abrir el diálogo de impresión del sistema.');
    expect(iframe.remove).toHaveBeenCalledOnce();
  });

  it('si print() falla igual programa cleanup del iframe y relanza el error original', async () => {
    vi.useFakeTimers();
    vi.mocked(platform).mockResolvedValue('windows');

    const focus = vi.fn();
    const printError = new Error('printer unavailable');
    const print = vi.fn(() => {
      throw printError;
    });
    const iframe: FakeIframe = {
      style: {},
      setAttribute: vi.fn(),
      remove: vi.fn(),
      contentDocument: { open: vi.fn(), write: vi.fn(), close: vi.fn() },
      contentWindow: { print, focus }
    };
    setupFakeDocument(iframe);

    await expect(exportDocumentAsPdf(createNewDocument('# Hola', 'nota.md'))).rejects.toThrow(printError);
    expect(focus).toHaveBeenCalledOnce();
    expect(print).toHaveBeenCalledOnce();
    expect(iframe.remove).not.toHaveBeenCalled();
    vi.advanceTimersByTime(350);
    expect(iframe.remove).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });
});
