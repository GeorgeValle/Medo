import type { EditorFontSizePreference, ThemePreference } from '../../lib/app/preferences';
import styles from './PreferencesModal.module.css';

type Props = {
  open: boolean;
  theme: ThemePreference;
  editorFontSize: EditorFontSizePreference;
  onThemeChange: (theme: ThemePreference) => void;
  onEditorFontSizeChange: (size: EditorFontSizePreference) => void;
  onClose: () => void;
};

export function PreferencesModal({
  open,
  theme,
  editorFontSize,
  onThemeChange,
  onEditorFontSizeChange,
  onClose
}: Props) {
  if (!open) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label="Preferencias de Medo"
        onClick={(event) => event.stopPropagation()}
      >
        <h2>Preferencias</h2>

        <label>
          Tema
          <select value={theme} onChange={(event) => onThemeChange(event.target.value as ThemePreference)}>
            <option value="system">Sistema</option>
            <option value="dark">Oscuro</option>
            <option value="light">Claro</option>
          </select>
        </label>

        <label>
          Tamaño de fuente (editor)
          <select value={editorFontSize} onChange={(event) => onEditorFontSizeChange(event.target.value as EditorFontSizePreference)}>
            <option value="small">Pequeño</option>
            <option value="normal">Normal</option>
            <option value="large">Grande</option>
          </select>
        </label>

        <button type="button" onClick={onClose}>Cerrar</button>
      </section>
    </div>
  );
}
