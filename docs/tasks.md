- [x] v0.4.0: estado visible, confirmación anti-pérdida y borrador local implementado (incluye cierre seguro de ventana).
# Tasks

## Estado general
En progreso: v0.4.0 gestión segura de guardado/documento.

## Fase actual
Phase 05 - Release.

## Checklist por fase
- [x] Base Tauri + React + TS + Vite + pnpm
- [x] Estructura de carpetas inicial
- [x] Documentación base
- [x] UI inicial con CSS Modules
- [x] Editor Markdown (CodeMirror)
- [x] Preview Markdown
- [x] Integración inicial abrir/guardar/guardar como
- [x] Configuración inicial Tauri Windows NSIS
- [x] CI inicial
- [ ] Validación de empaquetado final en runner Windows (NSIS)
- [ ] Validación manual final en Windows instalado

## Completadas
- Follow-up toolbar/changelog (esta iteración): se agregan botones compactos `Rama de carpeta`, `Subdirectorio` y `Último directorio` para insertar símbolos Unicode de árbol en Markdown, y la bitácora de `Novedades` ahora incluye fecha de implementación (`YYYY-MM-DD`) por entrada.
- Follow-up pre-merge v0.4.0 (esta iteración): `updateDocumentDisplayName` ya no marca estado sucio si el nombre normalizado no cambia, `updateDocumentContent` preserva estado sucio por renombre pendiente, y se limpia borrador local automáticamente cuando `hasUnsavedChanges` vuelve a `false`.
- Follow-up fix v0.4.0 safe-close (esta iteración): se intercepta el cierre real de ventana con `onCloseRequested`, se reutiliza el modal de cambios sin guardar con acción pendiente `close`, y `Guardar/Descartar/Cancelar` ahora cubren también el cierre de app sin pérdida de borrador.
- Follow-up fix pre-merge v0.3.0 (esta iteración): se agregan permisos `opener:default` y `os:default` en `src-tauri/capabilities/default.json`, se corrige el primer agradecimiento en "Créditos" y se reformatea `src/App.module.css` sin cambios de comportamiento.
- Follow-up copy créditos v0.3.0 (esta iteración): se ajusta el primer agradecimiento en la pestaña "Créditos" del modal "Acerca de" para incluir a Codex Cloud y el texto final solicitado.
- Follow-up UX/release v0.3.0 (esta iteración): el modal existente de "Acerca de" evoluciona a modal con pestañas ("Acerca de", "Novedades", "Reportar problema", "Créditos"), changelog renderizado desde `src/data/changelog.ts`, formulario para abrir GitHub Issues prellenado y copiar diagnóstico básico; versión alineada a `0.3.0` en frontend/Tauri/Rust.
- Follow-up UI/release (esta iteración): se agrega divisor inferior bajo el workspace de editor/preview con el mismo estilo del divisor superior y se reduce notablemente el espacio inferior; versión de app alineada a `0.2.0` en frontend/Tauri/Rust.
- Follow-up release/icon config (esta iteración): CI de Windows deja de generar `src-tauri/icons/icon.ico` temporal; `bundle.icon` en Tauri se fija a archivos reales versionados (`32x32`, `128x128`, `icon.icns`, `icon.ico`); versión de app alineada a `0.1.1` en frontend/Tauri/Rust para pruebas de caché de iconos en Windows.
- Follow-up UI/branding (esta iteración): menú `Medo` movido al header del panel de editor junto a `Editor Markdown`, uso de imagen de marca `medo-head.png` en botón, retiro del área superior vacía y conservación de línea divisoria superior.
- Follow-up fix pre-merge: globalización completa de selectores CSS Modules para markup inyectado del botón de copiar en preview (`.icon`, `.iconCopy`, `.iconCheck`, `.iconError`, `.codeCopyTooltip`) para respetar estados `idle/copied/error` sin iconos apilados.
- Follow-up fix post-validación visual: separación Markdown segura para `Separador` y bloques de tabla (`Tabla`/`Fila`/`Columna`) evitando setext/pegado con texto adyacente; botón de copiar en preview corregido con selectores CSS Modules `:global(...)`; acción `Tachado` (`~~texto~~`) agregada en toolbar con tests de regresión para spacing/formato y markup del botón de copia.
- Ajuste de plantillas con selección en `separator`, `link` e `image` para terminar con salto de línea final y evitar concatenación con contenido posterior; se agregan tests de regresión con selección en medio del documento.
- Ajuste de formato Markdown con selección: acciones directas (negrita/cursiva/código/cita/listas/encabezados) aplican sobre selección y acciones ambiguas (enlace/imagen/separador) conservan selección e insertan plantilla debajo, con cobertura de tests unitarios.
- Validación manual en Windows instalada:
  - `Nuevo` funciona.
  - `Abrir`, `Guardar` y `Guardar como` funcionan para archivos esperados.
  - Preview se actualiza en vivo.
  - No aparece ventana de consola en builds release.
