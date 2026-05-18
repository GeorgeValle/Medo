import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import styles from './Toolbar.module.css';

type Props = { onNew: () => void; onOpen: () => void; onSave: () => void; onSaveAs: () => void; onAbout: () => void };

type MenuAction = { label: string; onSelect: () => void };

export function Toolbar({ onNew, onOpen, onSave, onSaveAs, onAbout }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const actions: MenuAction[] = [
    { label: 'Nuevo', onSelect: onNew },
    { label: 'Abrir', onSelect: onOpen },
    { label: 'Guardar', onSelect: onSave },
    { label: 'Guardar como', onSelect: onSaveAs },
    { label: 'Acerca', onSelect: onAbout }
  ];

  const focusItem = (index: number) => {
    itemRefs.current[index]?.focus();
  };

  const openMenu = (focusFirstItem = false) => {
    setIsOpen(true);
    if (focusFirstItem) {
      requestAnimationFrame(() => {
        focusItem(0);
      });
    }
  };

  const closeMenu = (focusButton = false) => {
    setIsOpen(false);
    if (focusButton) {
      requestAnimationFrame(() => {
        buttonRef.current?.focus();
      });
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const onDocumentPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const onDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu(true);
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
    closeMenu();
    action();
  };

  const handleButtonKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!isOpen) {
        openMenu(true);
        return;
      }
      focusItem(0);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (isOpen) {
        focusItem(0);
        return;
      }
      openMenu(true);
    }
  };

  const handleItemKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = actions.length - 1;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusItem(index === lastIndex ? 0 : index + 1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusItem(index === 0 ? lastIndex : index - 1);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      focusItem(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      focusItem(lastIndex);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu(true);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect(actions[index].onSelect);
    }
  };

  return (
    <div className={styles.toolbar} ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.menuButton}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        onKeyDown={handleButtonKeyDown}
      >
        <span className={styles.brandMark} aria-hidden="true">
          M
        </span>
        <span className={styles.brandText}>Medo</span>
        <span className={styles.chevron} aria-hidden="true">
          ▾
        </span>
      </button>
      {isOpen && (
        <div className={styles.menu} role="menu" aria-label="Opciones de Medo">
          {actions.map((action, index) => (
            <button
              key={action.label}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              type="button"
              className={`${styles.menuItem} ${action.label === 'Acerca' ? styles.menuItemAbout : ''}`}
              role="menuitem"
              onClick={() => handleSelect(action.onSelect)}
              onKeyDown={(event) => handleItemKeyDown(event, index)}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
