import React, { useState } from "react";

export default function Simulador() {
  const [precioBase, setPrecioBase] = useState(0);
  const [pais, setPais] = useState("EE.UU.");
  const [anio, setAnio] = useState(2021);

  const calcularCostoTotal = () => {
    const flete = 1800; // estimado fijo
    const impuestos = precioBase * 0.35;
    const gastosFijos = 1200; // gestoría, nacionalización, etc.
    const total = parseFloat(precioBase) + flete + impuestos + gastosFijos;
    return total.toFixed(2);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">Simulador de Costos</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Precio del auto (USD)</label>
          <input
            type="number"
            value={precioBase}
            onChange={(e) => setPrecioBase(Number(e.target.value))}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">País de origen</label>
          <select
            value={pais}
            onChange={(e) => setPais(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option>EE.UU.</option>
            <option>Japón</option>
            <option>Alemania</option>
            <option>México</option>
            <option>Chile</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Año del vehículo</label>
          <input
            type="number"
            value={anio}
            onChange={(e) => setAnio(Number(e.target.value))}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-lg font-semibold text-gray-700">Costo total estimado:</p>
        <p className="text-2xl font-bold text-green-600 mt-2">USD {calcularCostoTotal()}</p>
        <p className="text-sm mt-1 text-gray-500">(Incluye flete, impuestos y gestoría)</p>
      </div>
    </div>
  );
}
