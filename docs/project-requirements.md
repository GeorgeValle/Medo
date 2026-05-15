# Requisitos del proyecto

## Producto
Medo: editor de Markdown de escritorio para Windows con preview en vivo y utilidades de conversión TXT→MD.

## Problema
Editar Markdown en herramientas web o editores complejos no siempre ofrece flujo simple local.

## Usuarios objetivo
- Redactores técnicos
- Estudiantes
- Usuarios que prefieren archivos locales

## Alcance MVP
- Escribir Markdown
- Preview en vivo
- Convertir TXT a MD
- Abrir/guardar/guardar como archivos locales
- Ejecutar como app Tauri en Windows

## Futuro
Atajos avanzados, plantillas, exportaciones, instalador endurecido, pipeline release.

## Módulos
Editor Markdown, Preview, Conversor TXT→MD, Gestor de documentos, Instalador Windows.

## Tecnologías
Tauri 2, React, TS, Vite, pnpm, Rust local, CodeMirror 6, markdown-it, Vitest.

## Restricciones
Sin backend remoto, sin DB, sin auth, sin auto-updater, sin CSS frameworks.

## Criterios de aceptación MVP
Funciones base disponibles en UI y validadas por build/tests.

## Fuera de MVP
Sin publicación automática, sin sync cloud, sin móvil.
