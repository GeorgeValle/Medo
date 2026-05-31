# 🛡️ Medo

**Editor Markdown de escritorio para Windows, construido con Tauri 2 + React + TypeScript.**

Medo es una app de escritorio para escribir, previsualizar, guardar y exportar documentos Markdown de forma local, sobria y confiable. Su prioridad es proteger el texto escrito y ofrecer un flujo simple sin depender del navegador.

![Tauri](https://img.shields.io/badge/Tauri-2-24C8DB?style=for-the-badge&logo=tauri&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=111827)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-editor-000000?style=for-the-badge&logo=markdown&logoColor=white)
![Windows](https://img.shields.io/badge/Windows-soporte_inicial-0078D4?style=for-the-badge&logo=windows&logoColor=white)
![Stable](https://img.shields.io/badge/estado-estable_1.0.0-16A34A?style=for-the-badge)
![GPLv3](https://img.shields.io/badge/License-GPLv3-blue?style=for-the-badge)

---

## ✨ ¿Qué es Medo?

Medo es una aplicación de escritorio enfocada en edición Markdown local. Está pensada para abrir, escribir, revisar y guardar archivos `.md` sin complicación, con una vista previa en vivo y herramientas prácticas para exportar o imprimir el resultado.

No busca ser Word, un dashboard ni una suite de productividad pesada. Su objetivo es ser un editor claro, rápido y confiable para trabajar con texto Markdown desde el escritorio.

**Estado actual:** versión estable inicial **1.0.0** para Windows. La distribución pública se realiza desde GitHub Releases.

---

## 🚀 Funcionalidades principales

| Área | Funcionalidad |
| --- | --- |
| Escritura | Editor Markdown con barra de formato y tamaño de fuente configurable. |
| Revisión | Vista previa en vivo del documento renderizado. |
| Archivos | Abrir `.md` y `.txt`, guardar y guardar como. |
| Seguridad del texto | Recuperación de borrador local para reducir pérdida accidental de contenido. |
| Identidad del documento | Nombre visible del archivo actual y protección ante cambios sin guardar. |
| Exportación | Exportar HTML limpio, sin UI interna de la app. |
| PDF | Imprimir / Guardar como PDF usando el diálogo del sistema. |
| Preferencias | Tema claro, oscuro o sistema con persistencia local. |
| Ayuda | Manual de uso integrado, sección Acerca, Novedades y Reportar problema. |
| WSL práctico | Abrir, editar y guardar archivos `.md` dentro de WSL mediante rutas UNC de Windows. |

---

## 🪟 Plataforma oficial inicial

Windows es la plataforma oficial inicial de Medo.

- **Windows:** soporte estable inicial y objetivo principal del instalador `1.0.0`.
- **WSL:** uso práctico mediante rutas UNC de Windows para abrir y guardar archivos Markdown dentro de distribuciones WSL.
- **Linux/macOS:** posibles instaladores futuros; no son plataformas estables de usuario final en esta primera release pública.

El proyecto usa Tauri 2 y tecnologías multiplataforma, pero la validación principal de instalador, accesos directos y flujo de escritorio se concentra en Windows.

---

## 🧭 Uso con WSL

Medo puede trabajar de forma práctica con archivos Markdown dentro de WSL usando rutas UNC pegadas en el diálogo **Abrir** de Windows.

Ejemplo:

```text
\\wsl$\Ubuntu\home\usuario\proyecto\README.md
```

Una vez abierto, el archivo se puede editar y guardar normalmente desde Medo.

> Esta capacidad usa el acceso a archivos Windows/WSL disponible en el sistema. Medo no ejecuta comandos WSL, no invoca `wsl.exe` y no agrega una integración nativa específica con WSL.

---

## 📸 Capturas

Próximamente se agregarán capturas del editor, la vista previa, preferencias y exportaciones.

<!-- ![Editor de Medo](docs/assets/screenshots/editor.png) -->
<!-- ![Preferencias de Medo](docs/assets/screenshots/preferences.png) -->

---

## 📦 Descargar Medo

La versión estable para Windows se descarga desde GitHub Releases:

[Descargar última versión](https://github.com/GeorgeValle/Medo/releases/latest)

También podés ver el historial completo de publicaciones en:

https://github.com/GeorgeValle/Medo/releases

1. Entrá al enlace de descarga.
2. Descargá el instalador `Medo_1.0.0_x64-setup.exe` o el `.exe` más reciente disponible.
3. Ejecutá el instalador.
4. Abrí Medo desde el menú Inicio o el acceso directo.

### Aviso de Windows SmartScreen

Medo todavía no está firmado digitalmente con certificado de editor. Windows puede mostrar una advertencia indicando “Editor desconocido”. Si descargaste Medo desde el release oficial de este repositorio, podés continuar desde “Más información” → “Ejecutar de todas formas”.

La firma digital será evaluada para versiones futuras.

### Verificación del instalador

En cada release se publicará el hash SHA256 del instalador para que puedas verificar que el archivo descargado no fue modificado.

SHA256: pendiente de completar al publicar el release.

En PowerShell:

```powershell
Get-FileHash .\Medo_1.0.0_x64-setup.exe -Algorithm SHA256
```

También puede publicarse un enlace de análisis de VirusTotal como referencia. VirusTotal no certifica la app; solo muestra resultados de múltiples motores antivirus. Si hubiera falsos positivos, se pueden reportar a los vendors correspondientes.

---

## 🛠️ Desarrollo local

### Requisitos

- Node.js compatible con Vite.
- pnpm `10.x`.
- Toolchain de Rust requerido por Tauri 2.
- Dependencias de sistema de Tauri según la plataforma de desarrollo.

### Comandos

```bash
pnpm install
pnpm dev
pnpm test
pnpm build
pnpm tauri:dev
pnpm tauri:build
```

> `pnpm tauri:build` genera el paquete de escritorio. La validación final del instalador NSIS debe realizarse en Windows.

---

## 🧱 Stack técnico

| Capa | Tecnología |
| --- | --- |
| Desktop | Tauri 2 |
| UI | React + TypeScript |
| Bundler | Vite |
| Editor | CodeMirror 6 |
| Markdown | markdown-it |
| Iconos | lucide-react |
| Testing | Vitest |
| Package manager | pnpm |

---

## 📁 Estructura del repositorio

```text
src/        Frontend React, UI, markdown, documentos y datos de la app
src-tauri/ Backend local Rust/Tauri y configuración de empaquetado
docs/       Documentación funcional, técnica y planificación
```

---

## 🧩 Dependencias agregadas al MVP

Medo mantiene un conjunto acotado de dependencias orientadas al MVP:

- CodeMirror 6 para la experiencia de edición.
- markdown-it para renderizar Markdown.
- Tauri API y plugins oficiales para diálogos, filesystem, opener y detección de sistema.
- lucide-react para iconografía local de la UI.
- Vitest para pruebas automatizadas.

No se usan Tailwind, Bootstrap, Material UI, Chakra, CSS-in-JS ni Sass.

---

## 🗺️ Roadmap y próximos pasos

| Versión | Enfoque |
| --- | --- |
| 0.9.x | Release candidates e instalador Windows validado. |
| 1.0.0 | Publicación estable inicial para Windows. |

Futuro posterior a `1.0.0`:

- Capturas oficiales en README.
- Validación más amplia de empaquetado.
- Mejoras incrementales de experiencia de edición.
- Evaluación de soporte estable para otras plataformas, sin comprometer la estabilidad inicial en Windows.

---

## 🤝 Contacto y feedback

Para reportar problemas o sugerir mejoras, usar los Issues del repositorio **GeorgeValle/Medo** en GitHub.

Al reportar un problema, incluir si es posible:

- versión de Medo;
- versión de Windows;
- pasos para reproducir;
- archivo de ejemplo si no contiene información sensible;
- comportamiento esperado y comportamiento observado.

---

## 📄 Licencia

Medo se distribuye bajo los términos de la **GNU General Public License v3.0**.

Ver el archivo [`LICENSE`](LICENSE) para el texto completo de la licencia.
