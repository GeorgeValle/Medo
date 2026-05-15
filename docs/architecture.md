# Arquitectura

- Frontend: React (UI, estado de pantalla, interacción usuario).
- Backend local: Tauri/Rust (shell desktop + plugins filesystem/dialog).
- UI separada de lógica:
  - Markdown: `src/lib/markdown`
  - TXT→MD: `src/lib/txt-to-md`
  - Documentos: `src/lib/documents`
- Comunicación React↔Tauri: APIs/plugins oficiales Tauri 2 en frontend.
- React: rendering, edición, preview, manejo de errores UI.
- Rust/Tauri: ciclo de vida app y permisos/plugins nativos.
