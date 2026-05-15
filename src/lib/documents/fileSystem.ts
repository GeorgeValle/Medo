import { open, save } from '@tauri-apps/plugin-dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import type { DocumentState } from './documentState';

export async function openDocument(): Promise<{ path: string; content: string } | null> {
  const selected = await open({ multiple: false, filters: [{ name: 'Texto', extensions: ['md', 'txt'] }] });
  if (!selected || Array.isArray(selected)) return null;
  const content = await readTextFile(selected);
  return { path: selected, content };
}

export async function saveDocument(state: DocumentState): Promise<DocumentState> {
  if (!state.path) {
    const saved = await saveDocumentAs(state);
    if (!saved) throw new Error('Guardado cancelado.');
    return saved;
  }
  await writeTextFile(state.path, state.content);
  return { ...state, hasUnsavedChanges: false };
}

export async function saveDocumentAs(state: DocumentState): Promise<DocumentState | null> {
  const selected = await save({ defaultPath: state.path ?? 'medo-note.md', filters: [{ name: 'Markdown', extensions: ['md'] }] });
  if (!selected) return null;
  await writeTextFile(selected, state.content);
  return { ...state, path: selected, hasUnsavedChanges: false };
}
