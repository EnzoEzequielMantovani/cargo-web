import React, { useEffect, useState } from "react";
import { obtenerFavoritos, quitarDeFavoritos } from "../utils/favoritos";
import AutoCard from "../components/AutoCard";

export default function MisFavoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    setFavoritos(obtenerFavoritos());
  }, []);

  const quitar = (id) => {
    quitarDeFavoritos(id);
    setFavoritos(favoritos.filter((a) => a.id !== id));
  };

  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Mis Autos Favoritos</h1>

      {favoritos.length === 0 ? (
        <p className="text-gray-500">Aún no agregaste ningún auto a favoritos.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {favoritos.map((auto) => (
            <div key={auto.id}>
              <AutoCard auto={auto} />
              <button
                onClick={() => quitar(auto.id)}
                className="mt-2 text-sm text-red-600 hover:underline"
              >
                Quitar de favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
