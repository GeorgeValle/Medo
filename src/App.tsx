import { useMemo, useState } from 'react';
import styles from './App.module.css';
import { Toolbar } from './components/toolbar/Toolbar';
import { EditorPanel } from './components/editor/EditorPanel';
import { PreviewPanel } from './components/preview/PreviewPanel';
import { renderMarkdown } from './lib/markdown/renderMarkdown';
import { createNewDocument, updateDocumentContent } from './lib/documents/documentState';
import { openDocument, saveDocument, saveDocumentAs } from './lib/documents/fileSystem';

const initialContent = `# Medo\n\nBienvenido a **Medo**.\n\n- Editor Markdown\n- Preview en vivo`; 

export function App() {
  const [document, setDocument] = useState(() => createNewDocument(initialContent));
  const [error, setError] = useState<string | null>(null);

  const html = useMemo(() => renderMarkdown(document.content), [document.content]);

  const onNew = () => {
    setDocument(createNewDocument(''));
    setError(null);
  };

  const onOpen = async () => {
    try {
      const file = await openDocument();
      if (!file) return;
      setDocument({ content: file.content, path: file.path, hasUnsavedChanges: false });
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al abrir archivo.';
      console.error('Fallo en Abrir:', err);
      setError(errorMessage);
    }
  };

  const onSave = async () => {
    try {
      const saved = await saveDocument(document);
      setDocument(saved);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar archivo.';
      console.error('Fallo en Guardar:', err);
      setError(errorMessage);
    }
  };

  const onSaveAs = async () => {
    try {
      const saved = await saveDocumentAs(document);
      if (saved) {
        setDocument(saved);
      }
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar como.';
      console.error('Fallo en Guardar como:', err);
      setError(errorMessage);
    }
  };

  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <h1>Medo</h1>
      </header>
      <Toolbar onNew={onNew} onOpen={onOpen} onSave={onSave} onSaveAs={onSaveAs} />
      {error && <p className={styles.error}>{error}</p>}
      <section className={styles.workspace}>
        <EditorPanel
          value={document.content}
          onChange={(content) => setDocument((prev) => updateDocumentContent(prev, content))}
        />
        <PreviewPanel html={html} />
      </section>
    </main>
  );
}
