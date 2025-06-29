import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

export default function Carrito() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    cargarReservas();
  }, []);

  const cargarReservas = () => {
    const todas = JSON.parse(localStorage.getItem("reservas") || "[]");
    const propias = todas.filter((r) => r.email === auth.currentUser?.email?.toLowerCase());
    setReservas(propias);
  };

  const cancelarReserva = (id) => {
    const todas = JSON.parse(localStorage.getItem("reservas") || "[]");
    const filtradas = todas.filter(
      (r) => !(r.id === id && r.email === auth.currentUser.email)
    );
    localStorage.setItem("reservas", JSON.stringify(filtradas));
    cargarReservas();
  };

  if (!auth.currentUser) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg">Iniciá sesión para ver tu carrito.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl p-6 mx-auto mt-10">
      <h1 className="mb-6 text-2xl font-bold">Mi Carrito</h1>

      {reservas.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
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
              <p className="text-sm text-gray-500">
                Reservado el: {new Date(auto.fecha).toLocaleDateString()}
              </p>
              <button
                onClick={() => cancelarReserva(auto.id)}
                className="px-4 py-2 mt-3 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Cancelar reserva
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
