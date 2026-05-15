# AGENTS

## Rol de Codex
Implementar cambios mínimos, verificables y alineados con MVP de Medo.

## Reglas operativas
- Mantener arquitectura simple y separada (UI, markdown, txt-to-md, documents).
- Actualizar `docs/tasks.md` en cada cambio de estado.
- No marcar tareas como completadas sin implementación y validación.
- Reportar errores con causa, impacto y siguiente acción.

## Comandos esperados
- `pnpm install`
- `pnpm test`
- `pnpm build`
- `pnpm tauri:build` (si el entorno lo permite)

## Dependencias
- Agregar solo dependencias necesarias al MVP y documentarlas en README.

## Estilos
- Solo CSS Modules por componente (`*.module.css`).
- Prohibido Tailwind/Bootstrap/Material UI/Chakra/CSS-in-JS/Sass.

## Definición de terminado
Tarea terminada = código implementado + validación ejecutada o limitación documentada + `docs/tasks.md` actualizado.
