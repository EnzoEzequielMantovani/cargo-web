import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import autosMock from "../data/autosMock";
import { obtenerAutos } from "../utils/localStorage";

export default function ConfirmarReserva() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auto, setAuto] = useState(null);
  const [pagado, setPagado] = useState(false);

  useEffect(() => {
    const todos = [...autosMock, ...obtenerAutos()];
    const match = todos.find((a) => a.id === parseInt(id));
    setAuto(match);

    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    const yaExiste = reservas.some(
      (r) => r.id === parseInt(id) && r.email === auth.currentUser?.email?.toLowerCase()
    );
    if (yaExiste) setPagado(true);
  }, [id]);

  const handlePagar = () => {
    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");

    const yaExiste = reservas.some(
      (r) => r.id === auto.id && r.email === auth.currentUser?.email?.toLowerCase()
    );

    if (!yaExiste) {
      reservas.push({
        ...auto,
        email: auth.currentUser?.email?.toLowerCase(),
        fecha: new Date().toISOString(),
      });
      localStorage.setItem("reservas", JSON.stringify(reservas));
    }

    setPagado(true);
  };

  if (!auth.currentUser) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg">Debés iniciar sesión para acceder a esta reserva.</p>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Iniciar sesión
        </button>
      </div>
    );
  }

  if (!auto) {
    return (
      <div className="p-6 text-center text-gray-700">
        <p>No se encontró el auto.</p>
      </div>
    );
  }

  const seña = (auto.precio * 0.03).toFixed(2);

  return (
    <div className="max-w-xl p-6 mx-auto mt-10 bg-white rounded shadow">
      <h1 className="mb-4 text-2xl font-bold text-center">Confirmar Reserva</h1>

      <img
        src={auto.imagen}
        alt={auto.modelo}
        className="object-contain w-full mb-4 rounded h-52"
      />

      <h2 className="mb-1 text-xl font-semibold">
        {auto.marca} {auto.modelo} ({auto.anio})
      </h2>
      <p className="mb-2 font-medium text-green-700">
        USD {auto.precio.toLocaleString()}
      </p>

      <p className="mb-4 text-sm text-gray-600">
        Para reservar este auto debés abonar una seña del <strong>3%</strong>.
      </p>

      <div className="mb-4 text-lg">
        💸 Seña: <strong>USD {seña}</strong>
      </div>

      {!pagado ? (
        <button
          onClick={handlePagar}
          className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Simular pago de seña
        </button>
      ) : (
        <div className="font-semibold text-center text-green-700">
          ✅ Ya reservaste este auto. ¡Gracias por tu confianza!
        </div>
      )}
    </div>
  );
}
