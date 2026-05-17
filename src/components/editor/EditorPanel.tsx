import { useEffect, useRef, useState } from 'react';
import { EditorSelection, EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { markdown } from '@codemirror/lang-markdown';
import styles from './EditorPanel.module.css';
import { applyMarkdownFormat, type MarkdownFormatAction } from '../../lib/markdown/applyMarkdownFormat';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onEditorScroll?: (progress: number) => void;
};

const editorTheme = EditorView.theme({
  '&': { height: '100%' },
  '.cm-content, .cm-gutters': { backgroundColor: '#0f172a', color: 'var(--color-text)' },
  '.cm-content': { caretColor: '#facc15' },
  '.cm-cursor': { borderLeftColor: '#facc15', borderLeftWidth: '2px' },
  '.cm-dropCursor': { borderLeftColor: '#ffffff', borderLeftWidth: '2px' },
  '&.cm-focused .cm-cursor': { borderLeftColor: '#facc15' },
  '&.cm-focused': { outline: '1px solid #facc15' },
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection': { backgroundColor: 'rgba(250, 204, 21, 0.3)' }
});

const headingOptions: Array<{ label: string; value: MarkdownFormatAction }> = [
  { label: 'Texto normal', value: 'h0' },
  { label: 'Título principal / H1', value: 'h1' },
  { label: 'Título / H2', value: 'h2' },
  { label: 'Subtítulo / H3', value: 'h3' }
];

const listOptions: Array<{ label: string; value: MarkdownFormatAction | 'none' }> = [
  { label: 'Lista', value: 'none' },
  { label: 'Desordenada', value: 'bulletList' },
  { label: 'Numérica', value: 'numberedList' },
  { label: 'Alfabética', value: 'alphaList' }
];

export function EditorPanel({ value, onChange, onEditorScroll }: Props) {
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
    <section className={styles.panel}>
      <h2>Editor Markdown</h2>
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
        <button title="Negrita" onClick={() => applyFormat('bold')}><strong>N</strong></button>
        <button title="Cursiva" onClick={() => applyFormat('italic')}><em>I</em></button>
        <button title="Enlace" onClick={() => applyFormat('link')}>Enlace</button>
        <button title="Imagen" onClick={() => applyFormat('image')}>Imagen</button>
        <button title="Cita" onClick={() => applyFormat('quote')}>Cita</button>
        <button title="Código inline" onClick={() => applyFormat('codeInline')}>Código inline</button>
        <button title="Bloque código" onClick={() => applyFormat('codeBlock')}>Bloque código</button>
        <button title="Insertar tabla" onClick={() => applyFormat('table')}>Tabla</button>
        <button title="Agregar fila de tabla" onClick={() => applyFormat('tableRow')}>Fila</button>
        <button title="Agregar columna de tabla" onClick={() => applyFormat('tableColumn')}>Columna</button>
        <button title="Insertar separador" onClick={() => applyFormat('separator')}>Separador</button>
      </div>
      <div ref={containerRef} className={styles.editor} />
    </section>
  );
}
