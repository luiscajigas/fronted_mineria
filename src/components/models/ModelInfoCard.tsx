/**
 * Ficha técnica detallada de un modelo.
 *
 * Expone la ecuación de regresión, los coeficientes reales, las métricas y el
 * enlace de descarga al artefacto `.joblib` original.
 */

import { Tarjeta, TarjetaCabecera, TarjetaCuerpo } from "@/components/ui/Card";
import { Insignia } from "@/components/ui/Badge";
import { ICONOS_POR_MODELO, IconoDescarga } from "@/components/ui/Icons";
import { formatearNumero } from "@/lib/utils";
import type { DefinicionModelo } from "@/types/models";

interface ModelInfoCardProps {
  modelo: DefinicionModelo;
}

/**
 * Detalle técnico completo de un modelo.
 */
export function TarjetaInfoModelo({ modelo }: ModelInfoCardProps) {
  const Icono = ICONOS_POR_MODELO[modelo.id];

  const ecuacion = [
    formatearNumero(modelo.coeficientes.intercepto, 4),
    ...modelo.variables.map((variable) => {
      const coeficiente = modelo.coeficientes.coeficientes[variable.nombre] ?? 0;
      const signo = coeficiente >= 0 ? "+" : "−";
      return `${signo} ${formatearNumero(Math.abs(coeficiente), 4)} · ${variable.nombre}`;
    }),
  ].join(" ");

  return (
    <Tarjeta className="flex h-full flex-col">
      <TarjetaCabecera
        icono={<Icono className="size-5" />}
        titulo={modelo.nombre}
        descripcion={modelo.descripcion}
      />
      <TarjetaCuerpo className="flex flex-1 flex-col gap-5">
        <div>
          <h3 className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Variables de entrada
          </h3>
          <ul className="mt-2 space-y-1.5">
            {modelo.variables.map((variable) => (
              <li
                key={variable.nombre}
                className="flex items-baseline justify-between gap-3 text-sm"
              >
                <code className="font-mono text-xs text-zinc-800 dark:text-zinc-200">
                  {variable.nombre}
                </code>
                <span className="text-right text-xs text-zinc-500 dark:text-zinc-400">
                  {variable.etiqueta} · {variable.unidad}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Variable de salida
          </h3>
          <p className="mt-2 text-sm text-zinc-800 dark:text-zinc-200">
            <code className="font-mono text-xs">{modelo.variableObjetivo}</code>{" "}
            <span className="text-zinc-500 dark:text-zinc-400">
              ({modelo.unidadObjetivo})
            </span>
          </p>
        </div>

        <div>
          <h3 className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Ecuación de regresión
          </h3>
          <code className="mt-2 block overflow-x-auto rounded-md bg-zinc-100 px-3 py-2 font-mono text-[11px] leading-relaxed text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
            {modelo.variableObjetivo} = {ecuacion}
          </code>
        </div>

        <div>
          <h3 className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Coeficientes
          </h3>
          <dl className="mt-2 space-y-1">
            {modelo.variables.map((variable) => (
              <div
                key={variable.nombre}
                className="flex items-baseline justify-between gap-3 text-sm"
              >
                <dt className="text-zinc-600 dark:text-zinc-400">
                  {variable.nombre}
                </dt>
                <dd className="font-mono tabular-nums text-zinc-800 dark:text-zinc-200">
                  {formatearNumero(
                    modelo.coeficientes.coeficientes[variable.nombre] ?? 0,
                    6,
                  )}
                </dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-3 border-t border-dashed border-zinc-200 pt-1 text-sm dark:border-zinc-800">
              <dt className="text-zinc-600 dark:text-zinc-400">Intercepto</dt>
              <dd className="font-mono tabular-nums text-zinc-800 dark:text-zinc-200">
                {formatearNumero(modelo.coeficientes.intercepto, 6)}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Métricas en prueba
          </h3>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { etiqueta: "R²", valor: formatearNumero(modelo.metricas.r2, 4) },
              {
                etiqueta: "R² aj.",
                valor: formatearNumero(modelo.metricas.r2Ajustado, 4),
              },
              {
                etiqueta: "MAE",
                valor: formatearNumero(modelo.metricas.mae, 2),
              },
              {
                etiqueta: "RMSE",
                valor: formatearNumero(modelo.metricas.rmse, 2),
              },
            ].map((metrica) => (
              <div
                key={metrica.etiqueta}
                className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <dt className="text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  {metrica.etiqueta}
                </dt>
                <dd className="mt-0.5 font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                  {metrica.valor}
                </dd>
              </div>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {modelo.metricasExigidas.map((metrica) => (
              <Insignia key={metrica} variante="aviso">
                Exigida: {metrica}
              </Insignia>
            ))}
          </div>
        </div>

        <div className="mt-auto border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <a
            href={modelo.rutaJoblib}
            download
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            <IconoDescarga className="size-4" />
            Descargar {modelo.archivoJoblib}
          </a>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Artefacto original de scikit-learn, servido sin modificar.
          </p>
        </div>
      </TarjetaCuerpo>
    </Tarjeta>
  );
}
