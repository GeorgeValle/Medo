import styles from './HelpModal.module.css';
import { userGuideSections } from '../../data/userGuide';

type HelpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} role="presentation" onClick={onClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label="Manual de uso de Medo"
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <h2>Manual de uso</h2>
          <button type="button" onClick={onClose} className={styles.closeButton} aria-label="Cerrar manual de uso">
            Cerrar
          </button>
        </header>
        <div className={styles.content}>
          {userGuideSections.map((section) => (
            <article key={section.id} className={styles.section}>
              <h3>{section.title}</h3>
              {section.description && <p className={styles.description}>{section.description}</p>}
              {section.items && (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.examples && (
                <div className={styles.examples}>
                  {section.examples.map((example) => (
                    <div key={example.title} className={styles.exampleItem}>
                      <h4>{example.title}</h4>
                      <pre>
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
