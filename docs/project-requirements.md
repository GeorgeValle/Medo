# Requisitos del proyecto

## Producto
Medo: editor de Markdown de escritorio para Windows con preview en vivo.

## Problema
Editar Markdown en herramientas web o editores complejos no siempre ofrece flujo simple local.

## Usuarios objetivo
- Redactores técnicos
- Estudiantes
- Usuarios que prefieren archivos locales

## Alcance MVP
- Escribir Markdown
- Preview en vivo
- Abrir/guardar/guardar como archivos locales
- Ejecutar como app Tauri en Windows

Abrir archivos `.txt` en el editor es una capacidad independiente del conversor TXT→MD y permanece dentro del alcance.

## Futuro
Atajos avanzados, plantillas, exportaciones, instalador endurecido, pipeline release.

## Módulos
Editor Markdown, Preview, Gestor de documentos, Instalador Windows.

## Decisión sobre el conversor TXT→MD
El conversor TXT→MD fue descartado por falta de valor para el MVP. Su implementación histórica permanece conservada en el repositorio y fuera de la UI productiva; esta decisión no afecta la capacidad independiente de abrir archivos `.txt` en el editor.

## Tecnologías
Tauri 2, React, TS, Vite, pnpm, Rust local, CodeMirror 6, markdown-it, Vitest.

## Restricciones
Sin backend remoto, sin DB, sin auth, sin auto-updater, sin CSS frameworks.

## Criterios de aceptación MVP
Funciones base disponibles en UI y validadas por build/tests.

## Fuera de MVP
Sin publicación automática, sin sync cloud, sin móvil.
