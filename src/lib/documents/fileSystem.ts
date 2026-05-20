import { open, save } from '@tauri-apps/plugin-dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import type { DocumentState } from './documentState';
import { getFileNameFromPath } from './documentState';

function buildError(prefix: string, error: unknown): Error {
  const detail = error instanceof Error ? error.message : String(error);
  return new Error(`${prefix} Detalle: ${detail}`);
}

export async function openDocument(): Promise<{ path: string; content: string } | null> {
  try {
    const selected = await open({ multiple: false, filters: [{ name: 'Texto', extensions: ['md', 'txt'] }] });
    if (!selected || Array.isArray(selected)) return null;
    const content = await readTextFile(selected);
    return { path: selected, content };
  } catch (error) {
    throw buildError('Error al abrir archivo.', error);
  }
}

export async function saveDocument(state: DocumentState): Promise<DocumentState> {
  if (!state.path) {
    const saved = await saveDocumentAs(state);
    if (!saved) throw new Error('Guardado cancelado.');
    return saved;
  }

  try {
    await writeTextFile(state.path, state.content);
    return {
      ...state,
      displayName: getFileNameFromPath(state.path),
      hasUnsavedChanges: false,
      lastSavedContent: state.content
    };
  } catch (error) {
    throw buildError('Error al guardar archivo.', error);
  }
}

export async function saveDocumentAs(state: DocumentState): Promise<DocumentState | null> {
  const fallbackName = `${state.displayName || 'medo-note'}`.replace(/\.[^/.]+$/, '');
  const selected = await save({ defaultPath: state.path ?? `${fallbackName}.md`, filters: [{ name: 'Markdown', extensions: ['md'] }] });
  if (!selected) return null;

  try {
    await writeTextFile(selected, state.content);
    return {
      ...state,
      path: selected,
      displayName: getFileNameFromPath(selected),
      hasUnsavedChanges: false,
      lastSavedContent: state.content
    };
  } catch (error) {
    throw buildError('Error al guardar como.', error);
  }
}
