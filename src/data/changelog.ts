export type ChangelogEntry = {
  version: string;
  date: string;
  title: string;
  changes: string[];
};

export const changelogEntries: ChangelogEntry[] = [
  {
    version: '0.6.5',
    date: '2026-05-22',
    title: 'Fix post-validación de cierre y pulido visual final',
    changes: [
      'Se reparó el flujo real de cierre de app con cambios pendientes para que Guardar/Descartar completen el cierre sin dejar la ventana abierta.',
      'Los errores de cierre ahora muestran detalle explícito para diagnóstico en vez del mensaje genérico.',
      'Se redujo de forma efectiva el espacio inferior del workspace manteniendo divisor inferior y scroll interno en editor/preview.',
      'Se mejoró visualmente el estilo de tabs en Acerca de Medo para que la activa se perciba claramente como pestaña conectada al panel.'
    ]
  },
  {
    version: '0.6.4',
    date: '2026-05-22',
    title: 'Estabilidad de cierre y pulido visual post-validación manual',
    changes: [
      'Se corrigió el flujo de cierre de app para evitar estados atrapados con cambios pendientes y mantener la confirmación de guardado/descartar/cancelar.',
      'Se aclaró en el Manual de uso el flujo recomendado al abrir y editar archivos .txt, enfatizando el uso de “Guardar como”.',
      'Se compactó el layout principal para reducir el espacio vacío inferior manteniendo divisor y scroll interno de editor/preview.',
      'Se pulieron las pestañas del modal Acerca de Medo para que la activa se distinga mejor y se perciban como tabs conectadas al panel.'
    ]
  },
  {
    version: '0.6.3',
    date: '2026-05-21',
    title: 'Manual de uso integrado y guía básica de Markdown',
    changes: [
      'Se agregó un Manual de uso integrado accesible desde el menú Medo con modal dedicado.',
      'Se incorporó una guía básica de Markdown dentro de la app con ejemplos listos para copiar como texto.',
      'El manual incluye referencias de toolbar, exportación HTML y árboles de carpetas para uso práctico.'
    ]
  },
  {
    version: '0.6.2',
    date: '2026-05-21',
    title: 'Pulido visual post-validación manual',
    changes: [
      'Se pulió visualmente el modal Acerca de Medo con pestañas más claras (activa/hover/focus), manteniendo navegación y semántica accesible de tabs.',
      'Se redujo el espacio inferior del layout principal para una ventana más compacta sin perder divisores ni scroll interno de editor/preview.',
      'Se aplicaron mejoras menores de alineación visual en estado de documento y ajuste fino del botón/menú Medo dentro del tema oscuro.'
    ]
  },
  {
    version: '0.6.1',
    date: '2026-05-21',
    title: 'Fixes post-validación manual',
    changes: [
      'La exportación HTML ahora excluye UI interna de Medo (botones/íconos/tooltips de copiado) y mantiene bloques <pre><code>.',
      'Guardar detecta cambio de nombre visible en documentos con ruta y abre flujo Guardar como con el nombre sugerido nuevo.',
      'Se reforzó el flujo de cierre para evitar estados pendientes colgados tras recuperación de borrador luego de cierre forzado.'
    ]
  },
  {
    version: '0.6.0',
    date: '2026-05-20',
    title: 'Exportación HTML inicial',
    changes: [
      'Se agregó Exportar HTML al menú Medo para generar documento standalone.',
      'La exportación usa render Markdown actual, escapa título HTML y aplica estilos legibles embebidos.',
      'Se agregaron pruebas unitarias para documento HTML, escape de título, estilos y nombre sugerido .html.'
    ]
  },
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
