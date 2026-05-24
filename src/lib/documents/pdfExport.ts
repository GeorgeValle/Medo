import { platform } from '@tauri-apps/plugin-os';
import type { DocumentState } from './documentState';
import { buildStandaloneHtmlDocument } from './htmlExport';

export const PDF_EXPORT_WINDOWS_PENDING_MESSAGE = 'Exportar PDF real está disponible inicialmente en Windows con flujo de impresión. En este sistema usá Exportar HTML o Imprimir / Guardar como PDF.';
const PRINT_DIALOG_ERROR_MESSAGE = 'No se pudo abrir el diálogo de impresión del sistema.';
const IFRAME_CLEANUP_DELAY_MS = 350;

export function buildPdfSourceHtml(state: DocumentState): string {
  return buildStandaloneHtmlDocument(state.displayName, state.content);
}

function createPrintFrame(html: string): HTMLIFrameElement {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('aria-hidden', 'true');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.visibility = 'hidden';
  document.body.appendChild(iframe);

  const frameDoc = iframe.contentDocument;
  if (!frameDoc) {
    iframe.remove();
    throw new Error(PRINT_DIALOG_ERROR_MESSAGE);
  }

  frameDoc.open();
  frameDoc.write(html);
  frameDoc.close();
  return iframe;
}

function cleanupFrame(iframe: HTMLIFrameElement): void {
  globalThis.setTimeout(() => {
    iframe.remove();
  }, IFRAME_CLEANUP_DELAY_MS);
}

export async function exportDocumentAsPdf(state: DocumentState): Promise<boolean> {
  const currentPlatform = await platform();
  if (currentPlatform !== 'windows') {
    throw new Error(PDF_EXPORT_WINDOWS_PENDING_MESSAGE);
  }

  const html = buildPdfSourceHtml(state);
  const iframe = createPrintFrame(html);
  const printWindow = iframe.contentWindow;

  if (!printWindow || typeof printWindow.print !== 'function') {
    iframe.remove();
    throw new Error(PRINT_DIALOG_ERROR_MESSAGE);
  }

  printWindow.focus();
  printWindow.print();
  cleanupFrame(iframe);
  return true;
}
