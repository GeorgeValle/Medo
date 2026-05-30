export type ChangelogEntry = {
  version: string;
  date: string;
  title: string;
  changes: string[];
};

export const changelogEntries: ChangelogEntry[] = [
  {
    version: '0.9.4',
    date: '2026-05-30',
    title: 'Polish técnico del build y separación de chunks',
    changes: [
      'Se agregó separación manual de chunks en Vite para aislar React, CodeMirror, markdown-it y lucide-react en archivos de build dedicados.',
      'El build queda más prolijo al reducir la advertencia de Vite por chunks mayores a 500 kB sin aumentar el límite de advertencia.',
      'No hubo cambios funcionales: cierre nativo, borrador local, Nuevo/Abrir/Guardar/Guardar como, Exportar HTML, Imprimir / Guardar como PDF y preferencias locales permanecen intactos.'
    ]
  },
  {
    version: '0.9.3',
    date: '2026-05-29',
    title: 'Polish visual del menú Medo por tema',
    changes: [
      'Se ajustó el botón y menú Medo para conservar apariencia oscura en tema claro y usar apariencia clara de alto contraste en tema oscuro.',
      'El contraste del menú ahora se invierte respecto del tema activo de la app, incluyendo el modo sistema según la preferencia del sistema operativo.',
      'Se mantuvieron visibles los estados hover, active y focus del botón y las opciones del menú.',
      'No hubo cambios funcionales: cierre nativo, borrador local, Nuevo/Abrir/Guardar/Guardar como, Exportar HTML, Imprimir / Guardar como PDF y preferencias locales permanecen intactos.'
    ]
  },
  {
    version: '0.9.2',
    date: '2026-05-28',
    title: 'Pulido de README, licencia GPLv3 y metadata pre-1.0',
    changes: [
      'Se profesionalizó el README con título, badges, secciones semánticas, descripción del estado release candidate, funcionalidades, desarrollo local, roadmap, contacto y licencia.',
      'Se agregó la licencia GNU General Public License v3.0 al repositorio y se declaró GPL-3.0-only en la metadata del paquete.',
      'Se alineó la versión a 0.9.2 en frontend y Tauri/Rust como preparación documental previa a 1.0.0.',
      'No hubo cambios en lógica funcional: cierre nativo, borrador local, Nuevo/Abrir/Guardar/Guardar como, Exportar HTML, Imprimir / Guardar como PDF y preferencias locales permanecen intactos.'
    ]
  },
  {
    version: '0.9.1',
    date: '2026-05-28',
    title: 'Hotfix de release candidate: versionado, README WSL y legibilidad del Manual',
    changes: [
      'Se alineó la metadata de versión a 0.9.1 en frontend y Tauri/Rust para evitar inconsistencias entre Acerca, changelog e instalador de release candidate.',
      'Se corrigió en README el ejemplo de ruta UNC de WSL para que se vea y se pueda pegar tal cual en el diálogo Abrir de Windows, sin barras extra ni escapes incorrectos.',
      'Se ajustaron estilos del Manual de uso para usar variables semánticas de tema y recuperar alto contraste en tema claro, manteniendo legibilidad también en tema oscuro.',
      'No hubo cambios en cierre nativo, borrador local, filesystem ni flujos de exportación (HTML y Imprimir / Guardar como PDF).'
    ]
  },
  {
    version: '0.9.0',
    date: '2026-05-28',
    title: 'Documentación y validación de uso con WSL por rutas UNC',
    changes: [
      'Se documentó en README y en el Manual de uso que Medo puede abrir archivos Markdown dentro de WSL pegando rutas UNC en el diálogo Abrir de Windows (por ejemplo `\\\\wsl$\\Ubuntu\\home\\usuario\\proyecto\\README.md`).',
      'Se validó manualmente el flujo completo: abrir archivo .md desde `\\\\wsl$\\...`, editar en Medo, guardar y verificar cambios desde WSL con `cat`.',
      'No se agregó integración nativa WSL ni ejecución de comandos WSL desde Medo; la capacidad depende del acceso de archivos Windows/WSL del host.',
      'Windows se mantiene como plataforma oficial inicial, sin cambios en cierre nativo, borrador local, Exportar HTML o Imprimir / Guardar como PDF.'
    ]
  },
  {
    version: '0.8.2',
    date: '2026-05-27',
    title: 'Polish visual del espacio inferior del workspace',
    changes: [
      'Se estabilizó el layout vertical principal para que el workspace use mejor la altura disponible y reduzca claramente la franja vacía inferior.',
      'Se ajustó la posición de la línea separadora inferior para dejarla más cerca del borde inferior, con un margen final más prolijo.',
      'Se mantuvo el scroll interno independiente en editor y preview sin introducir scroll vertical global de ventana.',
      'No hubo cambios en cierre nativo, borrador local, Exportar HTML, Imprimir / Guardar como PDF ni preferencias locales.'
    ]
  },
  {
    version: '0.8.1',
    date: '2026-05-26',
    title: 'Mejora de legibilidad en impresión y PDF',
    changes: [
      'Se agregaron reglas `@media print` al HTML standalone para forzar impresión en fondo blanco y texto oscuro de alto contraste.',
      'Se reforzó la legibilidad de encabezados, párrafos, listas, enlaces y citas en salida impresa/PDF, evitando tonos grises pálidos.',
      'Se mejoró el contraste de `code` inline y bloques `pre code` para impresión/PDF sin alterar el preview ni los temas de la app.',
      'Exportar HTML e Imprimir / Guardar como PDF se mantienen funcionando, sin tocar cierre nativo ni borrador local.'
    ]
  },
  {
    version: '0.8.0',
    date: '2026-05-25',
    title: 'Preferencias locales y UX persistente',
    changes: [
      'Se agregaron preferencias locales persistentes y versionadas (`medo.preferences.v1`) separadas del borrador local (`medo.localDraft.v1`).',
      'Se incorporó preferencia de tema (Sistema/Oscuro/Claro) con persistencia entre reinicios y aplicación por `data-theme` sin romper el tema oscuro existente.',
      'Se agregó preferencia persistente de tamaño de fuente del editor (Pequeño/Normal/Grande) con modal simple de Preferencias desde el menú Medo.',
      'No se modificó el cierre nativo de ventana ni la lógica de borrador local, y Exportar HTML + Imprimir/Guardar como PDF se mantienen intactos.'
    ]
  },
  {
    version: '0.7.2',
    date: '2026-05-24',
    title: 'Hotfix de impresión para Guardar como PDF en Tauri/Windows',
    changes: [
      'Se corrigió el flujo “Imprimir / Guardar como PDF” en Tauri/Windows reemplazando `window.open()` por un iframe interno más confiable para abrir el diálogo de impresión del sistema.',
      'El flujo PDF ya no solicita ruta `.pdf` previa porque no realiza exportación silenciosa; el guardado final lo define el usuario desde el diálogo del sistema.',
      'Se corrigió el error de `pnpm lint` en `pdfExport.test.ts` eliminando dependencias de mocks de `window.open` y ajustando cobertura al nuevo flujo de impresión.',
      'Exportar HTML se mantiene intacto con el mismo HTML limpio (sin UI interna ni botones de copiar), y no se tocó cierre nativo ni borrador local.'
    ]
  },
  {
    version: '0.7.1',
    date: '2026-05-24',
    title: 'Exportar PDF vía impresión del sistema en Windows',
    changes: [
      'La opción del menú pasa de experimental a “Imprimir / Guardar como PDF” para Windows usando el HTML limpio exportable ya existente.',
      'La fuente del documento PDF reutiliza `buildPdfSourceHtml` sin UI interna ni botones de copiar, igual que Exportar HTML.',
      'Exportar HTML sigue intacto y no se modificó el flujo de cierre nativo ni la recuperación de borrador local.',
      'En macOS/Linux se informa de forma clara que el PDF real queda inicialmente orientado a Windows y se sugiere Exportar HTML o Imprimir / Guardar como PDF.'
    ]
  },
  {
    version: '0.7.0',
    date: '2026-05-24',
    title: 'Preparación de exportación PDF inicial',
    changes: [
      'Se agregó la opción Exportar PDF (experimental) en el menú Medo sin alterar Exportar HTML.',
      'Se incorporó helper separado de PDF que reutiliza el mismo HTML limpio exportable usado por Exportar HTML.',
      'La UI comunica de forma explícita que la exportación PDF real queda como siguiente paso técnico en Tauri 2.',
      'No se modificó el flujo de cierre nativo ni la lógica de borrador local.'
    ]
  },
  {
    version: '0.6.9',
    date: '2026-05-23',
    title: 'Hotfix de persistencia local con debounce',
    changes: [
      'Se reemplazó la persistencia de borrador por tecla con debounce (~400ms) para evitar bloqueos al escribir en documentos largos.',
      'Se agregó flush coordinado en eventos de ciclo de vida (pagehide, beforeunload y visibilitychange en hidden).',
      'Se reforzó la limpieza coordinada de draft en memoria + localStorage para evitar snapshots stale después de guardar, guardar como, descartar o abrir nuevo archivo.'
    ]
  },
  {
    version: '0.6.8',
    date: '2026-05-23',
    title: 'Rollback del cierre de ventana al flujo nativo',
    changes: [
      'Se restauró el cierre nativo de ventana y se retiró la interceptación con onCloseRequested.',
      'Se eliminó el cierre programático con getCurrentWindow().close() y el pendingAction de tipo close.',
      'Se mantuvo la protección para Nuevo/Abrir con modal de cambios pendientes y se reforzó la persistencia de borrador local para recuperación tras cierre.'
    ]
  },
  {
    version: '0.6.7',
    date: '2026-05-23',
    title: 'Cobertura de regresión para cierre real de la app',
    changes: [
      'Se agregó cobertura de regresión del flujo de cierre (sin cambios, cancelar, descartar, guardar y error con reintento).',
      'Se agregó validación automatizada de capability `core:window:allow-close` y coherencia de label `main` entre capabilities y tauri.conf.json.',
      'Se corrigió el flujo de cierre para conservar detalle técnico en errores y evitar estados colgados al reintentar cerrar.'
    ]
  },
  {
    version: '0.6.6',
    date: '2026-05-22',
    title: 'Hotfix de permiso Tauri para cierre de ventana',
    changes: [
      'Se agregó el permiso core:window:allow-close en capabilities de Tauri 2 para habilitar el cierre programático de la ventana.',
      'Se reparó el cierre confirmado desde el modal de cambios pendientes (Guardar/Descartar) sin errores de permission/capability en runtime.'
    ]
  },
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
