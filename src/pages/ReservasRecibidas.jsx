import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { obtenerAutos } from "../utils/localStorage";

export default function ReservasRecibidas() {
  const [publicados, setPublicados] = useState([]);
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const autos = obtenerAutos();
    const mios = autos.filter((a) => a.email === user.email?.toLowerCase());
    const reservados = JSON.parse(localStorage.getItem("reservas") || "[]");

    setPublicados(mios);
    setReservas(reservados);
  }, []);

  const obtenerInteresados = (autoId) =>
    reservas.filter((r) => r.id === autoId);

  if (!auth.currentUser) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg">Debés iniciar sesión para ver esta sección.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl p-6 mx-auto mt-10">
      <h1 className="mb-6 text-2xl font-bold">Reservas Recibidas</h1>

      {publicados.length === 0 ? (
        <p className="text-gray-600">Aún no publicaste ningún auto.</p>
      ) : (
        publicados.map((auto) => {
          const interesados = obtenerInteresados(auto.id);

          return (
            <div
              key={auto.id}
              className="p-4 mb-6 bg-white rounded shadow"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={auto.imagen}
                  alt={auto.modelo}
                  className="object-cover w-32 h-20 rounded"
                />
                <div>
                  <h2 className="text-xl font-semibold">
                    {auto.marca} {auto.modelo} ({auto.anio})
                  </h2>
                  <p className="text-sm text-gray-500">
                    Publicado por vos – {interesados.length} reserva(s)
                  </p>
                </div>
              </div>

              {interesados.length === 0 ? (
                <p className="mt-2 text-gray-500">Nadie reservó este auto aún.</p>
              ) : (
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {interesados.map((i, idx) => (
                    <li key={idx} className="flex justify-between p-2 bg-gray-100 rounded">
                      <span>📧 {i.email}</span>
                      <span>📅 {new Date(i.fecha).toLocaleDateString()}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
