import { describe, expect, it, vi } from 'vitest';
import { flushDraftToStorage } from './draftPersistence';

describe('draftPersistence', () => {
  it('no escribe en storage cuando no hay draft', () => {
    const storage = { setItem: vi.fn() };
    flushDraftToStorage(storage, 'medo.localDraft.v1', null);
    expect(storage.setItem).not.toHaveBeenCalled();
  });

  it('serializa y escribe el draft cuando existe', () => {
    const storage = { setItem: vi.fn() };
    flushDraftToStorage(storage, 'medo.localDraft.v1', { content: '# Título', displayName: 'nota.md' });
    expect(storage.setItem).toHaveBeenCalledWith('medo.localDraft.v1', JSON.stringify({ content: '# Título', displayName: 'nota.md' }));
  });
});
