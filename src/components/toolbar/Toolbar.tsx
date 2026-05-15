import styles from './Toolbar.module.css';

type Props = { onNew: () => void; onOpen: () => void; onSave: () => void; onSaveAs: () => void };

export function Toolbar({ onNew, onOpen, onSave, onSaveAs }: Props) {
  return (
    <div className={styles.toolbar}>
      <button onClick={onNew}>Nuevo</button>
      <button onClick={onOpen}>Abrir</button>
      <button onClick={onSave}>Guardar</button>
      <button onClick={onSaveAs}>Guardar como</button>
    </div>
  );
}
