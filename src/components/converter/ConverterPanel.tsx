import { useState } from 'react';
import styles from './ConverterPanel.module.css';
import { convertTxtToMarkdown } from '../../lib/txt-to-md/convertTxtToMarkdown';

export function ConverterPanel({ onApply }: { onApply: (content: string) => void }) {
  const [txt, setTxt] = useState('Titulo\n\nTexto plano para convertir.');
  return (
    <section className={styles.panel}>
      <h2>Conversor TXT → MD</h2>
      <textarea value={txt} onChange={(e) => setTxt(e.target.value)} className={styles.textarea} />
      <button onClick={() => onApply(convertTxtToMarkdown(txt))}>Convertir y aplicar</button>
    </section>
  );
}