- Corrección de visibilidad de caret en CodeMirror con tema del editor.
- Barra de formato Markdown integrada junto al editor (encabezados, listas, negrita, cursiva, enlace, imagen, cita y código).
- Barra de formato ajustada: `Código inline`, `Bloque código`, `Tabla`, `Fila` y `Columna` con inserciones Markdown predecibles.
- Follow-up UX Windows validado manualmente: caret de CodeMirror con alto contraste (amarillo/blanco) en editor oscuro, cabecera compacta sin subtítulo redundante, botón `Separador` y mejora visual de `code` inline en preview.
- Follow-up UX post-validación manual en Windows: retiro de conversor TXT→MD del layout principal por bajo valor MVP; editor y preview con scroll interno independiente para documentos largos; bloques de código (fenced) con estilo visual diferenciado en preview.
- Corrección en `appendTableColumn` para preservar texto de filas sin `|` final y tests de regresión para ambos casos.
- Follow-up UX post-testing manual en Windows (editor/preview): contención de ancho en layout y bloques de código para evitar scroll horizontal global; sincronización proporcional de scroll editor→preview; selector único de listas (desordenada, numérica, alfabética) con reinicio tras aplicar; limpieza visual de toolbar retirando etiqueta visible “Formato”.
- Follow-up UX Windows (esta iteración): listas alfabéticas secuenciales con continuidad por contexto (`a.`→`b.`→`c.`), contención global de texto largo sin cortes de layout (preview + editor), y botón `Acerca` con modal informativo (proyecto, autor, contacto, versión y fecha).

- Follow-up UX Windows (post-testing manual): botón `Copiar` por bloque de código fenced en preview con feedback básico (`Copiado`/`Error`) y fallback cuando Clipboard API no está disponible.
- Follow-up UX Windows (post-testing manual): estilo de texto verde para bloques de código fenced en preview (sin alterar estilo de `code` inline).
- Follow-up UX Windows (post-testing manual): formato `Checklist` agregado al selector de listas (`- [ ] Elemento`) para selección simple y multilinea.
- Follow-up UX Windows (post-testing manual): continuidad alfabética básica al presionar Enter dentro de ítems `a.`/`b.` en el editor.

- Follow-up UX desktop (esta iteración): menú desplegable `Medo` en cabecera con acciones de archivo y `Acerca`, retiro de fila superior de botones para ganar alto útil en workspace, soporte `Tab`/`Shift+Tab` en CodeMirror con `indentWithTab`, y mejora de bordes/encabezados de tablas Markdown en preview oscura.

- Follow-up UX desktop (esta iteración): pulido visual del botón/menú desplegable `Medo` (estilo sobrio oscuro con espacio para insignia temporal) y navegación completa por teclado en menú (`ArrowUp/Down`, `Home`, `End`, `Escape`, `Enter`, `Space`) con foco accesible.

- Follow-up UX desktop (esta iteración): toolbar de editor Markdown compacta con botones de acción directa en iconos locales (`lucide-react`), tooltips con delay (~0.5s), selectores conservados con texto, y botón de copiar en bloques de código reemplazado por icono con feedback visual (`copiado`/`error`) sin cambiar lógica de formato.
- Pulido de accesibilidad/robustez pre-merge: botones de iconos de la toolbar con `type="button"` preventivo y tooltip visible del botón de copiar sincronizado con los estados `Copiar`/`Copiado`/`Error al copiar`, manteniendo iconos y `data-status`.

## Pendientes
- Ejecutar validación manual completa en Windows con instalador NSIS generado desde CI (confirmar icono final de Medo en instalador/accesos directos tras bump a 0.2.0).
- Confirmar en Windows real que `Abrir/Guardar/Guardar como` funcionan con `.md` y `.txt` en múltiples rutas.
- Confirmar usabilidad de barra de formato Markdown con selección y sin selección (incluye repetir H1/H2/H3 y numeración con líneas en blanco).
- Validar manualmente UX de tabla (`Tabla`, `Fila`, `Columna`) en selección simple y multilinea.
- Exportación PDF (idea futura, fuera de este PR).
- Soporte de rutas WSL (idea futura, fuera de este PR).
- Mejorar continuidad automática alfabética en casos avanzados (p. ej. salir de lista con línea vacía) como seguimiento futuro.

## Bloqueadas
- `pnpm tauri:build` en Linux puede fallar por dependencias GTK/GLib del entorno; usar runner Windows para validación final del instalador e icono en accesos directos.

## Bugs conocidos
- Corregido: numeración de listas ordenadas con líneas en blanco y reinicio del selector de encabezado para aplicar H1/H2/H3 repetidamente.

## Decisiones pendientes
- Estrategia de firma de instalador.
- Política de versiones para releases.

- Follow-up de estructura de proyecto (esta iteración): creadas carpetas `src-tauri/icons` y `src/assets/brand` para organizar íconos y recursos de marca del MVP.
