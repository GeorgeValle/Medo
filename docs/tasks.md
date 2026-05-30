## Estado actual (v0.9.6 - 2026-05-30)
- Objetivo de esta iteración: agregar soporte MVP para enlaces internos tipo anchor en Markdown y una acción simple para insertar una tabla de contenidos desde los headings del documento. Pulido final pre-merge: mover el botón “Tabla de contenidos” al final de la toolbar y ampliar el texto del Manual de uso sobre links internos/TOC.
- Decisión técnica adoptada: centralizar slugs y extracción de headings en `src/lib/markdown/headingAnchors.ts`; reutilizar esos slugs en el render Markdown y en Exportar HTML mediante `renderMarkdown`. Follow-up pre-merge: se exportó `extractHeadingPlainText` y se usa también al asignar IDs renderizados para que headings con links, imágenes, énfasis o código inline compartan slug con la tabla de contenidos.
- Alcance exacto: headings renderizados con `id` estable; links `#...` interceptados dentro del panel de preview con scroll al heading local; acción “Tabla de contenidos” al final de la toolbar; HTML standalone exportado con anchors funcionales; manual y changelog actualizados para que Novedades muestre `0.9.6`.
- Validación funcional cubierta por tests unitarios: slugify con español/acentos/signos/espacios, extracción de texto visible en Markdown inline, duplicados, fences, generación de tabla de contenidos, IDs en render Markdown y anchors en Exportar HTML sin UI interna de copiado.
- Sin cambios en lógica de ventana, cierre nativo, borrador local, Nuevo/Abrir/Guardar/Guardar como, Imprimir / Guardar como PDF ni preferencias locales.
- Advertencia permanente: no reintroducir `onCloseRequested`, `getCurrentWindow().close()` ni `pendingAction = "close"`.

## Validaciones v0.9.6
- `pnpm install`: ejecutado correctamente; lockfile ya estaba actualizado. Advertencia informativa de pnpm: scripts de build de `esbuild` ignorados hasta aprobarlos explícitamente.
- `pnpm lint`: ejecutado correctamente; TypeScript no reportó errores.
- `pnpm test`: ejecutado correctamente; 11 archivos de test y 87 tests pasaron. Chequeo manual por código: el botón “Tabla de contenidos” conserva `onClick={insertTableOfContents}` y queda después del grupo de acciones de formato/inserción; el Manual de uso muestra el texto ampliado y el ejemplo Markdown solicitado.
- `pnpm build`: ejecutado correctamente; Vite generó `dist/` sin advertencias de chunks grandes.
- `pnpm tauri:build`: limitado por entorno Linux; el build frontend previo corre correctamente, pero la compilación Tauri falla en `glib-sys` porque no está disponible `glib-2.0.pc`/GLib vía `pkg-config`. Impacto: no se puede validar el instalador Tauri/NSIS en este runner. Siguiente acción: ejecutar empaquetado final en Windows o en un runner Linux con dependencias GTK/GLib instaladas.

- [x] v0.4.0: estado visible, confirmación anti-pérdida y borrador local implementado (incluye cierre seguro de ventana).
# Tasks

## Estado general
Completado: v0.9.6 anchors internos en Markdown, tabla de contenidos básica y Exportar HTML compatible con anchors (sin tocar flujos críticos).

## Fase actual
Phase 05 - Release.


## Roadmap hacia 1.0
- 0.6.0 — Exportación HTML inicial
- 0.6.1 — Validación manual post-exportación y fixes chicos
- 0.7.0 — Exportación PDF o editor Markdown avanzado
- 0.8.0 — Preferencias locales y UX persistente
- 0.9.6 — Anchors internos y tabla de contenidos
- 0.9.5 — Polish visual del preview Markdown
- 0.9.4 — Polish técnico del build/bundling
- 0.9.3 — Polish visual del menú Medo por tema
- 0.9.2 — README profesional + GPLv3
- 0.9.1 — Hotfix release candidate
- 0.9.0 — Release candidate
- 1.0.0 — Stable Windows

## Checklist por fase
- [x] Base Tauri + React + TS + Vite + pnpm
- [x] Estructura de carpetas inicial
- [x] Documentación base
- [x] UI inicial con CSS Modules
- [x] Editor Markdown (CodeMirror)
- [x] Preview Markdown
- [x] Integración inicial abrir/guardar/guardar como
- [x] Configuración inicial Tauri Windows NSIS
- [x] CI inicial
- [ ] Validación de empaquetado final en runner Windows (NSIS)
- [ ] Validación manual final en Windows instalado

