import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { EditorSelection, EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';
import {
  Bold,
  Columns3,
  CornerDownRight,
  Code,
  FileCode2,
  GitBranch,
  GitFork,
  Image,
  Italic,
  Strikethrough,
  Link,
  Minus,
  Quote,
  Rows3,
  Table
} from 'lucide-react';
import styles from './EditorPanel.module.css';
import { applyMarkdownFormat, type MarkdownFormatAction } from '../../lib/markdown/applyMarkdownFormat';
import type { EditorFontSizePreference } from '../../lib/app/preferences';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onEditorScroll?: (progress: number) => void;
  headerMenu?: ReactNode;
  editorFontSize?: EditorFontSizePreference;
};

const editorTheme = EditorView.theme({
  '&': { height: '100%' },
  '.cm-content, .cm-gutters': { backgroundColor: 'var(--color-editor-bg)', color: 'var(--color-editor-text)' },
  '.cm-content': { caretColor: 'var(--color-focus)' },
  '.cm-cursor': { borderLeftColor: 'var(--color-focus)', borderLeftWidth: '2px' },
  '.cm-dropCursor': { borderLeftColor: '#ffffff', borderLeftWidth: '2px' },
  '&.cm-focused .cm-cursor': { borderLeftColor: 'var(--color-focus)' },
  '&.cm-focused': { outline: '1px solid var(--color-focus)' },
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection': { backgroundColor: 'rgba(250, 204, 21, 0.3)' },
  '.cm-scroller': { overflow: 'auto', maxWidth: '100%' }
});

const headingOptions: Array<{ label: string; value: MarkdownFormatAction }> = [
  { label: 'Texto normal', value: 'h0' },
  { label: 'Título principal / H1', value: 'h1' },
  { label: 'Título / H2', value: 'h2' },
  { label: 'Subtítulo / H3', value: 'h3' }
];

const listOptions: Array<{ label: string; value: MarkdownFormatAction | 'none' }> = [
  { label: 'Lista', value: 'none' },
  { label: '- Lista desordenada', value: 'bulletList' },
  { label: '1. Lista numérica', value: 'numberedList' },
  { label: 'a. Lista alfabética', value: 'alphaList' },
  { label: '[ ] Checklist', value: 'checkList' }
];

function continueAlphaListOnEnter(view: EditorView): boolean {
  const range = view.state.selection.main;
  if (!range.empty) return false;
  const line = view.state.doc.lineAt(range.from);
  const beforeCursor = line.text.slice(0, range.from - line.from);
  const match = beforeCursor.match(/^(\s*)([a-zA-Z])\.\s+(.+)$/);
  if (!match) return false;
  const current = match[2].toLowerCase().charCodeAt(0);
  if (current < 97 || current >= 122) return false;
  const next = String.fromCharCode(current + 1);
  const insert = `\n${match[1]}${next}. `;
  view.dispatch(view.state.replaceSelection(insert));
  return true;
}

const iconButtons: Array<{ label: string; action: MarkdownFormatAction; icon: typeof Bold }> = [
  { label: 'Negrita', action: 'bold', icon: Bold },
  { label: 'Cursiva', action: 'italic', icon: Italic },
  { label: 'Tachado', action: 'strikethrough', icon: Strikethrough },
  { label: 'Enlace', action: 'link', icon: Link },
  { label: 'Imagen', action: 'image', icon: Image },
  { label: 'Cita', action: 'quote', icon: Quote },
  { label: 'Código inline', action: 'codeInline', icon: Code },
  { label: 'Bloque código', action: 'codeBlock', icon: FileCode2 },
  { label: 'Tabla', action: 'table', icon: Table },
  { label: 'Fila', action: 'tableRow', icon: Rows3 },
  { label: 'Columna', action: 'tableColumn', icon: Columns3 },
  { label: 'Rama de carpeta', action: 'treeBranch', icon: GitBranch },
  { label: 'Subdirectorio', action: 'treeSubdirectory', icon: GitFork },
  { label: 'Último directorio', action: 'treeLast', icon: CornerDownRight },
  { label: 'Separador', action: 'separator', icon: Minus }
];

export function EditorPanel({ value, onChange, onEditorScroll, headerMenu, editorFontSize = 'normal' }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  const onEditorScrollRef = useRef(onEditorScroll);
  const [headingValue, setHeadingValue] = useState<MarkdownFormatAction>('h0');
  const [listValue, setListValue] = useState<MarkdownFormatAction | 'none'>('none');

  const applyFormat = (action: MarkdownFormatAction) => {
    const view = viewRef.current;
    if (!view) return;
    const range = view.state.selection.main;
    const result = applyMarkdownFormat({
      content: view.state.doc.toString(),
      from: range.from,
      to: range.to,
      action
    });

    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: result.content },
      selection: EditorSelection.range(result.selectionFrom, result.selectionTo)
    });
    view.focus();
  };

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onEditorScrollRef.current = onEditorScroll;
  }, [onEditorScroll]);

  useEffect(() => {
    if (!containerRef.current || viewRef.current) return;

    const state = EditorState.create({
      doc: value,
      extensions: [
        markdown(),
        editorTheme,
        EditorView.lineWrapping,
        keymap.of([
          indentWithTab,
          {
            key: 'Enter',
            run: continueAlphaListOnEnter
          }
        ]),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChangeRef.current(update.state.doc.toString());
          }
          if (update.viewportChanged || update.geometryChanged) {
            const scrollDOM = update.view.scrollDOM;
            const maxScroll = scrollDOM.scrollHeight - scrollDOM.clientHeight;
            const progress = maxScroll <= 0 ? 0 : scrollDOM.scrollTop / maxScroll;
            onEditorScrollRef.current?.(progress);
          }
        })
      ]
    });

    const view = new EditorView({ state, parent: containerRef.current });
    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current === value) return;

    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: value }
    });
  }, [value]);

  return (
    <section className={`${styles.panel} ${styles[`fontSize${editorFontSize[0].toUpperCase()}${editorFontSize.slice(1)}`]}`}>
      <div className={styles.panelHeader}>
        {headerMenu}
        <h2>Editor Markdown</h2>
      </div>
      <div className={styles.formatToolbar}>
        <select
          aria-label="Selector de encabezado"
          title="Formato de encabezado"
          value={headingValue}
          onChange={(e) => {
            const action = e.target.value as MarkdownFormatAction;
            applyFormat(action);
            setHeadingValue('h0');
          }}
        >
          {headingOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <select
          aria-label="Selector de listas"
          title="Insertar formato de lista"
          value={listValue}
          onChange={(e) => {
            const action = e.target.value as MarkdownFormatAction | 'none';
            if (action !== 'none') {
              applyFormat(action);
            }
            setListValue('none');
          }}
        >
          {listOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {iconButtons.map(({ label, action, icon: Icon }) => (
          <button key={action} type="button" aria-label={label} className={styles.iconButton} onClick={() => applyFormat(action)}>
            <Icon aria-hidden="true" size={16} strokeWidth={2.2} />
            <span className={styles.tooltip} role="tooltip">{label}</span>
          </button>
        ))}
      </div>
      <div ref={containerRef} className={styles.editor} />
    </section>
  );
}
