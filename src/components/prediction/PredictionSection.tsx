/**
 * Sección de predicción.
 *
 * Coordina el selector de modelo, el formulario y la tarjeta de resultado.
 * Es el único componente con estado compartido entre esas tres piezas; toda la
 * lógica de cálculo reside en `@/lib/models`.
 */

"use client";

import { useState } from "react";
import { SelectorModelo } from "@/components/prediction/ModelSelector";
import { FormularioPrediccion } from "@/components/prediction/PredictionForm";
import { TarjetaResultado } from "@/components/prediction/ResultCard";
import { Tarjeta, TarjetaCabecera, TarjetaCuerpo } from "@/components/ui/Card";
import { ICONOS_POR_MODELO } from "@/components/ui/Icons";
import { LISTA_MODELOS } from "@/config/models";
import type { DefinicionModelo, ModeloId, ResultadoPrediccion } from "@/types/models";

interface PredictionSectionProps {
  modeloActivo: ModeloId;
  onCambiarModelo: (id: ModeloId) => void;
}

/**
 * Sección completa de predicción con selección de modelo condicional.
 */
export function SeccionPrediccion({
  modeloActivo,
  onCambiarModelo,
}: PredictionSectionProps) {
  const [resultado, setResultado] = useState<ResultadoPrediccion | null>(null);

  const modelo: DefinicionModelo =
    LISTA_MODELOS.find((m) => m.id === modeloActivo) ?? LISTA_MODELOS[0];
  const Icono = ICONOS_POR_MODELO[modelo.id];

  function cambiarModelo(id: ModeloId) {
    if (id === modeloActivo) return;
    setResultado(null);
    onCambiarModelo(id);
  }

  return (
    <section id="prediccion" aria-labelledby="titulo-prediccion" className="space-y-5">
      <div className="flex flex-col justify-between gap-3 border-b border-zinc-200 pb-4 sm:flex-row sm:items-end dark:border-zinc-800">
        <div>
          <p className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#66843f]">
            Área de trabajo / 01
          </p>
        <h2
          id="titulo-prediccion"
          className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Prepara una estimación
        </h2>
        </div>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Los valores se validan con los rangos observados durante el entrenamiento.
        </p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
              Elige un modelo
            </h3>
            <span className="font-mono text-[10px] text-zinc-400">03 OPCIONES</span>
          </div>
          <SelectorModelo
            modelos={LISTA_MODELOS}
            seleccionado={modeloActivo}
            onSeleccionar={cambiarModelo}
          />
        </aside>

        <div className="min-w-0 space-y-4">
          <Tarjeta>
            <TarjetaCabecera
              icono={<Icono className="size-5" />}
              titulo={modelo.etiquetaObjetivo}
              descripcion={`Variables de entrada del modelo «${modelo.nombre}», en el orden en que fue entrenado.`}
            />
            <TarjetaCuerpo>
              {/* La `key` reinicia el formulario al cambiar de modelo, de modo
                  que los campos correspondan siempre al modelo activo. */}
              <FormularioPrediccion
                key={modelo.id}
                modelo={modelo}
                onResultado={setResultado}
              />
            </TarjetaCuerpo>
          </Tarjeta>
          {resultado ? (
            <TarjetaResultado
              modelo={modelo}
              resultado={resultado}
              onReiniciar={() => setResultado(null)}
            />
          ) : (
            <Tarjeta variante="plana" className="overflow-hidden border-dashed">
              <TarjetaCuerpo className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-md border ${modelo.acento.fondo} ${modelo.acento.borde} ${modelo.acento.texto}`}
                >
                  <Icono className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    Resultado pendiente
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    Completa las variables para ver aquí la estimación y el detalle del cálculo.
                  </p>
                </div>
                <span className="w-fit rounded-sm bg-zinc-100 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  Sin calcular
                </span>
              </TarjetaCuerpo>
            </Tarjeta>
          )}
        </div>
      </div>
    </section>
  );
}
