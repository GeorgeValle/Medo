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
- Correcciones post-validación manual en Windows instalado:
  - Registro explícito de permisos/capabilities para `dialog` y `fs` en Tauri v2.
  - Mejoras de error en `Abrir`, `Guardar` y `Guardar como` con detalle técnico.
  - `Nuevo` ahora limpia editor, preview, ruta actual, textarea del conversor TXT→MD y error visible.
  - Cursor de CodeMirror con alto contraste en fondo oscuro.
  - Configuración Rust para evitar ventana de consola en builds release de Windows.
  - Configuración NSIS en español con `languages: ["Spanish"]`.

## Pendientes
- Ejecutar validación manual completa en Windows con instalador NSIS generado desde CI.
- Confirmar en Windows real que `Abrir/Guardar/Guardar como` funcionan con `.md` y `.txt`.
- Confirmar que no aparece consola al abrir desde menú inicio/atajo en build instalado.

## Bloqueadas
- `pnpm tauri:build` en Linux puede fallar por dependencias GTK/GLib del entorno; usar runner Windows para validación final del instalador.

## Bugs conocidos
- Pendiente validar en Windows si existe alguna restricción adicional de NSIS/Tauri para localización completa del instalador.

## Decisiones pendientes
- Estrategia de firma de instalador.
- Política de versiones para releases.
