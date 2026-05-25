export const preferencesStorageKey = 'medo.preferences.v1';

export type ThemePreference = 'system' | 'dark' | 'light';
export type EditorFontSizePreference = 'small' | 'normal' | 'large';

export type UserPreferences = {
  theme: ThemePreference;
  editorFontSize: EditorFontSizePreference;
};

export const defaultUserPreferences: UserPreferences = {
  theme: 'system',
  editorFontSize: 'normal'
};

function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'system' || value === 'dark' || value === 'light';
}

function isEditorFontSizePreference(value: unknown): value is EditorFontSizePreference {
  return value === 'small' || value === 'normal' || value === 'large';
}

export function normalizeUserPreferences(input: unknown): UserPreferences {
  if (!input || typeof input !== 'object') {
    return defaultUserPreferences;
  }

  const partial = input as Partial<UserPreferences>;

  return {
    theme: isThemePreference(partial.theme) ? partial.theme : defaultUserPreferences.theme,
    editorFontSize: isEditorFontSizePreference(partial.editorFontSize) ? partial.editorFontSize : defaultUserPreferences.editorFontSize
  };
}

export function loadUserPreferences(storage: Pick<Storage, 'getItem'>, key = preferencesStorageKey): UserPreferences {
  const raw = storage.getItem(key);
  if (!raw) return defaultUserPreferences;

  try {
    const parsed = JSON.parse(raw) as unknown;
    return normalizeUserPreferences(parsed);
  } catch {
    return defaultUserPreferences;
  }
}

export function saveUserPreferences(
  storage: Pick<Storage, 'setItem'>,
  preferences: UserPreferences,
  key = preferencesStorageKey
): void {
  const normalized = normalizeUserPreferences(preferences);
  storage.setItem(key, JSON.stringify(normalized));
}
