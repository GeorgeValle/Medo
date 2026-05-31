# Plan de release (Windows)

## Objetivo
Distribuir Medo como instalador de escritorio Windows desde GitHub Releases.

## Release estable actual
- Versión objetivo: `1.0.0`.
- Release recomendado para usuarios finales: <https://github.com/GeorgeValle/Medo/releases/latest>.
- Historial completo: <https://github.com/GeorgeValle/Medo/releases>.
- Notas base: [`docs/releases/v1.0.0.md`](releases/v1.0.0.md).

## Instalador
- Target: NSIS (Tauri bundle).
- Nombre esperado del instalador: `Medo_1.0.0_x64-setup.exe`.
- `installMode`: `currentUser`.
- `startMenuFolder`: `Medo`.
- Icono del instalador: `src-tauri/icons/icon.ico` mediante `bundle.windows.nsis.installerIcon`.
- Idioma NSIS: español.

## Automatización
- El workflow `.github/workflows/ci.yml` mantiene validación de PR/push con tests, build web y build Windows NSIS.
- El workflow `.github/workflows/windows-release.yml` permite generar manualmente el instalador Windows y `SHA256SUMS.txt` como artifacts descargables.
- La publicación del release estable sigue siendo manual para evitar publicar assets incompletos por accidente.

## Verificación de integridad
En cada release se debe publicar el hash SHA256 del instalador.

Ejemplo en PowerShell:

```powershell
Get-FileHash .\Medo_1.0.0_x64-setup.exe -Algorithm SHA256
```

El workflow de release genera `SHA256SUMS.txt` junto al instalador.

## SmartScreen y firma
Medo todavía no está firmado digitalmente con certificado de editor. Windows puede mostrar SmartScreen/“Editor desconocido”. La firma digital se evaluará en versiones futuras.

## VirusTotal
El análisis de VirusTotal puede publicarse manualmente como referencia adicional. VirusTotal no certifica la app; solo muestra resultados de múltiples motores antivirus. Si aparecen falsos positivos, se pueden reportar a los vendors correspondientes.

## Validaciones previas
- `pnpm install`
- `pnpm lint`
- `pnpm test`
- `pnpm build`
- `pnpm tauri:build` en Windows runner
- Confirmar icono de Medo en el instalador NSIS.
- Instalar encima de una versión anterior.
- Desinstalar e instalar limpio.
- Confirmar Acerca y Novedades en `1.0.0`.
- Smoke test manual: Nuevo, Abrir, Guardar, Guardar como, cierre con X, recuperación de borrador, Exportar HTML, Imprimir / Guardar como PDF, preferencias, manual, links internos y tabla de contenidos.

## Pasos manuales para publicar `v1.0.0`
1. Ejecutar el workflow manual **Windows Release** desde GitHub Actions.
2. Descargar artifacts `medo-windows-nsis-1.0.0` y verificar `SHA256SUMS.txt`.
3. Crear el tag `v1.0.0` si todavía no existe.
4. Crear un GitHub Release estable usando `docs/releases/v1.0.0.md` como base.
5. Adjuntar `Medo_1.0.0_x64-setup.exe` y `SHA256SUMS.txt`.
6. Completar el SHA256 real en las notas del release antes de publicar.
7. Opcionalmente agregar un enlace de VirusTotal como referencia, sin presentarlo como certificación.
