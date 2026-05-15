# DESIGN - Medo

## Identidad visual
Medo combina “MD” (Markdown) con una estética sobria inspirada en guerrero medo/inmortal persa: fuerte, antigua y elegante, sin ornamentos excesivos.

## Principios
1. Claridad editorial primero.
2. Contraste alto y lectura cómoda.
3. Jerarquía visual simple.

## Paleta inicial
- Fondo: `#111827`
- Panel: `#1F2937`
- Borde: `#374151`
- Texto principal: `#E5E7EB`
- Acento reservado: `#C89B3C` (uso moderado futuro)

## Tipografía
- UI: `Segoe UI`, `Tahoma`, `Verdana`, sans-serif.
- Código/editor: monoespaciada del sistema.

## Escala y espaciado
- Base: 8px.
- Radio: 6–8px.
- Titulares: 1.25rem–1.75rem.

## Sombras e iconografía
- Sombras suaves, baja opacidad.
- Iconografía lineal simple, sin ilustraciones pesadas en MVP.

## Reglas CSS
- CSS Modules obligatorios por componente.
- Archivo global mínimo permitido para reset/tokens (`src/styles/global.css`).
- Sin CSS-in-JS ni frameworks CSS.

## Responsive
- Layout de dos paneles en escritorio, una columna bajo 960px.

## Claro/Oscuro
- MVP inicial en modo oscuro.
- Preparar tokens para extender a modo claro en fases futuras.
