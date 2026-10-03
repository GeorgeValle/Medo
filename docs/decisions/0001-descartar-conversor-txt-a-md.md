# Decisión 0001: descartar el conversor TXT→MD

- **Fecha de confirmación registrada:** 2026-10-03
- **Estado:** decisión vigente del propietario

## Contexto

El MVP incluyó inicialmente planes y una implementación de conversión heurística de texto plano a Markdown. La interfaz productiva dejó de exponer el conversor tras comprobarse su bajo valor para el flujo principal. Esta fecha registra la confirmación documental de una decisión existente; no pretende establecer la fecha original de retirada.

## Decisión del propietario

La conversión TXT→MD queda descartada definitivamente porque no aporta valor al MVP. No se pospone ni se planifica para una versión futura. Los objetivos anteriores de la [fase 03](../phases/phase-03-txt-to-md.md) y de la [especificación del módulo](../modules/txt-to-md-converter.md) quedan históricos e inactivos.

## Razones

- El flujo central de Medo es editar Markdown local con vista previa, apertura y guardado de documentos.
- Las heurísticas del conversor agregan complejidad y riesgo de falsos positivos sin beneficio suficiente para el MVP.
- Mantener el conversor como objetivo futuro produciría una expectativa contraria al alcance vigente.

## Consecuencias

- El conversor no forma parte del alcance vigente, de los módulos productivos ni del roadmap futuro.
- La apertura de archivos `.txt` es una capacidad existente, separada de la conversión, y permanece disponible en el editor.
- El código histórico del conversor se conserva fuera de la UI productiva para preservar la historia del repositorio.
- Esta decisión no autoriza eliminar ni modificar ese código. Una eventual limpieza requiere una tarea futura separada, con su propio alcance y validación.
- Los [requisitos del proyecto](../project-requirements.md) reflejan esta decisión; los documentos anteriores se conservan únicamente como historia.
