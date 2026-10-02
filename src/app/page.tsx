"use client";

import { useState } from "react";
import { SeccionPrediccion } from "@/components/prediction/PredictionSection";
import type { ModeloId } from "@/types/models";

export default function PaginaPrincipal() {
  const [modeloActivo, setModeloActivo] = useState<ModeloId>("dolar");

  return (
    <div className="app-shell flex min-h-screen flex-col">
      <header className="border-b border-[#d8ded5] bg-[#f8faf6]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#inicio" className="flex items-center gap-3" aria-label="SignalScope, inicio">
            <span className="flex size-9 items-center justify-center rounded-md bg-[#c8f169] text-sm font-black text-[#19241a]">
              S
            </span>
            <span>
              <span className="block text-sm font-bold tracking-tight text-[#1b251d]">SignalScope</span>
              <span className="block text-[11px] text-[#69746a]">Estudio de predicción</span>
            </span>
          </a>
          <span className="hidden items-center gap-2 text-xs font-medium text-[#687368] sm:flex">
            <span className="size-2 rounded-full bg-[#78a843]" />
            3 modelos disponibles
          </span>
        </div>
      </header>

      <main id="inicio" className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-9 flex flex-col justify-between gap-5 border-b border-[#d8ded5] pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#66843f]">
              Laboratorio · Modelos de regresión
            </p>
            <h1 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-[#1b251d] sm:text-4xl">
              Convierte variables en una estimación.
            </h1>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#687368]">
            Selecciona un modelo, introduce sus datos y consulta el resultado al instante.
          </p>
        </div>

        <div className="prediction-workspace">
          <SeccionPrediccion
            modeloActivo={modeloActivo}
            onCambiarModelo={setModeloActivo}
          />
        </div>
      </main>

      <footer className="border-t border-[#d8ded5] bg-[#f8faf6]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-5 text-xs text-[#687368] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>SignalScope <span className="text-[#9aa397]">/</span> Predicción interactiva</span>
          <span>Las estimaciones se basan en las variables ingresadas.</span>
        </div>
      </footer>
    </div>
  );
}
