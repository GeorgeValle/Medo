# Tasks

## Estado general
En progreso.

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

## Pendientes
- Ejecutar validación manual completa en Windows con instalador NSIS generado desde CI.
- Confirmar en Windows real que `Abrir/Guardar/Guardar como` funcionan con `.md` y `.txt` en múltiples rutas.
- Confirmar usabilidad de barra de formato Markdown con selección y sin selección (incluye repetir H1/H2/H3 y numeración con líneas en blanco).
- Validar manualmente UX de tabla (`Tabla`, `Fila`, `Columna`) en selección simple y multilinea.
- Exportación PDF (idea futura, fuera de este PR).
- Soporte de rutas WSL (idea futura, fuera de este PR).
- Mejorar continuidad automática alfabética en casos avanzados (p. ej. salir de lista con línea vacía) como seguimiento futuro.

## Bloqueadas
- `pnpm tauri:build` en Linux puede fallar por dependencias GTK/GLib del entorno; usar runner Windows para validación final del instalador.

## Bugs conocidos
- Corregido: numeración de listas ordenadas con líneas en blanco y reinicio del selector de encabezado para aplicar H1/H2/H3 repetidamente.

## Decisiones pendientes
- Estrategia de firma de instalador.
- Política de versiones para releases.
