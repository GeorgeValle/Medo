import { useEffect, useMemo, useRef, useState } from 'react';
import { platform } from '@tauri-apps/plugin-os';
import { openUrl } from '@tauri-apps/plugin-opener';
import { getCurrentWindow } from '@tauri-apps/api/window';
import packageMetadata from '../package.json';
import styles from './App.module.css';
import { Toolbar } from './components/toolbar/Toolbar';
import { EditorPanel } from './components/editor/EditorPanel';
import { PreviewPanel } from './components/preview/PreviewPanel';
import { renderMarkdown } from './lib/markdown/renderMarkdown';
import { UNTITLED_NAME, createNewDocument, hydrateOpenedDocument, updateDocumentContent, updateDocumentDisplayName } from './lib/documents/documentState';
import { openDocument, saveDocument, saveDocumentAs } from './lib/documents/fileSystem';
import { exportDocumentAsHtml } from './lib/documents/htmlExport';
import logo from './assets/brand/medo-logo.png';
import { changelogEntries } from './data/changelog';

type AboutTab = 'acerca' | 'novedades' | 'reportar' | 'creditos';

const initialContent = `# Medo\n\nBienvenido a **Medo**.\n\n- Editor Markdown\n- Preview en vivo`;
const appVersion = packageMetadata.version;
const githubRepoUrl = 'https://github.com/GeorgeValle/Medo';
const aboutEmail = 'georgevalle@outlook.com.ar';
const draftStorageKey = 'medo.localDraft.v1';
type PendingAction = null | 'new' | 'open' | 'close';

