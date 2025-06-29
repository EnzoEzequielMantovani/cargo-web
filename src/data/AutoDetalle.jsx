import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import autosMock from "../data/autosMock";
import { obtenerAutos } from "../utils/localStorage";
import { auth } from "../firebase";

export default function AutoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const usuario = auth.currentUser;

  const autosPublicados = obtenerAutos();
  const auto = [...autosMock, ...autosPublicados].find((a) => a.id === parseInt(id));

  const [reservado, setReservado] = useState(false);

  useEffect(() => {
    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    const yaReservado = reservas.find((r) => r.id === auto?.id && r.email === usuario?.email);
    setReservado(!!yaReservado);
  }, [auto?.id, usuario?.email]);

  const handleReservar = () => {
    if (!usuario || reservado) return;

    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    reservas.push({
      ...auto,
      email: usuario.email,
      fecha: new Date().toISOString(),
    });
    localStorage.setItem("reservas", JSON.stringify(reservas));
    setReservado(true);
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
    <div className="container max-w-xl p-4 mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="px-3 py-1 mb-4 bg-gray-300 rounded hover:bg-gray-400"
      >
        ← Volver
      </button>

      <img
        src={auto.imagen}
        alt={`${auto.marca} ${auto.modelo}`}
        className="w-full mb-4 rounded"
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

      {usuario && auto.creador !== usuario.email && (
        <div className="mt-4">
          {!reservado ? (
            <button
              onClick={handleReservar}
              className="px-4 py-2 text-white bg-orange-600 rounded hover:bg-orange-700"
            >
              Reservar este auto
            </button>
          ) : (
            <div className="font-semibold text-green-600">
              ✅ Ya reservaste este auto
            </div>
          )}
        </div>
      )}
    </div>
  );
}
