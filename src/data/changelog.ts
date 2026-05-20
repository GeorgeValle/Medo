export type ChangelogEntry = {
  version: string;
  date: string;
  title: string;
  changes: string[];
};

export const changelogEntries: ChangelogEntry[] = [
  {
    version: '0.4.1',
    date: '2026-05-20',
    title: 'Botones de árbol de carpetas y fecha por entrada',
    changes: [
      'Se agregaron botones de ayuda para insertar ramas de árbol de carpetas en el editor Markdown.',
      'Se incorporaron las acciones Rama de carpeta, Subdirectorio y Último directorio en la toolbar compacta.',
      'La bitácora de novedades ahora muestra fecha de implementación en cada entrada.'
    ]
  },
  {
    version: '0.4.0',
    date: '2026-05-19',
    title: 'Gestión segura de guardado',
    changes: [
      'Se agregó estado visible del documento en el área de Vista previa.',
      'Se incorporó nombre de archivo editable desde la interfaz.',
      'Se agregó indicador Guardado / Sin guardar sincronizado con cambios pendientes.',
      'Se agregó confirmación antes de perder cambios al crear, abrir o cerrar.',
      'Se agregó recuperación básica de borrador local para documentos sin guardar.'
    ]
  },
  {
    version: '0.3.0',
    date: '2026-05-18',
    title: 'Acerca de, novedades, reporte de problemas y créditos',
    changes: [
      'Se transformó el modal Acerca de Medo en una ventana con pestañas.',
      'Se agregó una sección de novedades con historial de versiones.',
      'Se agregó una sección para reportar problemas mediante GitHub Issues.',
      'Se agregó una sección de créditos y agradecimientos.',
      'Se incorporó medo-logo.png al modal Acerca de.'
    ]
  },
  {
    version: '0.2.0',
    date: '2026-05-17',
    title: 'Pulido visual del workspace',
    changes: [
      'Se agregó divisor inferior bajo los paneles de editor y preview.',
      'Se redujo el espacio vacío debajo del workspace.',
      'Se alineó la versión de la app a 0.2.0.'
    ]
  },
  {
    version: '0.1.1',
    date: '2026-05-16',
    title: 'Corrección de iconos y release Windows',
    changes: [
      'Se corrigió la configuración de iconos versionados.',
      'Se evitó la generación temporal de iconos en CI.',
      'Se ajustó la versión para pruebas de caché de iconos en Windows.'
    ]
  },
  {
    version: '0.1.0',
    date: '2026-05-15',
    title: 'Base inicial de Medo',
    changes: [
      'Primera base funcional de la app de escritorio.',
      'Editor Markdown y panel de preview.',
      'Configuración inicial con Tauri 2 y React.'
    ]
  }
];
