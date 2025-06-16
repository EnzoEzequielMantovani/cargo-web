import React, { useEffect, useState } from "react";
import { obtenerAutos } from "../utils/localStorage";
import AutoCard from "../components/AutoCard";

export default function MisPublicaciones() {
  const [autos, setAutos] = useState([]);

  useEffect(() => {
    setAutos(obtenerAutos());
  }, []);

  const eliminar = (id) => {
    const nuevos = autos.filter((a) => a.id !== id);
    localStorage.setItem("autosCargo", JSON.stringify(nuevos));
    setAutos(nuevos);
  };

  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Mis Publicaciones</h1>

      {autos.length === 0 ? (
        <p className="text-gray-500">Todavía no publicaste ningún auto.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {autos.map((auto) => (
            <div key={auto.id}>
              <AutoCard auto={auto} />
              <button
                onClick={() => eliminar(auto.id)}
                className="mt-2 text-sm text-red-600 hover:underline"
              >
                Eliminar publicación
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