export function App() {
  const [document, setDocument] = useState(() => createNewDocument(initialContent));
  const [error, setError] = useState<string | null>(null);
  const [editorScrollProgress, setEditorScrollProgress] = useState(0);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [activeAboutTab, setActiveAboutTab] = useState<AboutTab>('acerca');
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [issueSteps, setIssueSteps] = useState('');
  const [issueExpected, setIssueExpected] = useState('');
  const [issueObtained, setIssueObtained] = useState('');
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const allowWindowCloseRef = useRef(false);

  const html = useMemo(() => renderMarkdown(document.content), [document.content]);

  const clearDraft = () => localStorage.removeItem(draftStorageKey);

  useEffect(() => {
    const rawDraft = localStorage.getItem(draftStorageKey);
    if (!rawDraft) return;
    try {
      const draft = JSON.parse(rawDraft) as { content?: string; displayName?: string };
      if (!draft.content) return;
      if (window.confirm('Se encontró un borrador local sin guardar. ¿Querés recuperarlo?')) {
        setDocument({ content: draft.content, path: undefined, displayName: draft.displayName || UNTITLED_NAME, hasUnsavedChanges: true, lastSavedContent: '' });
      } else {
        clearDraft();
      }
    } catch { clearDraft(); }
  }, []);

  useEffect(() => {
    if (!document.hasUnsavedChanges) {
      clearDraft();
      return;
    }
    const id = window.setTimeout(() => localStorage.setItem(draftStorageKey, JSON.stringify({ content: document.content, displayName: document.displayName })), 1000);
    return () => window.clearTimeout(id);
  }, [document.content, document.displayName, document.hasUnsavedChanges]);


  useEffect(() => {
    let unlisten: (() => void) | undefined;
    const setupCloseGuard = async () => {
      unlisten = await getCurrentWindow().onCloseRequested((event) => {
        if (allowWindowCloseRef.current || !document.hasUnsavedChanges) return;
        event.preventDefault();
        setPendingAction('close');
      });
    };
    void setupCloseGuard();
    return () => {
      if (unlisten) unlisten();
    };
  }, [document.hasUnsavedChanges]);

  const proceedAction = async (action: Exclude<PendingAction, null>) => {
    if (action === 'new') { setDocument(createNewDocument('', UNTITLED_NAME)); clearDraft(); return; }
    if (action === 'open') {
      const file = await openDocument();
      if (!file) return;
      setDocument(hydrateOpenedDocument(file.path, file.content));
      clearDraft();
      return;
    }
    if (action === 'close') {
      allowWindowCloseRef.current = true;
      try {
        await getCurrentWindow().close();
      } catch (error) {
        allowWindowCloseRef.current = false;
        throw error;
      }
    }
  };

  const requestAction = async (action: Exclude<PendingAction, null>) => {
    if (document.hasUnsavedChanges) { setPendingAction(action); return; }
    await proceedAction(action);
  };

  const onNew = () => { void requestAction('new'); setError(null); };

  const onOpen = async () => {
    try { await requestAction('open'); setError(null); } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al abrir archivo.';
      setError(errorMessage);
    }
  };

  const onSave = async () => {
    try { const saved = await saveDocument(document); setDocument(saved); clearDraft(); setError(null); } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar archivo.';
      setError(errorMessage);
    }
  };

  const onSaveAs = async () => {
    try { const saved = await saveDocumentAs(document); if (saved) { setDocument(saved); clearDraft(); } setError(null); } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar como.';
      setError(errorMessage);
    }
  };


  const onExportHtml = async () => {
    try {
      const exported = await exportDocumentAsHtml(document);
      if (!exported) {
        setError(null);
        return;
      }
      setError(null);
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      setError(`Error al exportar HTML. Detalle: ${detail}`);
    }
  };

  const resolvePendingAction = async (decision: 'save' | 'discard' | 'cancel') => {
    const action = pendingAction;
    setPendingAction(null);
    if (!action || decision === 'cancel') return;
    if (decision === 'save') {
      try {
        const saved = await saveDocument(document);
        setDocument(saved);
        clearDraft();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al guardar archivo.');
        return;
      }
    }
    if (decision === 'discard' && action !== 'open') clearDraft();
    await proceedAction(action);
  };
  const closeAbout = () => {
    setIsAboutOpen(false);
    setActiveAboutTab('acerca');
  };

  const buildIssueBody = async () => {
    const currentPlatform = await platform();
    return [
      `Versión: ${appVersion}`,
      `Sistema: ${currentPlatform}`,
      'App: Medo',
      'Stack: Tauri 2 + React',
      '',
      '## Descripción',
      issueDescription || '(completar)',
      '',
      '## Pasos para reproducir',
      issueSteps || '(completar)',
      '',
      '## Resultado esperado',
      issueExpected || '(completar)',
      '',
      '## Resultado obtenido',
      issueObtained || '(completar)'
    ].join('\n');
  };

  const onOpenGithubIssue = async () => {
    try {
      const body = await buildIssueBody();
      const issueUrl = `${githubRepoUrl}/issues/new?title=${encodeURIComponent(issueTitle || 'Reporte de problema en Medo')}&body=${encodeURIComponent(body)}`;
      await openUrl(issueUrl);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'No se pudo abrir GitHub Issues.';
      console.error('Fallo al abrir reporte en GitHub:', err);
      setError(errorMessage);
    }
  };

  const onCopyDiagnostics = async () => {
    try {
      const currentPlatform = await platform();
      const diagnostics = [
        `Medo versión: ${appVersion}`,
        `Plataforma: ${currentPlatform}`,
        'App: Medo',
        'Stack: Tauri 2 + React'
      ].join('\n');
      if (!navigator?.clipboard?.writeText) {
        throw new Error('Clipboard API no disponible');
      }
      await navigator.clipboard.writeText(diagnostics);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'No se pudieron copiar datos de diagnóstico.';
      console.error('Fallo al copiar diagnóstico:', err);
      setError(errorMessage);
    }
  };

  return (
    <main className={styles.app}>
      <div className={styles.topDivider} aria-hidden="true" />
      {error && <p className={styles.error}>{error}</p>}
      {pendingAction && (
        <div className={styles.modalBackdrop} role='presentation'>
          <section className={styles.modal} role='dialog' aria-modal='true' aria-label='Cambios sin guardar'>
            <h2>Tenés cambios sin guardar. ¿Querés guardarlos antes de continuar?</h2>
            <div className={styles.reportActions}>
              <button type='button' onClick={() => void resolvePendingAction('save')}>Guardar</button>
              <button type='button' onClick={() => void resolvePendingAction('discard')}>Descartar</button>
              <button type='button' onClick={() => void resolvePendingAction('cancel')}>Cancelar</button>
            </div>
          </section>
        </div>
      )}
      {isAboutOpen && (
        <div className={styles.modalBackdrop} role="presentation" onClick={closeAbout}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-label="Acerca de Medo" onClick={(event) => event.stopPropagation()}>
            <h2>Acerca de Medo</h2>
            <div className={styles.tabs} role="tablist" aria-label="Secciones del modal Acerca de Medo">
              {[
                { id: 'acerca', label: 'Acerca de' },
                { id: 'novedades', label: 'Novedades' },
                { id: 'reportar', label: 'Reportar problema' },
                { id: 'creditos', label: 'Créditos' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeAboutTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  className={`${styles.tabButton} ${activeAboutTab === tab.id ? styles.tabButtonActive : ''}`}
                  onClick={() => setActiveAboutTab(tab.id as AboutTab)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className={styles.tabPanel} role="tabpanel" id={`panel-${activeAboutTab}`} aria-labelledby={`tab-${activeAboutTab}`}>
              {activeAboutTab === 'acerca' && (
                <div className={styles.aboutGrid}>
                  <img src={logo} className={styles.aboutLogo} alt="Logo de Medo" />
                  <p><strong>App:</strong> Medo</p>
                  <p><strong>Versión:</strong> {appVersion}</p>
                  <p><strong>Descripción:</strong> Editor Markdown de escritorio</p>
                  <p><strong>Desarrollador:</strong> George Valle</p>
                  <p><strong>Email:</strong> {aboutEmail}</p>
                  <p><strong>Stack:</strong> Tauri 2 + React</p>
                  <p><strong>Repositorio:</strong> <a href={githubRepoUrl} onClick={(event) => { event.preventDefault(); void openUrl(githubRepoUrl); }}>github.com/GeorgeValle/Medo</a></p>
                </div>
              )}
              {activeAboutTab === 'novedades' && (
                <div className={styles.changelogList}>
                  {changelogEntries.map((entry) => (
                    <article key={entry.version} className={styles.changelogItem}>
                      <h3>{entry.version} · {entry.date} - {entry.title}</h3>
                      <ul>
                        {entry.changes.map((change) => (
                          <li key={change}>{change}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              )}
              {activeAboutTab === 'reportar' && (
                <div className={styles.reportForm}>
                  <label>Título del problema<input value={issueTitle} onChange={(event) => setIssueTitle(event.target.value)} /></label>
                  <label>Descripción<textarea value={issueDescription} onChange={(event) => setIssueDescription(event.target.value)} /></label>
                  <label>Pasos para reproducir<textarea value={issueSteps} onChange={(event) => setIssueSteps(event.target.value)} /></label>
                  <label>Resultado esperado<textarea value={issueExpected} onChange={(event) => setIssueExpected(event.target.value)} /></label>
                  <label>Resultado obtenido<textarea value={issueObtained} onChange={(event) => setIssueObtained(event.target.value)} /></label>
                  <div className={styles.reportActions}>
                    <button type="button" onClick={() => void onOpenGithubIssue()}>Abrir reporte en GitHub</button>
                    <button type="button" onClick={() => void onCopyDiagnostics()}>Copiar datos de diagnóstico</button>
                  </div>
                </div>
              )}
              {activeAboutTab === 'creditos' && (
                <div className={styles.credits}>
                  <section>
                    <h3>Primer agradecimiento</h3>
                    <p>A GPT-5.5 Thinking y a Codex Cloud, con los cuales se creó esta app desde un celular como experimento exitoso.</p>
                  </section>
                  <section>
                    <h3>Segundo agradecimiento</h3>
                    <blockquote>26 Todo el dominio de mi reino todos teman y tiemblen ante la presencia del Dios de Daniel; porque él es el Dios viviente y permanece por todos los siglos, y su reino no será jamás destruido, y su dominio perdurará hasta el fin. 27 Él salva y libra, y hace señales y maravillas en el cielo y en la tierra; él ha librado a Daniel del poder de los leones.</blockquote>
                    <p>Darío, el Medo.<br />Monarca del Imperio Medo-Persa.<br />Cita de Daniel 6:26-27.</p>
                  </section>
                  <section>
                    <h3>Tercer agradecimiento</h3>
                    <p>Al Dios Padre que hizo el Cielo y la Tierra, y a su Hijo, Rey de Reyes y Señor de Señores, junto al Santo Espíritu.</p>
                  </section>
                </div>
              )}
            </div>
            <button type="button" onClick={closeAbout}>Cerrar</button>
          </section>
        </div>
      )}
      <section className={styles.workspace}>
        <EditorPanel
          value={document.content}
          onChange={(content) => setDocument((prev) => updateDocumentContent(prev, content))}
          onEditorScroll={setEditorScrollProgress}
          headerMenu={<Toolbar onNew={onNew} onOpen={onOpen} onSave={onSave} onSaveAs={onSaveAs} onExportHtml={() => { void onExportHtml(); }} onAbout={() => setIsAboutOpen(true)} />}
        />
        <PreviewPanel html={html} syncedScrollProgress={editorScrollProgress} displayName={document.displayName} hasUnsavedChanges={document.hasUnsavedChanges} onDisplayNameChange={(name) => setDocument((prev) => updateDocumentDisplayName(prev, name))} />
      </section>
      <div className={styles.bottomDivider} aria-hidden="true" />
    </main>
  );
}
