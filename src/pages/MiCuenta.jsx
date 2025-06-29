import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function MiCuenta() {
  const usuario = auth.currentUser;
  const navigate = useNavigate();

  const cerrarSesion = () => {
    auth.signOut().then(() => navigate("/"));
  };

  if (!usuario) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg">Debés iniciar sesión para ver tu cuenta.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded shadow">
      <h1 className="mb-4 text-2xl font-bold text-center">Mi Cuenta</h1>

      <div className="mb-4">
        <p className="text-gray-700"><strong>Correo:</strong> {usuario.email}</p>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => navigate("/favoritos")}
          className="w-full py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          ⭐ Mis Favoritos
        </button>
        <button
          onClick={() => navigate("/misreservas")}
          className="w-full py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          📑 Mis Reservas
        </button>
        <button
          onClick={() => navigate("/mispublicaciones")}
          className="w-full py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          🚘 Mis Publicaciones
        </button>
        <button
          onClick={() => navigate("/carrito")}
          className="w-full py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          🛒 Mi Carrito
        </button>
      </div>

      <button
        onClick={cerrarSesion}
        className="w-full py-2 mt-6 text-white bg-red-600 rounded hover:bg-red-700"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
