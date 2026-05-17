import { useEffect, useRef } from 'react';
import styles from './PreviewPanel.module.css';

export function PreviewPanel({ html, syncedScrollProgress }: { html: string; syncedScrollProgress: number }) {
  const previewRef = useRef<HTMLElement | null>(null);
  const isSyncingRef = useRef(false);

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
        button.textContent = 'Copiado';
      } catch {
        button.textContent = 'Error';
      }

      window.setTimeout(() => {
        button.textContent = 'Copiar';
      }, 1200);
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
