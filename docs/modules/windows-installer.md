# Módulo: Windows Installer

Propósito: preparar empaquetado instalable de Medo para Windows.

## Responsabilidades
- Configuración NSIS en `src-tauri/tauri.conf.json`.
- Generación del instalador vigente `Medo_1.0.1_x64-setup.exe` desde Tauri.
- Artifact descargable desde GitHub Actions.
- Generación de `SHA256SUMS.txt` para verificación de integridad.

## Alcance actual 1.0.1
- Target: NSIS.
- `installMode`: `currentUser`.
- `startMenuFolder`: `Medo`.
- `installerIcon`: `icons/icon.ico`.
- Idioma NSIS: español.
- Publicación final en GitHub Releases mediante proceso manual controlado.

## Validación esperada
- `pnpm tauri:build` en `windows-latest`.
- Confirmar que el instalador generado muestra el icono de Medo.
- Instalar encima de una versión anterior y validar app instalada.
- Desinstalar e instalar limpio.
- Confirmar Acerca y Novedades en versión `1.0.1`.

## Seguridad y distribución
- Medo todavía no está firmado digitalmente; SmartScreen puede mostrar “Editor desconocido”.
- El SHA256 del instalador debe publicarse con cada release.
- VirusTotal puede usarse como referencia manual, no como certificación.

## Archivos esperados
- `src-tauri/tauri.conf.json`
- `.github/workflows/ci.yml`
- `.github/workflows/windows-release.yml`
- `docs/releases/v1.0.0.md` (notas históricas de la primera release estable; no corresponden a la release vigente)
