import type { DocumentState } from '../documents/documentState';

type PendingAction = null | 'new' | 'open' | 'close';

export type CloseRefs = {
  allowWindowClose: boolean;
  closeInProgress: boolean;
};

export const CLOSE_PERMISSION = 'core:window:allow-close';

export function shouldPreventNativeClose(params: { hasUnsavedChanges: boolean; refs: CloseRefs }): boolean {
  if (params.refs.allowWindowClose) return false;
  if (params.refs.closeInProgress) return true;
  return params.hasUnsavedChanges;
}

export function nextPendingActionOnNativeClose(current: PendingAction, hasUnsavedChanges: boolean): PendingAction {
  if (!hasUnsavedChanges) return current;
  return current ?? 'close';
}

export function formatCloseError(error: unknown): string {
  const detail = error instanceof Error ? error.message : String(error);
  return `No se pudo cerrar la app. Detalle: ${detail}`;
}

export function shouldClearDraftOnDiscard(action: Exclude<PendingAction, null>): boolean {
  return action !== 'open';
}

export function needsPendingAction(document: DocumentState): boolean {
  return document.hasUnsavedChanges;
}
