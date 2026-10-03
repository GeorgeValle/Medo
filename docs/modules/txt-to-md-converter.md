# Módulo: TXT to MD Converter

> **Documento histórico y reemplazado.** Esta especificación ya no define alcance vigente. La [decisión 0001](../decisions/0001-descartar-conversor-txt-a-md.md) registra que el propietario descartó definitivamente la conversión TXT→MD por no aportar valor al MVP; no está pospuesta ni prevista para implementación futura.

## Especificación histórica (inactiva)

- Propósito anterior: convertir texto plano a Markdown.
- Responsabilidad anterior: transformación pura y testeable.
- Alcance inicial anterior: título, párrafos, listas y URL simple.
- Alcance futuro anterior, ahora inactivo: reglas avanzadas.
- Archivos previstos: `src/lib/txt-to-md/*`, `src/components/converter/*`.
- Criterio anterior: tests unitarios aprobados.

Abrir archivos `.txt` en el editor es una capacidad independiente que permanece vigente. La implementación histórica del conversor se conserva fuera de la UI productiva; una eventual eliminación de ese código requiere una tarea separada.
