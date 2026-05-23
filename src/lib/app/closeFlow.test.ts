import { describe, expect, it } from 'vitest';
import { formatCloseError, needsPendingAction, nextPendingActionOnNativeClose, shouldClearDraftOnDiscard, shouldPreventNativeClose } from './closeFlow';
import { createNewDocument, updateDocumentContent } from '../documents/documentState';

describe('closeFlow', () => {
  it('permite cierre nativo sin cambios pendientes', () => {
    const shouldPrevent = shouldPreventNativeClose({
      hasUnsavedChanges: false,
      refs: { allowWindowClose: false, closeInProgress: false }
    });

    expect(shouldPrevent).toBe(false);
  });

  it('bloquea cierre nativo con cambios pendientes y arma pending close', () => {
    const shouldPrevent = shouldPreventNativeClose({
      hasUnsavedChanges: true,
      refs: { allowWindowClose: false, closeInProgress: false }
    });

    expect(shouldPrevent).toBe(true);
    expect(nextPendingActionOnNativeClose(null, true)).toBe('close');
  });

  it('mantiene pending action en cancelar', () => {
    expect(nextPendingActionOnNativeClose('open', true)).toBe('open');
  });

  it('descartar limpia borrador para close/save/new y no para open', () => {
    expect(shouldClearDraftOnDiscard('close')).toBe(true);
    expect(shouldClearDraftOnDiscard('new')).toBe(true);
    expect(shouldClearDraftOnDiscard('open')).toBe(false);
  });

  it('guardar o descartar requieren pendingAction si hay cambios pendientes', () => {
    const clean = createNewDocument('hola');
    const dirty = updateDocumentContent(clean, 'hola mundo');

    expect(needsPendingAction(dirty)).toBe(true);
    expect(needsPendingAction(clean)).toBe(false);
  });

  it('formatea error de cierre con detalle técnico para reintento', () => {
    expect(formatCloseError(new Error('window.close not allowed'))).toContain('No se pudo cerrar la app. Detalle: window.close not allowed');
  });
});
