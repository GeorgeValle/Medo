# Plan de release (Windows)

## Objetivo
Distribuir Medo como instalador de escritorio Windows.

## Instalador
- Target: NSIS (Tauri bundle).
- `installMode`: `currentUser`.
- `startMenuFolder`: `Medo`.
- Acceso directo de escritorio: evaluar viabilidad en fase release.

## WebView2
Documentar prerequisito/comportamiento por versión de Windows.

## Automatización futura
- GitHub Actions para build Windows.
- GitHub Releases para artefactos firmados.
- Versionado semántico.

## Validaciones previas
- tests/build OK
- arranque app en Windows
- abrir/guardar archivos
- smoke test instalador

## Diferencias
- Dev build: iteración local.
- Prod build: optimizada.
- Installer: empaquetado NSIS instalable para usuario final.