## Completadas
- v0.9.6 (anchors internos y tabla de contenidos, esta iteración): se agregó helper puro para slugs/headings/TOC, headings con IDs estables en preview y Exportar HTML, navegación local de links `#...` dentro del panel de preview y botón “Tabla de contenidos” al final de la toolbar. Follow-up pre-merge: `extractHeadingPlainText` queda exportado y compartido por el builder de anchors/TOC y por `renderMarkdown` para que headings con links, imágenes, énfasis o código inline generen IDs iguales a los links del índice. Pulido final: texto del Manual de uso ampliado para explicar links internos, generación automática de tabla de contenidos y preservación de anchors al exportar HTML. Changelog y manual actualizados para que Acerca/Novedades muestre `0.9.6`. Validación: `pnpm install`, `pnpm lint`, `pnpm test` (87 tests) y `pnpm build` OK; `pnpm tauri:build` queda bloqueado en Linux por falta de `glib-2.0`/pkg-config del entorno. Sin cambios en cierre nativo, borrador local, Nuevo/Abrir/Guardar/Guardar como, Imprimir / Guardar como PDF ni preferencias locales. Advertencia permanente: no reintroducir `onCloseRequested`, `getCurrentWindow().close()` ni `pendingAction = "close"`.
- v0.9.5 (polish visual del preview Markdown, esta iteración): se mejoró el contraste de encabezados de tabla (`th`) en tema claro mediante variables semánticas y se ajustaron los bloques de código del preview (`pre`, `pre code` y `.codeBlockWrap`) para evitar mini scroll horizontal innecesario en contenido corto, manteniendo scroll horizontal cuando el código realmente desborda. Se alineó versión a `0.9.5` en `package.json`, `tauri.conf.json`, `Cargo.toml` y entrada `medo` de `Cargo.lock`, y se agregó changelog. Validación: `pnpm install`, `pnpm lint`, `pnpm test` y `pnpm build` OK; `pnpm tauri:build` queda bloqueado en Linux por falta de `glib-2.0`/pkg-config del entorno. Sin cambios funcionales: no se tocó cierre nativo, borrador local, editor, shortcuts, Nuevo/Abrir/Guardar/Guardar como, Exportar HTML, Imprimir / Guardar como PDF ni preferencias locales. Advertencia permanente: no reintroducir `onCloseRequested`, `getCurrentWindow().close()` ni `pendingAction = "close"`.
- v0.9.4 (polish técnico del build/bundling, esta iteración): se agregó `build.rollupOptions.output.manualChunks` en Vite para separar chunks dedicados de React (`react`, `react-dom`), CodeMirror (`@codemirror/commands`, `@codemirror/lang-markdown`, `@codemirror/state`, `@codemirror/view`), `markdown-it` y `lucide-react`; se alineó versión a `0.9.4` en `package.json`, `tauri.conf.json`, `Cargo.toml` y entrada `medo` de `Cargo.lock`, y se agregó changelog. Validación: `pnpm install`, `pnpm lint`, `pnpm test` y `pnpm build` OK; `pnpm build` genera chunks principales por debajo de 500 kB (`codemirror` 465.34 kB) sin warning de Vite; `pnpm tauri:build` queda bloqueado en Linux por falta de `glib-2.0`/pkg-config del entorno. Sin cambios funcionales: no se tocó cierre nativo, borrador local, Nuevo/Abrir/Guardar/Guardar como, Exportar HTML, Imprimir / Guardar como PDF ni preferencias locales. Advertencia permanente: no reintroducir `onCloseRequested`, `getCurrentWindow().close()` ni `pendingAction = "close"`.
- v0.9.3 (polish visual menor, esta iteración): se invirtió el contraste del botón y menú Medo según tema mediante variables CSS semánticas; en tema claro y sistema claro se conserva la apariencia oscura existente, mientras que en tema oscuro y sistema oscuro el botón y desplegable usan apariencia clara con texto oscuro legible y estados hover/active/focus visibles. Se alineó versión a `0.9.3` en `package.json`, `tauri.conf.json`, `Cargo.toml` y entrada `medo` de `Cargo.lock`, y se agregó changelog. Sin cambios en cierre nativo, borrador local, Nuevo/Abrir/Guardar/Guardar como, Exportar HTML, Imprimir / Guardar como PDF ni preferencias locales. Advertencia permanente: no reintroducir `onCloseRequested`, `getCurrentWindow().close()` ni `pendingAction = "close"`.
- v0.9.2 (release candidate/documentación, esta iteración): README reescrito con badges, secciones semánticas, funcionalidades, descarga futura sin enlaces inventados, desarrollo local, contacto, licencia y roadmap; agregado `LICENSE` GPLv3; metadata de licencia en `package.json` y `src-tauri/Cargo.toml`; versión alineada a `0.9.2` en `package.json`, `tauri.conf.json`, `Cargo.toml` y entrada `medo` de `Cargo.lock`; changelog actualizado. Sin cambios en cierre nativo, borrador local, filesystem, exportaciones, impresión/PDF ni preferencias locales.
- v0.9.1 (hotfix RC, esta iteración): estado alineado a `v0.9.1`; corregido versionado/metadata en `package.json`, `tauri.conf.json`, `Cargo.toml` y entrada `medo` de `Cargo.lock`; corregida ruta UNC de WSL en README para formato pegable (`\\wsl$\Ubuntu\home\usuario\proyecto\README.md`); corregido contraste del Manual de uso en tema claro usando variables semánticas (sin hardcodes incompatibles). Sin cambios en cierre nativo, borrador local, filesystem ni exportaciones. Advertencia permanente: no reintroducir `onCloseRequested`, `getCurrentWindow().close()` ni `pendingAction = "close"`.
- v0.9.0 (esta iteración): se documentó oficialmente que Medo puede abrir, editar y guardar archivos `.md` ubicados en WSL mediante rutas UNC de Windows (`\\\wsl$\\...`) pegadas en el diálogo Abrir; se validó manualmente el flujo abrir → editar → guardar y la verificación desde WSL con `cat`, sin integrar plugins WSL ni ejecutar `wsl.exe`, y sin cambios en cierre nativo, borrador local, Exportar HTML ni Imprimir / Guardar como PDF.
- v0.8.2 (esta iteración): se aplicó polish visual del layout inferior reduciendo de forma notoria la franja vacía bajo el workspace y bajando la línea separadora inferior mediante estructura flex vertical más estable (`.app` en columna y `.workspace` flexible), manteniendo scroll interno en editor/preview sin scroll global de ventana; sin cambios en cierre nativo, borrador local, exportaciones ni preferencias. Advertencia permanente: no reintroducir `onCloseRequested`, `getCurrentWindow().close()` ni `pendingAction = "close"`.
- v0.8.1 (esta iteración): se agregaron estilos `@media print` al HTML limpio standalone para forzar fondo blanco y tipografía oscura legible en impresión/Guardar como PDF (headings, párrafos, listas, links, code inline y `pre code`), sin alterar preview interno ni temas claro/oscuro de la app; Exportar HTML e Imprimir/Guardar como PDF se mantienen, y no se tocó cierre nativo ni borrador local. Advertencia permanente: no reintroducir `onCloseRequested`, `getCurrentWindow().close()` ni `pendingAction = "close"`.
- Follow-up v0.8.0 fix de contraste para código inline en preview (esta iteración): se agregaron variables semánticas `--color-inline-code-bg`, `--color-inline-code-text` y `--color-inline-code-border` en `global.css` con valores seguros para oscuro/claro/sistema, y el selector `.preview :not(pre) > code` ahora consume estas variables para mantener legibilidad en tema claro sin alterar el estilo de bloques de código fenced.
- Follow-up v0.8.0 fix de contraste tema claro/sistema (esta iteración): se introdujeron variables semánticas de tema en `global.css` para editor/controles/modales/foco, CodeMirror y toolbar del editor ahora consumen esas variables (sin colores oscuros hardcodeados), y se migraron controles del modal de Preferencias y del modal principal de la app para mantener contraste legible en tema oscuro, claro y sistema.
- v0.8.0 (esta iteración): preferencias locales versionadas `medo.preferences.v1` separadas del borrador local `medo.localDraft.v1`; modal de Preferencias en menú Medo con tema persistente (`system/dark/light`) y tamaño de fuente del editor persistente (`small/normal/large`); sin cambios en cierre nativo, sin cambios en lógica de borrador local, y sin cambios funcionales en Exportar HTML ni en Imprimir / Guardar como PDF. Advertencia permanente: no reintroducir `onCloseRequested`, `getCurrentWindow().close()` ni `pendingAction = "close"`.
- Follow-up v0.7.2 fix P2 review (esta iteración): `exportDocumentAsPdf` ahora envuelve `focus()/print()` en `try/finally` para programar siempre `cleanupFrame(iframe)` incluso si el entorno WebView/printer lanza excepción; se preserva el error original y se mantiene el camino inmediato `iframe.remove()` cuando `contentWindow/print` no está disponible. Se agregó test unitario para validar que si `print()` falla, el iframe igual se limpia por timer.
- Hotfix v0.7.2 PDF/impresión (esta iteración): se retiró la dependencia de `window.open()` por baja confiabilidad en Tauri/WebView Windows y se implementó impresión del sistema con `iframe` temporal oculto que escribe el mismo HTML limpio de Exportar HTML; el flujo ya no solicita ruta `.pdf` previa porque no existe exportación silenciosa directa a archivo, y se corrigió además el error TypeScript TS2493 en `pdfExport.test.ts` ajustando mocks/tests al nuevo mecanismo. Mantener advertencia permanente: no reintroducir `onCloseRequested`, `getCurrentWindow().close()` ni `pendingAction = "close"`.
- Follow-up v0.7.1 fix review (esta iteración): el popup de impresión PDF en Windows ahora se abre sin `noopener/noreferrer` para conservar un handle válido (`window.open`) y evitar `null` en WebView moderno; se agregó cobertura unitaria para verificar explícitamente que el flujo abre `open("", "_blank")`, escribe HTML limpio y ejecuta `print()`, manteniendo cancelación (`false`) y fallback no-Windows con mensaje claro.
- Follow-up v0.6.9 hotfix persistencia local (esta iteración): la persistencia de borrador local ahora usa debounce (~400ms) en lugar de escritura por tecla, se agregó flush final en `pagehide`/`beforeunload`/`visibilitychange` (`hidden`) y se coordinó limpieza de snapshot en memoria + cancelación de timer + `localStorage.removeItem` para evitar restaurar borradores stale tras guardar/guardar como/descartar/abrir.
- Follow-up v0.6.8 rollback cierre nativo (esta iteración): se retiró el sistema de cierre interceptado (`onCloseRequested`, `pendingAction=close`, `getCurrentWindow().close()`) porque seguía rompiendo el cierre real; se restauró el cierre nativo de Tauri/Windows, se mantuvo la protección de cambios pendientes para `Nuevo` y `Abrir`, y la protección ante cierre ahora se basa en borrador local con persistencia inmediata + recuperación al iniciar.
- Follow-up v0.6.7 cierre con regresión (esta iteración): se extrajo lógica mínima testeable del flujo de cierre, se agregaron pruebas unitarias para casos sin cambios/cancelar/descartar/guardar/error y prueba de configuración Tauri para asegurar `core:window:allow-close` + label de ventana `main` consistente entre `default.json` y `tauri.conf.json`; además se dejó mensaje de error técnico explícito de cierre para facilitar diagnóstico y reintento.

