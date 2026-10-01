/**
 * Pie de página con la trazabilidad del proyecto.
 */

import { PROYECTO } from "@/config/models";

/**
 * Pie con la información de origen y tecnología.
 */
export function PiePagina() {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl space-y-1.5">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {PROYECTO.nombre}
            </p>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {PROYECTO.origen}
            </p>
          </div>

          <dl className="space-y-1.5 text-sm">
            <div className="flex gap-2">
              <dt className="text-zinc-500 dark:text-zinc-400">Frontend</dt>
              <dd className="text-zinc-700 dark:text-zinc-300">
                {PROYECTO.tecnologia}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-zinc-500 dark:text-zinc-400">Modelos</dt>
              <dd className="text-zinc-700 dark:text-zinc-300">
                scikit-learn · regresión lineal múltiple
              </dd>
            </div>
          </dl>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
          Las predicciones son estimaciones estadísticas basadas en los datos de
          entrenamiento. Solo son válidas dentro del rango de valores
          observado en dicho entrenamiento, que la interfaz valida en cada
          campo.
        </p>
      </div>
    </footer>
  );
}
