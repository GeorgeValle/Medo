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
