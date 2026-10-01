/**
 * Cabecera de la aplicación.
 */

import { PROYECTO } from "@/config/models";

/**
 * Barra superior con la identidad del proyecto.
 */
export function Cabecera() {
  return (
    <header className="sticky top-0 z-10 border-b border-indigo-200/70 bg-white/70 backdrop-blur-xl dark:border-indigo-500/20 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 via-violet-600 to-orange-500 text-[11px] font-black text-white shadow-lg shadow-indigo-500/20"
          >
            SS
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              {PROYECTO.nombre}
            </p>
            <p className="hidden truncate text-xs text-indigo-600 sm:block dark:text-indigo-300">
              {PROYECTO.titulo}
            </p>
          </div>
        </div>

        <nav aria-label="Secciones">
          <ul className="flex items-center gap-1 text-sm">
            <li>
              <a
                href="#prediccion"
                className="rounded-md px-2.5 py-1.5 font-medium text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                Predicción
              </a>
            </li>
            <li>
              <a
                href="#metricas"
                className="rounded-md px-2.5 py-1.5 font-medium text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                Métricas
              </a>
            </li>
            <li>
              <a
                href="#modelos"
                className="rounded-md px-2.5 py-1.5 font-medium text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                Modelos
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
