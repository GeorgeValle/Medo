export type DocumentState = {
  content: string;
  path?: string;
  displayName: string;
  hasUnsavedChanges: boolean;
  lastSavedContent: string;
};

export const UNTITLED_NAME = 'Sin título';

export function getFileNameFromPath(path: string): string {
  const segments = path.split(/[/\\]/);
  return segments[segments.length - 1] || UNTITLED_NAME;
}

export function createNewDocument(content = '', displayName = UNTITLED_NAME): DocumentState {
  return { content, path: undefined, displayName, hasUnsavedChanges: false, lastSavedContent: content };
}

export function hasDisplayNameChangesAgainstPath(state: DocumentState): boolean {
  if (!state.path) return state.displayName !== UNTITLED_NAME;
  return state.displayName !== getFileNameFromPath(state.path);
}

export function updateDocumentContent(state: DocumentState, content: string): DocumentState {
  const hasContentChanges = content !== state.lastSavedContent;
  const hasDisplayNameChanges = hasDisplayNameChangesAgainstPath(state);
  return { ...state, content, hasUnsavedChanges: hasContentChanges || hasDisplayNameChanges };
}

export function updateDocumentDisplayName(state: DocumentState, displayName: string): DocumentState {
  const normalized = displayName.trim() || UNTITLED_NAME;
  if (normalized === state.displayName) return state;
  return { ...state, displayName: normalized, hasUnsavedChanges: true };
}

export function hydrateOpenedDocument(path: string, content: string): DocumentState {
  return {
    content,
    path,
    displayName: getFileNameFromPath(path),
    hasUnsavedChanges: false,
    lastSavedContent: content
  };
}