- Follow-up v0.6.6 hotfix cierre runtime (esta iteración): se agregó la capability mínima `core:window:allow-close` en `src-tauri/capabilities/default.json` para permitir `getCurrentWindow().close()` en Tauri 2 sin error de permisos; versión alineada a 0.6.6 en frontend/Tauri/Rust + entrada de changelog para el cierre confirmado desde modal.
- Follow-up v0.6.5 post-validación real (esta iteración): reparación del cierre definitivo de app tras Guardar/Descartar con manejo de error detallado en cierre; reducción efectiva de espacio inferior real del workspace; tabs de Acerca con apariencia de pestañas conectadas y activa más perceptible; versión alineada a 0.6.5 + changelog actualizado.
- Follow-up v0.6.4 post-validación manual (esta iteración): estabilizado el flujo de cierre con guardia de `onCloseRequested` para evitar estado atrapado al cerrar con cambios pendientes; aclaración breve en Manual de uso sobre apertura/edición de `.txt` y uso de `Guardar como`; compactación adicional del espacio inferior del layout principal; pulido de tabs en `Acerca de Medo` (activa más clara, apariencia de pestaña conectada y hover/focus mantenidos).
- Follow-up v0.6.3 manual de uso (esta iteración): menú `Medo` ahora incluye `Manual de uso` entre `Exportar HTML` y `Acerca`; se agrega modal dedicado de ayuda con scroll interno, cierre por botón/backdrop y atributos accesibles (`role="dialog"`, `aria-modal`, `aria-label`); contenido estructurado en `src/data/userGuide.ts` con guía básica de Markdown, ejemplos de toolbar/exportación HTML/árboles de carpetas; bump de versión a `0.6.3` y entrada de changelog correspondiente.
- Follow-up v0.6.2 visual polish (esta iteración): reducción de espacio inferior del layout principal conservando divisor inferior y scroll interno de editor/preview; pestañas del modal "Acerca de Medo" con apariencia real de tabs (estado activo, hover/focus, borde inferior) y semántica accesible reforzada (`tablist/tab/tabpanel`, `aria-selected`, `aria-controls`) más navegación opcional con flechas; ajuste menor de alineación visual de estado bajo "Vista previa" y balance del botón/menú `Medo` dentro del tema oscuro.
- Follow-up pre-merge v0.6.1 (esta iteración): `saveDocumentAs` ahora preserva la carpeta padre original al sugerir `defaultPath` para documentos renombrados (soporta separadores Unix/Windows), y `renderMarkdown` evita regex frágil al desactivar UI de copiado desde el renderer de fenced code; se agregan pruebas unitarias para helper de ruta sugerida y para export/render limpio de bloques `<pre><code>` con clase de lenguaje y símbolos de árbol.
- Follow-up v0.6.1 fixes post-validación manual (esta iteración): exportación HTML limpia sin UI interna de copiado en bloques de código; `Guardar` ahora deriva a `Guardar como` cuando cambia el nombre visible de un documento con `path`; ajuste defensivo del cierre de ventana para evitar estado pendiente colgado tras recuperación de borrador/cierre forzado; se recomienda colocar árboles de carpetas dentro de bloques de código para preservar alineación en preview/exportación.
- Follow-up pre-merge lockfile v0.6.0 (esta iteración): se corrigió `src-tauri/Cargo.lock` restaurando versiones de dependencias al estado base válido y dejando únicamente el paquete `medo` en `0.6.0`, eliminando versiones no SemVer que bloqueaban `cargo`/`tauri build`.
- Follow-up v0.6.0 export HTML (esta iteración): menú Medo incorpora `Exportar HTML`, helper dedicado para HTML standalone (título escapado, estilos embebidos, nombre sugerido `.html` por `displayName`), manejo de cancelación sin error y `try/catch` integral para `save(...)` + `writeTextFile(...)` con mensaje `Error al exportar HTML. Detalle: ...`, junto con tests unitarios de generación HTML.
- Follow-up fix tree helpers pre-merge v0.4.1 (esta iteración): `insertTreeSymbol` ahora inserta siempre en una nueva línea debajo cuando la línea actual tiene contenido (incluyendo cuando existe `\n` siguiente), preserva sufijo sin mutar la línea actual y agrega regresiones para `treeBranch`/`treeSubdirectory`/`treeLast` con escenario `src/\nnext`.
- Follow-up pre-merge v0.4.1 (esta iteración): versión de app alineada a `0.4.1` en `package.json`, `src-tauri/tauri.conf.json`, `src-tauri/Cargo.toml` y `src-tauri/Cargo.lock` para coincidir con la nueva entrada de changelog.
- Follow-up toolbar/changelog (esta iteración): se agregan botones compactos `Rama de carpeta`, `Subdirectorio` y `Último directorio` para insertar símbolos Unicode de árbol en Markdown, y la bitácora de `Novedades` ahora incluye fecha de implementación (`YYYY-MM-DD`) por entrada.
- Follow-up pre-merge v0.4.0 (esta iteración): `updateDocumentDisplayName` ya no marca estado sucio si el nombre normalizado no cambia, `updateDocumentContent` preserva estado sucio por renombre pendiente, y se limpia borrador local automáticamente cuando `hasUnsavedChanges` vuelve a `false`.
- Follow-up fix v0.4.0 safe-close (esta iteración): se intercepta el cierre real de ventana con `onCloseRequested`, se reutiliza el modal de cambios sin guardar con acción pendiente `close`, y `Guardar/Descartar/Cancelar` ahora cubren también el cierre de app sin pérdida de borrador.
- Follow-up fix pre-merge v0.3.0 (esta iteración): se agregan permisos `opener:default` y `os:default` en `src-tauri/capabilities/default.json`, se corrige el primer agradecimiento en "Créditos" y se reformatea `src/App.module.css` sin cambios de comportamiento.
- Follow-up copy créditos v0.3.0 (esta iteración): se ajusta el primer agradecimiento en la pestaña "Créditos" del modal "Acerca de" para incluir a Codex Cloud y el texto final solicitado.
- Follow-up UX/release v0.3.0 (esta iteración): el modal existente de "Acerca de" evoluciona a modal con pestañas ("Acerca de", "Novedades", "Reportar problema", "Créditos"), changelog renderizado desde `src/data/changelog.ts`, formulario para abrir GitHub Issues prellenado y copiar diagnóstico básico; versión alineada a `0.3.0` en frontend/Tauri/Rust.
- Follow-up UI/release (esta iteración): se agrega divisor inferior bajo el workspace de editor/preview con el mismo estilo del divisor superior y se reduce notablemente el espacio inferior; versión de app alineada a `0.2.0` en frontend/Tauri/Rust.
- Follow-up release/icon config (esta iteración): CI de Windows deja de generar `src-tauri/icons/icon.ico` temporal; `bundle.icon` en Tauri se fija a archivos reales versionados (`32x32`, `128x128`, `icon.icns`, `icon.ico`); versión de app alineada a `0.1.1` en frontend/Tauri/Rust para pruebas de caché de iconos en Windows.
- Follow-up UI/branding (esta iteración): menú `Medo` movido al header del panel de editor junto a `Editor Markdown`, uso de imagen de marca `medo-head.png` en botón, retiro del área superior vacía y conservación de línea divisoria superior.
- Follow-up fix pre-merge: globalización completa de selectores CSS Modules para markup inyectado del botón de copiar en preview (`.icon`, `.iconCopy`, `.iconCheck`, `.iconError`, `.codeCopyTooltip`) para respetar estados `idle/copied/error` sin iconos apilados.
- Follow-up fix post-validación visual: separación Markdown segura para `Separador` y bloques de tabla (`Tabla`/`Fila`/`Columna`) evitando setext/pegado con texto adyacente; botón de copiar en preview corregido con selectores CSS Modules `:global(...)`; acción `Tachado` (`~~texto~~`) agregada en toolbar con tests de regresión para spacing/formato y markup del botón de copia.
- Ajuste de plantillas con selección en `separator`, `link` e `image` para terminar con salto de línea final y evitar concatenación con contenido posterior; se agregan tests de regresión con selección en medio del documento.
- Ajuste de formato Markdown con selección: acciones directas (negrita/cursiva/código/cita/listas/encabezados) aplican sobre selección y acciones ambiguas (enlace/imagen/separador) conservan selección e insertan plantilla debajo, con cobertura de tests unitarios.
- Validación manual en Windows instalada:
  - `Nuevo` funciona.
  - `Abrir`, `Guardar` y `Guardar como` funcionan para archivos esperados.
  - Preview se actualiza en vivo.
  - No aparece ventana de consola en builds release.
