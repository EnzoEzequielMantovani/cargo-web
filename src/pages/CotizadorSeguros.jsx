import React, { useState } from "react";

export default function CotizadorSeguros() {
  const [datos, setDatos] = useState({
    marca: "",
    modelo: "",
    anio: "",
  });

  const [resultados, setResultados] = useState([]);

  const aseguradorasMock = [
    { nombre: "La Caja", precio: 8500, cobertura: "Terceros completo" },
    { nombre: "Sancor Seguros", precio: 9700, cobertura: "Todo riesgo con franquicia" },
    { nombre: "Mapfre", precio: 10500, cobertura: "Todo riesgo sin franquicia" },
  ];

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const cotizar = () => {
    if (datos.marca && datos.modelo && datos.anio) {
      setResultados(aseguradorasMock);
    } else {
      alert("Completá todos los campos para cotizar.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Cotizá tu Seguro</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <input
          type="text"
          name="marca"
          placeholder="Marca"
          value={datos.marca}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="modelo"
          placeholder="Modelo"
          value={datos.modelo}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="anio"
          placeholder="Año"
          value={datos.anio}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={cotizar}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Cotizar
      </button>

      {resultados.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Resultados:</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {resultados.map((aseg, i) => (
              <div key={i} className="border p-4 rounded shadow">
                <h3 className="font-bold text-lg">{aseg.nombre}</h3>
                <p>Cobertura: {aseg.cobertura}</p>
                <p className="font-semibold text-blue-600">
                  ${aseg.precio.toLocaleString()}
                </p>
                <button className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                  Solicitar contacto
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
