import { describe, expect, it, vi } from 'vitest';
import {
  defaultUserPreferences,
  loadUserPreferences,
  preferencesStorageKey,
  saveUserPreferences
} from './preferences';

describe('preferences', () => {
  it('carga defaults si no existe storage', () => {
    const getItem = vi.fn(() => null);

    const result = loadUserPreferences({ getItem });

    expect(result).toEqual(defaultUserPreferences);
  });

  it('carga valores válidos', () => {
    const stored = { theme: 'dark', editorFontSize: 'large' };
    const getItem = vi.fn(() => JSON.stringify(stored));

    const result = loadUserPreferences({ getItem });

    expect(result).toEqual(stored);
  });

  it('tolera JSON inválido', () => {
    const getItem = vi.fn(() => '{bad-json');

    const result = loadUserPreferences({ getItem });

    expect(result).toEqual(defaultUserPreferences);
  });

  it('tolera campos faltantes o corruptos', () => {
    const getItem = vi.fn(() => JSON.stringify({ theme: 'invalid' }));

    const result = loadUserPreferences({ getItem });

    expect(result).toEqual(defaultUserPreferences);
  });

  it('guarda preferencias normalizadas', () => {
    const setItem = vi.fn();

    saveUserPreferences({ setItem }, { theme: 'light', editorFontSize: 'normal' });

    expect(setItem).toHaveBeenCalledWith(
      preferencesStorageKey,
      JSON.stringify({ theme: 'light', editorFontSize: 'normal' })
    );
  });

  it('no mezcla key de preferencias con borrador local', () => {
    const setItem = vi.fn();

    saveUserPreferences({ setItem }, defaultUserPreferences);

    expect(setItem).toHaveBeenCalledOnce();
    expect(setItem).toHaveBeenCalledWith(preferencesStorageKey, JSON.stringify(defaultUserPreferences));
    expect(setItem).not.toHaveBeenCalledWith('medo.localDraft.v1', expect.any(String));
  });
});
