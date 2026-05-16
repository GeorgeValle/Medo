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
- [x] Conversor TXT→MD + tests
- [x] Integración inicial abrir/guardar/guardar como
- [x] Configuración inicial Tauri Windows NSIS
- [x] CI inicial
- [ ] Validación de empaquetado final en runner Windows (NSIS)
- [ ] Validación manual final en Windows instalado

## Completadas
- Validación manual en Windows instalada:
  - `Nuevo` funciona.
  - `Abrir`, `Guardar` y `Guardar como` funcionan para archivos esperados.
  - Conversor TXT→MD funciona y aplica al editor.
  - Preview se actualiza en vivo.
  - No aparece ventana de consola en builds release.
- Corrección de visibilidad de caret en CodeMirror con tema del editor.
- Barra de formato Markdown integrada junto al editor (encabezados, listas, negrita, cursiva, enlace, imagen, cita y código).
- Barra de formato ajustada: `Código inline`, `Bloque código`, `Tabla`, `Fila` y `Columna` con inserciones Markdown predecibles.
- Mejora de visibilidad del caret del editor en tema oscuro (blanco de alto contraste).
- Mejora incremental del TXT→MD para separar párrafos de forma más predecible.

## Pendientes
- Ejecutar validación manual completa en Windows con instalador NSIS generado desde CI.
- Confirmar en Windows real que `Abrir/Guardar/Guardar como` funcionan con `.md` y `.txt` en múltiples rutas.
- Confirmar usabilidad de barra de formato Markdown con selección y sin selección (incluye repetir H1/H2/H3 y numeración con líneas en blanco).
- Validar manualmente UX de tabla (`Tabla`, `Fila`, `Columna`) en selección simple y multilinea.

## Bloqueadas
- `pnpm tauri:build` en Linux puede fallar por dependencias GTK/GLib del entorno; usar runner Windows para validación final del instalador.

## Bugs conocidos
- Corregido: numeración de listas ordenadas con líneas en blanco y reinicio del selector de encabezado para aplicar H1/H2/H3 repetidamente.

## Decisiones pendientes
- Estrategia de firma de instalador.
- Política de versiones para releases.
