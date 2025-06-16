import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import autosMock from "../data/autosMock";
import { obtenerAutos } from "../utils/localStorage";

export default function AutoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const autosPublicados = obtenerAutos();
  const auto = [...autosMock, ...autosPublicados].find((a) => a.id === parseInt(id));

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  const calcularCosto = () => {
    if (!auto) return 0;
    const flete = 1800;
    const impuestos = auto.precio * 0.35;
    const gestion = auto.precio * 0.05;
    return auto.precio + flete + impuestos + gestion;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    // Acá podrías guardar el mensaje, simular email, etc.
  };

  if (!auto) {
    return (
      <div className="container p-4 mx-auto text-center">
        <h2 className="mb-4 text-2xl font-bold">Auto no encontrado</h2>
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl p-4 mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="px-3 py-1 mb-4 bg-gray-300 rounded hover:bg-gray-400"
      >
        ← Volver
      </button>

      <img
        src={auto.imagen}
        alt={`${auto.marca} ${auto.modelo}`}
        className="w-full mb-4 rounded shadow"
      />
      <h1 className="mb-2 text-3xl font-bold">
        {auto.marca} {auto.modelo} ({auto.anio})
      </h1>
      <p className="mb-4 text-xl font-semibold text-green-700">
        USD {auto.precio.toLocaleString()}
      </p>
      <p className="mb-2">{auto.descripcion}</p>

      <ul className="mb-4 text-gray-700 list-disc list-inside">
        <li><strong>País:</strong> {auto.pais}</li>
        <li><strong>Tipo:</strong> {auto.tipo}</li>
        <li><strong>Combustible:</strong> {auto.combustible}</li>
        <li><strong>Transmisión:</strong> {auto.transmision}</li>
        <li><strong>Kilómetros:</strong> {auto.kilometros.toLocaleString()} km</li>
      </ul>

      <div className="p-4 my-6 bg-gray-100 rounded shadow">
        <h2 className="mb-2 text-xl font-semibold text-blue-800">Costo total estimado:</h2>
        <ul className="mb-2">
          <li>Precio base: USD {auto.precio.toLocaleString()}</li>
          <li>Flete estimado: USD 1.800</li>
          <li>Impuestos estimados (35%): USD {(auto.precio * 0.35).toLocaleString()}</li>
          <li>Gestión CarGo! (5%): USD {(auto.precio * 0.05).toLocaleString()}</li>
        </ul>
        <p className="text-lg font-bold text-green-700">
          Total: USD {calcularCosto().toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">* Valores estimados. Pueden variar según aduana y condiciones.</p>
      </div>

      <div className="p-4 mt-6 border rounded">
        <h2 className="mb-4 text-xl font-semibold">¿Te interesa este auto?</h2>
        {enviado ? (
          <div className="p-4 text-green-700 bg-green-100 rounded">
            ¡Gracias! Te contactaremos pronto.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Tu nombre"
              className="w-full p-2 border rounded"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Tu email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Mensaje o consulta"
              rows="3"
              className="w-full p-2 border rounded"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Contactar vendedor
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
