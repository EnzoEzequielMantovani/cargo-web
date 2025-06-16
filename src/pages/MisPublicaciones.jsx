import React, { useEffect, useState } from "react";
import { obtenerAutos } from "../utils/localStorage";
import AutoCard from "../components/AutoCard";
import { useAuth } from "../context/AuthContext";

export default function MisPublicaciones() {
  const { usuario } = useAuth();
  const [autos, setAutos] = useState([]);

  useEffect(() => {
    const todos = obtenerAutos();
    const mios = todos.filter((a) => a.publicadoPor === usuario?.email);
    setAutos(mios);
  }, [usuario]);

  const eliminar = (id) => {
    const restantes = obtenerAutos().filter((a) => a.id !== id);
    localStorage.setItem("autosCargo", JSON.stringify(restantes));
    setAutos(restantes.filter((a) => a.publicadoPor === usuario?.email));
  };

  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Mis Publicaciones</h1>

      {autos.length === 0 ? (
        <p className="text-gray-500">Aún no publicaste ningún auto.</p>
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
