/**
 * Selector del modelo sobre el que se va a predecir.
 *
 * Presenta los tres modelos como opciones excluyentes, indicando las variables
 * de entrada de cada uno para que la elección sea informada.
 */

"use client";

import { ICONOS_POR_MODELO } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import type { DefinicionModelo, ModeloId } from "@/types/models";

interface SelectorModeloProps {
  modelos: readonly DefinicionModelo[];
  seleccionado: ModeloId;
  onSeleccionar: (id: ModeloId) => void;
}

/**
 * Grupo de botones para elegir el modelo activo.
 */
export function SelectorModelo({
  modelos,
  seleccionado,
  onSeleccionar,
}: SelectorModeloProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Selecciona el modelo"
      className="flex flex-col gap-2"
    >
      {modelos.map((modelo, indice) => {
        const Icono = ICONOS_POR_MODELO[modelo.id];
        const activo = modelo.id === seleccionado;

        return (
          <button
            key={modelo.id}
            type="button"
            role="radio"
            aria-checked={activo}
            onClick={() => onSeleccionar(modelo.id)}
            className={cn(
              "group grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-3 rounded-md border-l-[3px] p-3 text-left transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-zinc-300",
              activo
                ? "border-[#47752a] bg-[#e5f0d6]"
                : "border-transparent bg-white/70 hover:border-zinc-300 hover:bg-white dark:bg-zinc-900/50 dark:hover:bg-zinc-900",
            )}
          >
            <span
              className={cn(
                "row-span-3 flex size-10 items-center justify-center rounded-md border",
                activo
                  ? `${modelo.acento.fondo} ${modelo.acento.borde} ${modelo.acento.texto}`
                  : "border-zinc-200 bg-zinc-50 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400",
              )}
            >
              <Icono className="size-[1.15rem]" />
            </span>

            <span className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                {modelo.nombre}
              </span>
              <span className="font-mono text-[10px] tabular-nums text-zinc-400">
                0{indice + 1}
              </span>
            </span>

            <span className="mt-1 font-mono text-[10px] leading-relaxed text-zinc-500 dark:text-zinc-400">
              {modelo.variables.map((v) => v.nombre).join(" · ")}
            </span>

            <span
              className={cn(
                "mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium",
                activo
                  ? "text-[#47752a] dark:text-emerald-300"
                  : "text-zinc-400 dark:text-zinc-500",
              )}
            >
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  activo ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-700",
                )}
              />
              {activo ? "En uso" : "Seleccionar"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
