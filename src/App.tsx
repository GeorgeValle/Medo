import { useMemo, useState } from 'react';
import packageMetadata from '../package.json';
import styles from './App.module.css';
import { Toolbar } from './components/toolbar/Toolbar';
import { EditorPanel } from './components/editor/EditorPanel';
import { PreviewPanel } from './components/preview/PreviewPanel';
import { renderMarkdown } from './lib/markdown/renderMarkdown';
import { createNewDocument, updateDocumentContent } from './lib/documents/documentState';
import { openDocument, saveDocument, saveDocumentAs } from './lib/documents/fileSystem';

const initialContent = `# Medo\n\nBienvenido a **Medo**.\n\n- Editor Markdown\n- Preview en vivo`;

const aboutMetadata = {
  name: 'Medo',
  description: 'Editor Markdown de escritorio',
  author: 'George Valle',
  contact: 'georgevalle@outlook.com.ar',
  version: packageMetadata.version,
  lastUpdated: new Date().toISOString().slice(0, 10)
};

export function App() {
  const [document, setDocument] = useState(() => createNewDocument(initialContent));
  const [error, setError] = useState<string | null>(null);
  const [editorScrollProgress, setEditorScrollProgress] = useState(0);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

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
        <Toolbar onNew={onNew} onOpen={onOpen} onSave={onSave} onSaveAs={onSaveAs} onAbout={() => setIsAboutOpen(true)} />
      </header>
      {error && <p className={styles.error}>{error}</p>}
      {isAboutOpen && (
        <div className={styles.modalBackdrop} role="presentation" onClick={() => setIsAboutOpen(false)}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-label="Acerca de Medo" onClick={(event) => event.stopPropagation()}>
            <h2>Acerca</h2>
            <p><strong>Proyecto:</strong> {aboutMetadata.name}</p>
            <p><strong>Descripción:</strong> {aboutMetadata.description}</p>
            <p><strong>Autor:</strong> {aboutMetadata.author}</p>
            <p><strong>Contacto:</strong> {aboutMetadata.contact}</p>
            <p><strong>Versión:</strong> {aboutMetadata.version}</p>
            <p><strong>Última actualización:</strong> {aboutMetadata.lastUpdated}</p>
            <button onClick={() => setIsAboutOpen(false)}>Cerrar</button>
          </section>
        </div>
      )}
      <section className={styles.workspace}>
        <EditorPanel
          value={document.content}
          onChange={(content) => setDocument((prev) => updateDocumentContent(prev, content))}
          onEditorScroll={setEditorScrollProgress}
        />
        <PreviewPanel html={html} syncedScrollProgress={editorScrollProgress} />
      </section>
    </main>
  );
}
