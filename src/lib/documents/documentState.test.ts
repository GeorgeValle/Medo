import { describe, expect, it } from 'vitest';
import { hasDisplayNameChangesAgainstPath, hydrateOpenedDocument, updateDocumentContent, updateDocumentDisplayName } from './documentState';

describe('documentState', () => {
  it('does not mark unsaved when display name normalization yields the same value', () => {
    const state = hydrateOpenedDocument('/tmp/nota.md', 'hola');
    const next = updateDocumentDisplayName(state, '  nota.md  ');

    expect(next).toBe(state);
    expect(next.hasUnsavedChanges).toBe(false);
  });

  it('keeps unsaved changes when display name differs even if content returns to saved value', () => {
    const opened = hydrateOpenedDocument('/tmp/nota.md', 'hola');
    const renamed = updateDocumentDisplayName(opened, 'Borrador');
    const edited = updateDocumentContent(renamed, 'hola mundo');
    const reverted = updateDocumentContent(edited, 'hola');

    expect(reverted.hasUnsavedChanges).toBe(true);
  });

  it('detects display name changes against path to trigger save as flow', () => {
    const opened = hydrateOpenedDocument('/tmp/nota.md', 'hola');
    const renamed = updateDocumentDisplayName(opened, 'renombrado.md');
    expect(hasDisplayNameChangesAgainstPath(opened)).toBe(false);
    expect(hasDisplayNameChangesAgainstPath(renamed)).toBe(true);
  });

});
