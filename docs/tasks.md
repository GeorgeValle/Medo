# Tasks

## Estado general
En progreso.

## Fase actual
Phase 01 - Foundation.

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

## Completadas
Ver checklist.

## Pendientes
- Validación de instalador en Windows real.

## Bloqueadas
- `pnpm tauri:build` falló en Linux por librerías del sistema GTK/GLib faltantes; validar empaquetado final en runner Windows con toolchain completa.

## Bugs conocidos
- Ninguno crítico reportado en esta fase.

## Decisiones pendientes
- Estrategia de firma de instalador.
- Política de versiones para releases.
