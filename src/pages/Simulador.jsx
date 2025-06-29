import React, { useState, useEffect } from "react";

function formatearArgentino(numero) {
  const partes = numero.toFixed(2).split(".");
  const entero = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const decimal = partes[1];
  return `${entero},${decimal}`;
}

export default function Simulador() {
  const [fob, setFob] = useState("");
  const [tipo, setTipo] = useState("normal");
  const [total, setTotal] = useState(null);
  const [blueRate, setBlueRate] = useState(null);
  const [errorBlue, setErrorBlue] = useState("");
  const [tooltipActivo, setTooltipActivo] = useState("");

  useEffect(() => {
    fetch("https://api.bluelytics.com.ar/v2/latest")
      .then((r) => r.json())
      .then((data) => {
        const promedio = (data.blue.value_buy + data.blue.value_sell) / 2;
        setBlueRate(promedio);
      })
      .catch(() => setErrorBlue("No se pudo obtener la cotización del dólar."));
  }, []);

  const toggleTooltip = (clave) => {
    setTooltipActivo(tooltipActivo === clave ? "" : clave);
  };

  const calcular = (e) => {
    e.preventDefault();

    const limpio = fob.replace(/\./g, "").replace(",", ".");
    const f = parseFloat(limpio);
    if (!f || f <= 0) return;

    const flete = 2500;
    const base1 = f + flete;
    const arancel = tipo === "normal" ? base1 * 0.35 : 0;
    const tasa = base1 * 0.03;
    const logistica = 1000;
    const varios = (base1 + arancel + tasa + logistica) * 0.10;
    const iva = (base1 + arancel + tasa + logistica + varios) * 0.21;
    const totalImpuestos = arancel + tasa + varios + iva;
    const totUsd = base1 + arancel + tasa + logistica + varios + iva;
    const totArs = blueRate ? totUsd * blueRate : null;

    setTotal({
      fob: f,
      flete,
      arancel,
      tasa,
      logistica,
      varios,
      iva,
      totalImpuestos,
      totalUsd: totUsd,
      totalArs: totArs,
    });
  };

  const Campo = ({ label, valor, clave, children }) => (
    <div className="relative">
      <strong>{label}</strong>: USD {formatearArgentino(valor)}
      <button
        type="button"
        onClick={() => toggleTooltip(clave)}
        className="ml-1 font-bold text-blue-500 cursor-pointer"
      >
        ℹ️
      </button>
      {tooltipActivo === clave && (
        <div className="absolute z-10 w-64 p-2 mt-1 text-sm text-white bg-gray-800 rounded shadow">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded shadow">
      <h1 className="mb-4 text-2xl font-bold text-center">Simulador de Importación</h1>

      {errorBlue && <div className="mb-4 text-sm text-red-600">{errorBlue}</div>}

      <form onSubmit={calcular} className="space-y-4">
        <label>
          Precio FOB (USD):
          <input
            type="text"
            value={fob}
            onChange={(e) => setFob(e.target.value)}
            placeholder="Ej: 25.000"
            className="w-full p-2 border rounded"
            required
          />
        </label>
        <label>
          Tipo de vehículo:
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="normal">Normal</option>
            <option value="hibrido">Híbrido / eléctrico (sin arancel)</option>
          </select>
        </label>
        <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          Calcular
        </button>
      </form>

      {total && (
        <div className="mt-6 space-y-3 text-sm text-gray-700">
          <div><strong>FOB:</strong> USD {formatearArgentino(total.fob)}</div>

          <Campo label="Flete + seguro" valor={total.flete} clave="flete">
            Transporte marítimo y seguro internacional.
          </Campo>

          {tipo === "normal" && (
            <Campo label="Arancel 35%" valor={total.arancel} clave="arancel">
              Impuesto de aduana sobre el valor CIF (FOB + flete).
            </Campo>
          )}

          <Campo label="Tasa 3%" valor={total.tasa} clave="tasa">
            Tasa estadística sobre el valor CIF.
          </Campo>

          <Campo label="Logística local" valor={total.logistica} clave="logistica">
            Despachante, depósito y entrega dentro de Argentina.
          </Campo>

          <Campo label="Impuestos varios 10%" valor={total.varios} clave="varios">
            Ingresos Brutos, Ganancias, sellos, municipales.
          </Campo>

          <Campo label="IVA 21%" valor={total.iva} clave="iva">
            Impuesto al Valor Agregado sobre el total importado.
          </Campo>

          <div className="mt-2 text-base font-medium text-orange-700">
            Total impuestos: USD {formatearArgentino(total.totalImpuestos)}
          </div>

          <div className="mt-2 text-lg font-bold text-gray-900">
            Total estimado: USD {formatearArgentino(total.totalUsd)}
          </div>

          {total.totalArs && (
            <div className="text-base font-semibold text-green-700">
              ≈ ARS {formatearArgentino(total.totalArs)}
            </div>
          )}

          {blueRate && (
            <div className="text-xs text-gray-500">
              Cotización dólar blue: {formatearArgentino(blueRate)} ARS/USD
            </div>
          )}
        </div>
      )}
    </div>
  );
}
