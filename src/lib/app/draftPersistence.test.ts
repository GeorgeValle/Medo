import { describe, expect, it, vi } from 'vitest';
import { flushDraftToStorage } from './draftPersistence';

describe('draftPersistence', () => {
  it('no escribe si el draft es null', () => {
    const setItem = vi.fn();

    flushDraftToStorage({ setItem }, 'medo.localDraft.v1', null);

    expect(setItem).not.toHaveBeenCalled();
  });

  it('escribe correctamente si hay draft', () => {
    const setItem = vi.fn();
    const draft = { content: '# Medo', displayName: 'README.md' };

    flushDraftToStorage({ setItem }, 'medo.localDraft.v1', draft);

    expect(setItem).toHaveBeenCalledWith('medo.localDraft.v1', JSON.stringify(draft));
  });

  it('evita flush stale cuando el draft se limpia antes del flush', () => {
    const setItem = vi.fn();
    let latestDraft: { content: string; displayName: string } | null = { content: 'viejo', displayName: 'viejo.md' };
    const flush = () => flushDraftToStorage({ setItem }, 'medo.localDraft.v1', latestDraft);

    latestDraft = null;
    flush();

    expect(setItem).not.toHaveBeenCalled();
  });
});