- Corrección de visibilidad de caret en CodeMirror con tema del editor.
- Barra de formato Markdown integrada junto al editor (encabezados, listas, negrita, cursiva, enlace, imagen, cita y código).
- Barra de formato ajustada: `Código inline`, `Bloque código`, `Tabla`, `Fila` y `Columna` con inserciones Markdown predecibles.
- Follow-up UX Windows validado manualmente: caret de CodeMirror con alto contraste (amarillo/blanco) en editor oscuro, cabecera compacta sin subtítulo redundante, botón `Separador` y mejora visual de `code` inline en preview.
- Follow-up UX post-validación manual en Windows: retiro de conversor TXT→MD del layout principal por bajo valor MVP; editor y preview con scroll interno independiente para documentos largos; bloques de código (fenced) con estilo visual diferenciado en preview.
- Corrección en `appendTableColumn` para preservar texto de filas sin `|` final y tests de regresión para ambos casos.
- Follow-up UX post-testing manual en Windows (editor/preview): contención de ancho en layout y bloques de código para evitar scroll horizontal global; sincronización proporcional de scroll editor→preview; selector único de listas (desordenada, numérica, alfabética) con reinicio tras aplicar; limpieza visual de toolbar retirando etiqueta visible “Formato”.
- Follow-up UX Windows (esta iteración): listas alfabéticas secuenciales con continuidad por contexto (`a.`→`b.`→`c.`), contención global de texto largo sin cortes de layout (preview + editor), y botón `Acerca` con modal informativo (proyecto, autor, contacto, versión y fecha).

