import type { DocumentState } from './documentState';
import { buildStandaloneHtmlDocument } from './htmlExport';

export const PDF_EXPORT_NOT_AVAILABLE_MESSAGE = 'La exportación PDF real aún no está disponible en esta versión. Próximo paso: integrar impresión a PDF nativa compatible con Tauri 2 usando el HTML limpio exportable.';

export function buildPdfSourceHtml(state: DocumentState): string {
  return buildStandaloneHtmlDocument(state.displayName, state.content);
}

export async function exportDocumentAsPdf(_state: DocumentState): Promise<never> {
  throw new Error(PDF_EXPORT_NOT_AVAILABLE_MESSAGE);
}
