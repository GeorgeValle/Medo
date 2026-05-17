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
CodeMirror 6, markdown-it, Tauri API/plugins (dialog/fs), Vitest.