- Follow-up UX Windows (post-testing manual): botón `Copiar` por bloque de código fenced en preview con feedback básico (`Copiado`/`Error`) y fallback cuando Clipboard API no está disponible.
- Follow-up UX Windows (post-testing manual): estilo de texto verde para bloques de código fenced en preview (sin alterar estilo de `code` inline).
- Follow-up UX Windows (post-testing manual): formato `Checklist` agregado al selector de listas (`- [ ] Elemento`) para selección simple y multilinea.
- Follow-up UX Windows (post-testing manual): continuidad alfabética básica al presionar Enter dentro de ítems `a.`/`b.` en el editor.

- Follow-up UX desktop (esta iteración): menú desplegable `Medo` en cabecera con acciones de archivo y `Acerca`, retiro de fila superior de botones para ganar alto útil en workspace, soporte `Tab`/`Shift+Tab` en CodeMirror con `indentWithTab`, y mejora de bordes/encabezados de tablas Markdown en preview oscura.

- Follow-up UX desktop (esta iteración): pulido visual del botón/menú desplegable `Medo` (estilo sobrio oscuro con espacio para insignia temporal) y navegación completa por teclado en menú (`ArrowUp/Down`, `Home`, `End`, `Escape`, `Enter`, `Space`) con foco accesible.

