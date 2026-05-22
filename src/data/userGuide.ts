export type UserGuideExample = {
  title: string;
  code: string;
};

export type UserGuideSection = {
  id: string;
  title: string;
  description?: string;
  items?: string[];
  examples?: UserGuideExample[];
};

export const userGuideSections: UserGuideSection[] = [
  {
    id: 'inicio-rapido',
    title: 'Inicio rápido',
    items: [
      'Escribí Markdown en el panel izquierdo.',
      'La vista previa se actualiza en el panel derecho.',
      'Usá el menú Medo para crear, abrir, guardar, guardar como y exportar HTML.',
      'Los cambios sin guardar se muestran como “Sin guardar”.'
    ]
  },
  {
    id: 'guardado-y-borrador',
    title: 'Guardado, cambios pendientes y borrador local',
    items: [
      '“Guardado” significa que el contenido coincide con el último guardado.',
      '“Sin guardar” significa que hay cambios pendientes.',
      'Si intentás crear, abrir o cerrar con cambios pendientes, Medo pide confirmación.',
      'Si la app se cierra inesperadamente, Medo puede ofrecer recuperar un borrador local.',
      'El borrador local queda en la PC del usuario.'
    ]
  },
  {
    id: 'abrir-guardar-guardar-como',
    title: 'Abrir, guardar y guardar como',
    items: [
      '“Abrir” permite cargar archivos .md o .txt.',
      'Para trabajo normal, .md es el formato recomendado.',
      'Si abrís un .txt, editás y querés persistir cambios, usá “Guardar como” para guardarlo como Markdown o en una nueva ruta.',
      '“Guardar” guarda sobre el archivo actual.',
      'Si el documento no tiene archivo todavía, “Guardar” abre el flujo de “Guardar como”.',
      'Si cambiás el nombre visible del documento, “Guardar” abre “Guardar como” para evitar renombrar silenciosamente.',
      '“Guardar como” permite elegir una nueva ruta.'
    ]
  },
  {
    id: 'exportar-html',
    title: 'Exportar HTML',
    items: [
      '“Exportar HTML” genera un archivo .html autónomo.',
      'Usa el contenido renderizado del Markdown.',
      'No cambia el archivo .md actual.',
      'No cambia el estado “Guardado” / “Sin guardar”.',
      'Sirve para abrir el resultado en un navegador.'
    ]
  },
  {
    id: 'barra-de-formato',
    title: 'Barra de formato',
    items: [
      'Encabezados: aplica niveles de título para organizar el documento.',
      'Listas: inserta listas con viñetas, numeración, letras o checklist.',
      'Negrita: destaca texto importante.',
      'Cursiva: marca énfasis suave o términos.',
      'Tachado: muestra contenido descartado o pendiente de revisión.',
      'Enlace: agrega vínculos en formato Markdown.',
      'Imagen: inserta sintaxis de imagen con texto alternativo y URL.',
      'Cita: crea bloques para citas o notas destacadas.',
      'Código inline: resalta comandos o fragmentos cortos.',
      'Bloque de código: crea bloques fenced para código multilínea.',
      'Tabla: inserta estructura base de tabla.',
      'Fila: agrega una nueva fila a una tabla existente.',
      'Columna: agrega una nueva columna a la tabla.',
      'Separador: inserta una línea horizontal con ---.',
      'Rama de carpeta: inserta ├── para árboles de directorios.',
      'Subdirectorio: inserta │   para mantener jerarquía.',
      'Último directorio: inserta └── para cerrar la rama.'
    ]
  },
  {
    id: 'guia-markdown',
    title: 'Guía básica Markdown',
    description: 'Estos ejemplos se muestran como texto para que puedas copiarlos tal cual en tu documento.',
    examples: [
      { title: 'Encabezados', code: '# Título principal\n## Subtítulo\n### Sección' },
      { title: 'Énfasis', code: '**negrita**\n*cursiva*\n~~tachado~~' },
      { title: 'Listas', code: '- Elemento\n- Otro elemento\n\n1. Primer paso\n2. Segundo paso' },
      { title: 'Checklist', code: '- [ ] Tarea pendiente\n- [x] Tarea hecha' },
      { title: 'Cita', code: '> Esto es una cita.' },
      { title: 'Código inline', code: 'Usá `código inline` dentro de una frase.' },
      { title: 'Bloque de código', code: '```js\nconsole.log("Hola Medo");\n```' },
      { title: 'Tabla', code: '| Columna 1 | Columna 2 |\n| --- | --- |\n| Valor 1 | Valor 2 |' },
      { title: 'Separador', code: '---' },
      {
        title: 'Árbol de carpetas',
        code: '```txt\nmi-proyecto/\n├── src/\n│   └── App.tsx\n└── package.json\n```'
      }
    ],
    items: [
      'Recomendación: escribí árboles de carpetas dentro de bloques de código para preservar alineación en preview y exportación HTML.'
    ]
  },
  {
    id: 'consejos',
    title: 'Consejos',
    items: [
      'Guardá seguido para evitar pérdida de trabajo.',
      'Usá “Guardar como” para crear variantes del mismo documento.',
      'Exportá HTML para compartir una versión legible sin depender de Markdown.',
      'Si algo falla, usá “Reportar problema” en “Acerca de Medo”.'
    ]
  }
];
