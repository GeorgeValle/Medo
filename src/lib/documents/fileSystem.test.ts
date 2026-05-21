import { beforeEach, describe, expect, it, vi } from 'vitest';
import { save } from '@tauri-apps/plugin-dialog';
import { writeTextFile } from '@tauri-apps/plugin-fs';
import { buildSaveAsDefaultPath, saveDocumentAs } from './fileSystem';
import { createNewDocument } from './documentState';

vi.mock('@tauri-apps/plugin-dialog', () => ({ save: vi.fn() }));
vi.mock('@tauri-apps/plugin-fs', () => ({ writeTextFile: vi.fn(), readTextFile: vi.fn() }));

describe('fileSystem', () => {
  beforeEach(() => {
    vi.mocked(save).mockReset();
    vi.mocked(writeTextFile).mockReset();
  });

  it('preserva carpeta original en defaultPath para renombre (Unix)', () => {
    const state = { ...createNewDocument('hola', 'renombrado.md'), path: '/some/deep/path/note.md' };
    expect(buildSaveAsDefaultPath(state)).toBe('/some/deep/path/renombrado.md');
  });

  it('preserva carpeta original en defaultPath para renombre (Windows)', () => {
    const state = { ...createNewDocument('hola', 'renombrado.md'), path: 'C:\\MisNotas\\Proyecto\\note.md' };
    expect(buildSaveAsDefaultPath(state)).toBe('C:\\MisNotas\\Proyecto\\renombrado.md');
  });

  it('usa fallback por nombre cuando no hay path', () => {
    const state = createNewDocument('hola', 'renombrado.md');
    expect(buildSaveAsDefaultPath(state)).toBe('renombrado.md');
  });

  it('saveDocumentAs usa defaultPath sugerido preservando carpeta', async () => {
    vi.mocked(save).mockResolvedValue('/some/deep/path/renombrado.md');
    vi.mocked(writeTextFile).mockResolvedValue();
    const state = { ...createNewDocument('hola', 'renombrado.md'), path: '/some/deep/path/note.md' };

    await saveDocumentAs(state);

    expect(save).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultPath: '/some/deep/path/renombrado.md'
      })
    );
  });
});