- Follow-up UX desktop (esta iteración): toolbar de editor Markdown compacta con botones de acción directa en iconos locales (`lucide-react`), tooltips con delay (~0.5s), selectores conservados con texto, y botón de copiar en bloques de código reemplazado por icono con feedback visual (`copiado`/`error`) sin cambiar lógica de formato.
- Pulido de accesibilidad/robustez pre-merge: botones de iconos de la toolbar con `type="button"` preventivo y tooltip visible del botón de copiar sincronizado con los estados `Copiar`/`Copiado`/`Error al copiar`, manteniendo iconos y `data-status`.

## Pendientes
- Ejecutar smoke E2E real de cierre de ventana (Tauri driver/WebDriver) como deuda técnica controlada, manteniendo cobertura unitaria actual del flujo de cierre.
- Ejecutar validación manual completa en Windows con instalador NSIS generado desde CI (confirmar icono final de Medo en instalador/accesos directos tras bump a 0.2.0).
- Confirmar en Windows real que `Abrir/Guardar/Guardar como` funcionan con `.md` y `.txt` en múltiples rutas.
- Confirmar usabilidad de barra de formato Markdown con selección y sin selección (incluye repetir H1/H2/H3 y numeración con líneas en blanco).
- Validar manualmente UX de tabla (`Tabla`, `Fila`, `Columna`) en selección simple y multilinea.
- Exportación PDF (idea futura, fuera de este PR).
- [x] Validación manual de rutas WSL por UNC en Windows para abrir/editar/guardar `.md` (documentada en v0.9.0, sin integración nativa WSL).
- Mejorar continuidad automática alfabética en casos avanzados (p. ej. salir de lista con línea vacía) como seguimiento futuro.

## Bloqueadas
- `pnpm tauri:build` en Linux puede fallar por dependencias GTK/GLib del entorno; usar runner Windows para validación final del instalador e icono en accesos directos.

## Bugs conocidos
- Corregido: numeración de listas ordenadas con líneas en blanco y reinicio del selector de encabezado para aplicar H1/H2/H3 repetidamente.

## Decisiones pendientes
- Estrategia de firma de instalador.
- Política de versiones para releases.

- Follow-up de estructura de proyecto (esta iteración): creadas carpetas `src-tauri/icons` y `src/assets/brand` para organizar íconos y recursos de marca del MVP.
