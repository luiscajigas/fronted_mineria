/**
 * Explicación de la limitación técnica y del método de integración.
 *
 * Este componente documenta de forma visible por qué el navegador no puede
 * ejecutar los `.joblib` y cómo se resuelve la inferencia sin convertirlos a
 * otro formato. Se muestra en la propia interfaz para que la decisión quede
 * documentada junto al producto, no solo en el README.
 */

import { Tarjeta, TarjetaCabecera, TarjetaCuerpo } from "@/components/ui/Card";
import { Alerta } from "@/components/ui/Alert";
import { Insignia } from "@/components/ui/Badge";
import { IconoInformacion } from "@/components/ui/Icons";
import { LISTA_MODELOS } from "@/config/models";

/**
 * Sección que explica la limitación y el mecanismo de integración adoptado.
 */
export function AvisoLimitacion() {
  return (
    <Tarjeta>
      <TarjetaCabecera
        icono={<IconoInformacion className="size-5" />}
        titulo="Cómo se integran los modelos entrenados"
        descripcion="Los tres modelos se entrenaron en Python con scikit-learn y se conservan intactos. Esta sección explica por qué la inferencia no se ejecuta desde el archivo .joblib en el navegador."
      />

      <TarjetaCuerpo className="space-y-5">
        <Alerta tono="info" titulo="Limitación técnica">
          <p>
            Un archivo <code className="font-mono text-xs">.joblib</code> es un
            flujo de bytes de <em>pickle</em> de Python que describe objetos de{" "}
            <code className="font-mono text-xs">scikit-learn</code> y{" "}
            <code className="font-mono text-xs">numpy</code>. El navegador solo
            ejecuta JavaScript, por lo que{" "}
            <strong>
              no puede deserializar ni ejecutar directamente un archivo
              .joblib
            </strong>
            . Es una limitación de plataforma, no una decisión de diseño, y no
            se puede resolver sin un intérprete de Python.
          </p>
        </Alerta>

        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Solución adoptada: coeficientes exportados
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Una regresión lineal múltiple se define por completo con su
            intercepto y sus coeficientes. El pipeline de Python ya los exporta
            a <code className="font-mono text-xs">results/&lt;modelo&gt;/modelo.json</code>{" "}
            a partir del <code className="font-mono text-xs">.joblib</code>
            {" "}entrenado, y el frontend evalúa exactamente la misma expresión
            aritmética que ejecuta{" "}
            <code className="font-mono text-xs">LinearRegression.predict</code>:
          </p>
          <code className="mt-3 block overflow-x-auto rounded-md bg-zinc-100 px-3 py-2 font-mono text-xs text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
            ŷ = β₀ + β₁·x₁ + β₂·x₂ + β₃·x₃
          </code>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            No es una aproximación: al usar los mismos coeficientes y la misma
            aritmética de coma flotante IEEE 754, el resultado coincide con el
            del modelo de Python.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Artefactos originales conservados
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Los tres <code className="font-mono text-xs">.joblib</code> se
            distribuyen sin modificar en{" "}
            <code className="font-mono text-xs">public/models/</code> y pueden
            descargarse desde la sección de información de cada modelo. No se
            convirtieron a ONNX ni a ningún otro formato, y no se volvió a
            entrenar ningún modelo.
          </p>
          <ul className="mt-3 space-y-2">
            {LISTA_MODELOS.map((modelo) => (
              <li key={modelo.id} className="flex flex-wrap items-center gap-2">
                <Insignia variante="neutra">{modelo.archivoJoblib}</Insignia>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {modelo.variables.length} variables ·{" "}
                  {modelo.variableObjetivo}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Consecuencia en el despliegue
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            La aplicación es completamente estática: no necesita backend, ni
            servidor de predicciones, ni base de datos. Puede desplegarse en
            cualquier plataforma que sirva archivos estáticos. Si en el futuro
            se quisiera ejecutar el <code className="font-mono text-xs">.joblib</code>{" "}
            original en servidor, bastaría añadir un servicio de Python que lo
            cargara con <code className="font-mono text-xs">joblib.load</code>,
            sin tocar el frontend ni reentrenar nada.
          </p>
        </div>
      </TarjetaCuerpo>
    </Tarjeta>
  );
}
