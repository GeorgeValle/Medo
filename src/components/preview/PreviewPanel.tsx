import { Save, SaveOff } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import styles from './PreviewPanel.module.css';

type CopyStatus = 'idle' | 'copied' | 'error';

const copyStatusText: Record<CopyStatus, string> = {
  idle: 'Copiar',
  copied: 'Copiado',
  error: 'Error al copiar'
};

function setCopyButtonStatus(button: HTMLButtonElement, status: CopyStatus) {
  const label = copyStatusText[status];
  button.dataset.status = status;
  button.ariaLabel = label;
  button.title = label;

  const tooltip = button.querySelector<HTMLElement>('.codeCopyTooltip');
  if (tooltip) {
    tooltip.textContent = label;
  }
}

export function PreviewPanel({
  html,
  syncedScrollProgress,
  displayName,
  hasUnsavedChanges,
  onDisplayNameChange
}: { html: string; syncedScrollProgress: number; displayName: string; hasUnsavedChanges: boolean; onDisplayNameChange: (name: string) => void }) {
  const previewRef = useRef<HTMLElement | null>(null);
  const isSyncingRef = useRef(false);
  const resetTimersRef = useRef(new WeakMap<HTMLButtonElement, number>());
  const [isEditingName, setIsEditingName] = useState(false);
  const [draftName, setDraftName] = useState(displayName);

  useEffect(() => setDraftName(displayName), [displayName]);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    const maxScroll = preview.scrollHeight - preview.clientHeight;
    isSyncingRef.current = true;
    preview.scrollTop = maxScroll <= 0 ? 0 : maxScroll * syncedScrollProgress;
    requestAnimationFrame(() => {
      isSyncingRef.current = false;
    });
  }, [syncedScrollProgress, html]);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    const onClick = async (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest('button.codeCopyButton') as HTMLButtonElement | null;
      if (!button) return;
      const rawCode = button.dataset.code;
      if (!rawCode) return;
      const currentTimer = resetTimersRef.current.get(button);
      if (currentTimer) window.clearTimeout(currentTimer);
      const decoded = rawCode.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
      try {
        if (!navigator?.clipboard?.writeText) throw new Error('Clipboard API no disponible');
        await navigator.clipboard.writeText(decoded);
        setCopyButtonStatus(button, 'copied');
      } catch {
        setCopyButtonStatus(button, 'error');
      }
      const resetTimer = window.setTimeout(() => {
        setCopyButtonStatus(button, 'idle');
        resetTimersRef.current.delete(button);
      }, 1200);
      resetTimersRef.current.set(button, resetTimer);
    };

    preview.addEventListener('click', onClick);
    return () => preview.removeEventListener('click', onClick);
  }, [html]);

  const commitName = () => {
    onDisplayNameChange(draftName);
    setIsEditingName(false);
  };

  const onNameKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setIsEditingName(true);
    }
  };

  return (
    <section className={styles.panel}>
      <h2>Vista previa</h2>
      <div className={styles.documentStatus}>
        {isEditingName ? (
          <input
            className={styles.fileNameInput}
            value={draftName}
            onChange={(event) => setDraftName(event.target.value)}
            onBlur={commitName}
            onKeyDown={(event) => {
              if (event.key === 'Enter') commitName();
              if (event.key === 'Escape') {
                setDraftName(displayName);
                setIsEditingName(false);
              }
            }}
            autoFocus
            aria-label='Editar nombre del documento'
          />
        ) : (
          <button type='button' className={styles.fileNameLabel} title={displayName} onClick={() => setIsEditingName(true)} onKeyDown={onNameKeyDown}>
            {displayName}
          </button>
        )}
        <div className={styles.saveStatus} aria-label={hasUnsavedChanges ? 'Sin guardar' : 'Guardado'}>
          {hasUnsavedChanges ? <SaveOff size={14} /> : <Save size={14} />}
          <span>{hasUnsavedChanges ? 'Sin guardar' : 'Guardado'}</span>
        </div>
      </div>
      <article ref={previewRef} className={styles.preview} dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}
