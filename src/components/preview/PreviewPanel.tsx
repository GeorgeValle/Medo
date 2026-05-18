import { useEffect, useRef } from 'react';
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

export function PreviewPanel({ html, syncedScrollProgress }: { html: string; syncedScrollProgress: number }) {
  const previewRef = useRef<HTMLElement | null>(null);
  const isSyncingRef = useRef(false);
  const resetTimersRef = useRef(new WeakMap<HTMLButtonElement, number>());

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
      if (currentTimer) {
        window.clearTimeout(currentTimer);
      }

      const decoded = rawCode
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');

      try {
        if (!navigator?.clipboard?.writeText) {
          throw new Error('Clipboard API no disponible');
        }
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

  return (
    <section className={styles.panel}>
      <h2>Vista previa</h2>
      <article
        ref={previewRef}
        className={styles.preview}
        onScroll={() => {
          if (!isSyncingRef.current) {
            // Manual scrolling stays enabled; this guard only avoids local sync jitter.
            isSyncingRef.current = false;
          }
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}
