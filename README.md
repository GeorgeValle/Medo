# Medo

Medo es una aplicación de escritorio para Windows, construida con Tauri 2 + React + TypeScript, enfocada en edición Markdown.

## Estado
Inicial (fundación + UI base + editor + preview).

## Stack
- Tauri 2
- React + TypeScript + Vite
- pnpm
- CodeMirror 6
- markdown-it
- Vitest

## Comandos
- `pnpm install`
- `pnpm dev`
- `pnpm test`
- `pnpm build`
- `pnpm tauri:dev`
- `pnpm tauri:build`

> Nota: el instalador Windows final se completará en fases futuras.

## Estructura
- `src/` frontend React
- `src-tauri/` backend local Rust/Tauri
- `docs/` documentación funcional, técnica y planificación

## Dependencias agregadas al MVP
CodeMirror 6, markdown-it, Tauri API/plugins (dialog/fs/opener/os), Vitest.

## Uso con WSL
- Plataforma oficial inicial: Windows.
- Medo también puede trabajar con archivos Markdown dentro de WSL usando rutas UNC pegadas en el diálogo **Abrir** de Windows (por ejemplo: `\\wsl$\Ubuntu\home\usuario\proyecto\README.md`).
- Una vez abierto, el archivo se puede editar y guardar normalmente desde Medo.
- Esta integración usa el acceso a archivos de Windows/WSL: no requiere plugin especial ni ejecutar comandos WSL desde Medo.

