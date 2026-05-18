import { useEffect, useRef, useState } from 'react';
import styles from './Toolbar.module.css';

type Props = { onNew: () => void; onOpen: () => void; onSave: () => void; onSaveAs: () => void; onAbout: () => void };

type MenuAction = { label: string; onSelect: () => void };

export function Toolbar({ onNew, onOpen, onSave, onSaveAs, onAbout }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const actions: MenuAction[] = [
    { label: 'Nuevo', onSelect: onNew },
    { label: 'Abrir', onSelect: onOpen },
    { label: 'Guardar', onSelect: onSave },
    { label: 'Guardar como', onSelect: onSaveAs },
    { label: 'Acerca', onSelect: onAbout }
  ];

  useEffect(() => {
    if (!isOpen) return;

    const onDocumentPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', onDocumentPointerDown);
    document.addEventListener('keydown', onDocumentKeyDown);

    return () => {
      document.removeEventListener('pointerdown', onDocumentPointerDown);
      document.removeEventListener('keydown', onDocumentKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (action: () => void) => {
    setIsOpen(false);
    action();
  };

  return (
    <div className={styles.toolbar} ref={containerRef}>
      <button
        type="button"
        className={styles.menuButton}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Medo <span aria-hidden="true">▾</span>
      </button>
      {isOpen && (
        <div className={styles.menu} role="menu" aria-label="Opciones de Medo">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              className={styles.menuItem}
              role="menuitem"
              onClick={() => handleSelect(action.onSelect)}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
