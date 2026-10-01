/**
 * Panel de presentación del proyecto.
 *
 * Reúne la descripción general, las tarjetas de los tres modelos y las métricas
 * comparadas. Es la primera sección que ve el usuario.
 */

"use client";

import { TarjetaModelo } from "@/components/models/ModelCard";
import { TablaMetricas } from "@/components/models/MetricsTable";
import { Insignia } from "@/components/ui/Badge";
import { LISTA_MODELOS, PROYECTO } from "@/config/models";
import type { DefinicionModelo } from "@/types/models";

interface DashboardProps {
  /** Se invoca cuando el usuario elige predecir con un modelo concreto. */
  onUsarModelo: (modelo: DefinicionModelo) => void;
}

/**
 * Vista general con el propósito del proyecto y los modelos disponibles.
 */
export function Dashboard({ onUsarModelo }: DashboardProps) {
  return (
    <div className="space-y-10">
      <section>
        <div className="flex flex-wrap items-center gap-2">
          <Insignia variante="acento">CRISP-DM</Insignia>
          <Insignia>scikit-learn</Insignia>
          <Insignia>3 modelos</Insignia>
        </div>

        <h1 className="mt-4 bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-500 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
          {PROYECTO.titulo}
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {PROYECTO.descripcion}
        </p>

        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-indigo-200 bg-white/80 px-4 py-3 shadow-sm shadow-indigo-100/70 dark:border-indigo-500/20 dark:bg-slate-900/80 dark:shadow-none">
            <dt className="text-xs font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
              Modelos entrenados
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-50">
              3
            </dd>
          </div>
          <div className="rounded-xl border border-indigo-200 bg-white/80 px-4 py-3 shadow-sm shadow-indigo-100/70 dark:border-indigo-500/20 dark:bg-slate-900/80 dark:shadow-none">
            <dt className="text-xs font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
              Técnica
            </dt>
            <dd className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-50">
              Regresión lineal múltiple
            </dd>
          </div>
          <div className="rounded-xl border border-indigo-200 bg-white/80 px-4 py-3 shadow-sm shadow-indigo-100/70 dark:border-indigo-500/20 dark:bg-slate-900/80 dark:shadow-none">
            <dt className="text-xs font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
              Artefactos
            </dt>
            <dd className="mt-1 font-mono text-sm text-slate-900 dark:text-slate-50">
              .joblib
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="titulo-modelos">
        <h2
          id="titulo-modelos"
          className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Modelos disponibles
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Selecciona un modelo para realizar una predicción con sus variables.
        </p>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {LISTA_MODELOS.map((modelo) => (
            <TarjetaModelo
              key={modelo.id}
              modelo={modelo}
              onUsar={onUsarModelo}
            />
          ))}
        </div>
      </section>

      <section id="metricas" aria-labelledby="titulo-metricas">
        <h2
          id="titulo-metricas"
          className="mb-4 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Resultados obtenidos
        </h2>
        <TablaMetricas />
      </section>
    </div>
  );
}
