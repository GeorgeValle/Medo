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

export function updateDocumentContent(state: DocumentState, content: string): DocumentState {
  const hasContentChanges = content !== state.lastSavedContent;
  const savedDisplayName = state.path ? getFileNameFromPath(state.path) : UNTITLED_NAME;
  const hasDisplayNameChanges = state.displayName !== savedDisplayName;
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
