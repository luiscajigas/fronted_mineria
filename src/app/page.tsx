/**
 * Página principal de la aplicación.
 *
 * Es el único componente con estado de nivel de página: mantiene qué modelo está
 * activo para que el panel principal y la sección de predicción permanezcan
 * sincronizados.
 */

"use client";

import { useState } from "react";
import { Cabecera } from "@/components/layout/Header";
import { PiePagina } from "@/components/layout/Footer";
import { Dashboard } from "@/components/layout/Dashboard";
import { SeccionPrediccion } from "@/components/prediction/PredictionSection";
import { TarjetaInfoModelo } from "@/components/models/ModelInfoCard";
import { AvisoLimitacion } from "@/components/models/TechnicalNotice";
import { LISTA_MODELOS } from "@/config/models";
import type { DefinicionModelo, ModeloId } from "@/types/models";

/**
 * Compone la interfaz completa: panel, predicción, información de modelos y
 * documentación de la integración.
 */
export default function PaginaPrincipal() {
  const [modeloActivo, setModeloActivo] = useState<ModeloId>("dolar");

  /** Lleva al usuario a la sección de predicción con el modelo elegido. */
  function usarModelo(modelo: DefinicionModelo) {
    setModeloActivo(modelo.id);
    // El desplazamiento se realiza tras el repintado para asegurar que la
    // sección ya refleja el modelo seleccionado.
    requestAnimationFrame(() => {
      document
        .getElementById("prediccion")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <>
      <Cabecera />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <Dashboard onUsarModelo={usarModelo} />

        <div className="mt-14">
          <SeccionPrediccion
            modeloActivo={modeloActivo}
            onCambiarModelo={setModeloActivo}
          />
        </div>

        <section id="modelos" aria-labelledby="titulo-info" className="mt-14">
          <h2
            id="titulo-info"
            className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Información de los modelos
          </h2>
          <p className="mt-1 mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            Especificación completa de cada modelo: variables, ecuación,
            coeficientes y métricas de evaluación.
          </p>

          <div className="grid gap-4 xl:grid-cols-3">
            {LISTA_MODELOS.map((modelo) => (
              <TarjetaInfoModelo key={modelo.id} modelo={modelo} />
            ))}
          </div>
        </section>

        <div className="mt-14">
          <AvisoLimitacion />
        </div>
      </main>

      <PiePagina />
    </>
  );
}
