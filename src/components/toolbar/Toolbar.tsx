import styles from './Toolbar.module.css';

type Props = { onNew: () => void; onOpen: () => void; onSave: () => void; onSaveAs: () => void; onAbout: () => void };

export function Toolbar({ onNew, onOpen, onSave, onSaveAs, onAbout }: Props) {
  return (
    <div className={styles.toolbar}>
      <button onClick={onNew}>Nuevo</button>
      <button onClick={onOpen}>Abrir</button>
      <button onClick={onSave}>Guardar</button>
      <button onClick={onSaveAs}>Guardar como</button>
      <button onClick={onAbout}>Acerca</button>
    </div>
  );
}
