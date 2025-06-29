import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import autosMock from "../data/autosMock";
import { obtenerAutos } from "../utils/localStorage";
import { agregarAFavoritos, obtenerFavoritos } from "../utils/favoritos";
import { auth } from "../firebase";

export default function AutoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const autosPublicados = obtenerAutos();
  const auto = [...autosMock, ...autosPublicados].find((a) => a.id === parseInt(id));
  const usuario = auth.currentUser;

  const [esFavorito, setEsFavorito] = useState(false);
  const [yaReservado, setYaReservado] = useState(false);

  useEffect(() => {
    const favoritos = obtenerFavoritos();
    setEsFavorito(favoritos.some((a) => a.id === auto?.id));

    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    const match = reservas.find(
      (r) => r.id === auto?.id && r.email === usuario?.email?.toLowerCase()
    );
    if (match) setYaReservado(true);
  }, [auto?.id, usuario]);

  const handleFavorito = () => {
    agregarAFavoritos(auto);
    setEsFavorito(true);
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

      {!esFavorito ? (
        <button
          onClick={handleFavorito}
          className="px-4 py-2 mb-4 text-white bg-yellow-500 rounded hover:bg-yellow-600"
        >
          ⭐ Agregar a Favoritos
        </button>
      ) : (
        <div className="mb-4 font-semibold text-yellow-600">
          ⭐ Ya está en tus favoritos
        </div>
      )}

      {!yaReservado ? (
        <button
          onClick={() => navigate(`/reserva/${auto.id}`)}
          className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Reservar (pagar seña)
        </button>
      ) : (
        <div className="mt-2 font-semibold text-center text-green-600">
          ✅ Ya reservaste este auto
        </div>
      )}
    </div>
  );
}
