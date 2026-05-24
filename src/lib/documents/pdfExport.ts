import { save } from '@tauri-apps/plugin-dialog';
import { platform } from '@tauri-apps/plugin-os';
import type { DocumentState } from './documentState';
import { buildStandaloneHtmlDocument } from './htmlExport';

export const PDF_EXPORT_WINDOWS_PENDING_MESSAGE = 'Exportar PDF real está disponible inicialmente en Windows con flujo de impresión. En este sistema usá Exportar HTML o Imprimir / Guardar como PDF.';

export function buildPdfSourceHtml(state: DocumentState): string {
  return buildStandaloneHtmlDocument(state.displayName, state.content);
}

export async function requestPdfDestination(state: DocumentState): Promise<string | null> {
  return save({
    defaultPath: state.path ? state.path.replace(/\.[^/.]+$/, '.pdf') : `${(state.displayName || 'medo-note').replace(/\.[^/.]+$/, '')}.pdf`,
    filters: [{ name: 'PDF', extensions: ['pdf'] }]
  });
}

export async function exportDocumentAsPdf(state: DocumentState): Promise<boolean> {
  const destination = await requestPdfDestination(state);
  if (!destination) return false;

  const currentPlatform = await platform();
  if (currentPlatform !== 'windows') {
    throw new Error(PDF_EXPORT_WINDOWS_PENDING_MESSAGE);
  }

  const html = buildPdfSourceHtml(state);
  const printable = globalThis.open?.('', '_blank');
  if (!printable) {
    throw new Error('No se pudo abrir la vista de impresión del sistema para guardar PDF.');
  }

  printable.document.open();
  printable.document.write(html);
  printable.document.close();
  printable.focus();
  printable.print();
  return true;
}
