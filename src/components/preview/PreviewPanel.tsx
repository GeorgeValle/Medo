import styles from './PreviewPanel.module.css';

export function PreviewPanel({ html }: { html: string }) {
  return <section className={styles.panel}><h2>Vista previa</h2><article className={styles.preview} dangerouslySetInnerHTML={{ __html: html }} /></section>;
}
