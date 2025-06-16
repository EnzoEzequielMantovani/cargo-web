import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import autosMock from "../data/autosMock";
import { obtenerAutos } from "../utils/localStorage";
import { agregarAFavoritos, obtenerFavoritos } from "../utils/favoritos";
import { agregarAlCarrito, obtenerCarrito } from "../utils/carrito";

export default function AutoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const autosPublicados = obtenerAutos();
  const auto = [...autosMock, ...autosPublicados].find((a) => a.id === parseInt(id));

  const [esFavorito, setEsFavorito] = useState(false);
  const [enCarrito, setEnCarrito] = useState(false);

  useEffect(() => {
    const favoritos = obtenerFavoritos();
    setEsFavorito(favoritos.some((a) => a.id === auto?.id));

    const carrito = obtenerCarrito();
    setEnCarrito(carrito.some((a) => a.id === auto?.id));
  }, [auto?.id]);

  const handleFavorito = () => {
    agregarAFavoritos(auto);
    setEsFavorito(true);
  };

  const handleAgregarCarrito = () => {
    agregarAlCarrito(auto);
    setEnCarrito(true);
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

      <div className="flex flex-wrap items-center gap-3">
        {!esFavorito ? (
          <button
            onClick={handleFavorito}
            className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
          >
            ⭐ Agregar a Favoritos
          </button>
        ) : (
          <div className="font-semibold text-yellow-600">
            ⭐ Ya está en tus favoritos
          </div>
        )}

        {!enCarrito ? (
          <button
            onClick={handleAgregarCarrito}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            🛒 Agregar al Carrito
          </button>
        ) : (
          <div className="font-semibold text-green-700">
            🛒 Ya está en tu carrito
          </div>
        )}
      </div>
    </div>
  );
}
