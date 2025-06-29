import React, { useEffect, useState } from "react";
import { obtenerAutos } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

export default function MisPublicaciones() {
  const [autos, setAutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const publicados = obtenerAutos();
    setAutos(publicados);
  }, []);

  if (autos.length === 0) {
    return (
      <div className="max-w-xl p-6 mx-auto mt-20 text-center bg-white rounded shadow">
        <h2 className="mb-4 text-xl font-bold text-gray-700">No tenés publicaciones todavía</h2>
        <p className="mb-4 text-gray-500">Publicá un auto para que aparezca acá.</p>
        <button
          onClick={() => navigate("/publicar")}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Publicar ahora
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl p-4 mx-auto mt-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Mis Publicaciones</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {autos.map((auto) => {
          const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
          const reservasDeEsteAuto = reservas.filter((r) => r.id === auto.id);
          const estaReservado = reservasDeEsteAuto.length > 0;

          return (
            <div
              key={auto.id}
              className="p-4 transition bg-white rounded shadow hover:shadow-md"
            >
              <img
                src={auto.imagen}
                alt={`${auto.marca} ${auto.modelo}`}
                className="object-cover w-full h-48 mb-3 rounded"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {auto.marca} {auto.modelo}
              </h2>
              <p className="text-gray-600">Año: {auto.anio}</p>
              <p className="font-bold text-green-700">
                USD {auto.precio.toLocaleString()}
              </p>

              {estaReservado ? (
                <div className="mt-2 text-sm font-medium text-yellow-700">
                  ✅ Reservado por: {reservasDeEsteAuto[0].email}
                </div>
              ) : (
                <div className="mt-2 text-sm text-gray-500">
                  Sin reservas
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
