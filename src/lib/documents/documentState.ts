export type DocumentState = {
  content: string;
  path?: string;
  hasUnsavedChanges: boolean;
};

export function createNewDocument(content = ''): DocumentState {
  return { content, path: undefined, hasUnsavedChanges: false };
}

export function updateDocumentContent(state: DocumentState, content: string): DocumentState {
  return { ...state, content, hasUnsavedChanges: true };
}
