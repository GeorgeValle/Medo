# Phase 03 - TXT to MD

> **Documento histórico y reemplazado.** Este plan ya no está vigente. La [decisión 0001](../decisions/0001-descartar-conversor-txt-a-md.md) registra que el propietario descartó definitivamente la conversión TXT→MD por no aportar valor al MVP; no está pospuesta ni prevista para el futuro.

## Plan histórico (inactivo)

- Objetivo anterior: mejorar conversión TXT→MD.
- Tareas anteriores: reglas avanzadas y más tests.
- Entregable anterior: conversor robusto.
- Criterio anterior: cobertura suficiente.
- Dependencias consideradas: módulos editor y tests.
- Riesgo identificado: falsos positivos en heurísticas.

La capacidad existente de abrir archivos `.txt` en el editor es independiente y permanece vigente. El código histórico del conversor se conserva fuera de la UI productiva; cualquier eliminación futura requiere una tarea separada y no reactiva este plan.
