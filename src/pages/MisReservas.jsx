import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const todas = JSON.parse(localStorage.getItem("reservas") || "[]");
      const propias = todas.filter((r) => r.email === user.email?.toLowerCase());
      setReservas(propias);
    }
  }, []);

  const cancelarReserva = (id) => {
    const todas = JSON.parse(localStorage.getItem("reservas") || "[]");
    const nuevas = todas.filter(
      (r) => !(r.id === id && r.email === auth.currentUser?.email?.toLowerCase())
    );
    localStorage.setItem("reservas", JSON.stringify(nuevas));
    setReservas(nuevas);
  };

  if (!auth.currentUser) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg">Iniciá sesión para ver tus reservas.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl p-6 mx-auto mt-10">
      <h1 className="mb-6 text-2xl font-bold">Mis Reservas</h1>
      {reservas.length === 0 ? (
        <p className="text-gray-600">Aún no reservaste ningún auto.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {reservas.map((auto, index) => (
            <div key={index} className="p-4 bg-white rounded shadow">
              <img
                src={auto.imagen}
                alt={auto.modelo}
                className="object-contain w-full h-40 mb-2"
              />
              <h2 className="text-lg font-semibold">
                {auto.marca} {auto.modelo} ({auto.anio})
              </h2>
              <p className="mb-1 font-medium text-green-700">
                USD {auto.precio.toLocaleString()}
              </p>
              <p className="mb-2 text-sm text-gray-500">
                Reservado el: {new Date(auto.fecha).toLocaleDateString()}
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => navigate(`/reserva/${auto.id}`)}
                  className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() => cancelarReserva(auto.id)}
                  className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
