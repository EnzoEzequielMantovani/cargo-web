import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const activeClass = "text-blue-600 font-bold border-b-2 border-blue-600";
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="flex flex-wrap items-center p-4 space-x-6 bg-white shadow">
      <NavLink to="/" className={({ isActive }) => isActive ? activeClass : "text-gray-700 hover:text-blue-500"} end>
        Inicio
      </NavLink>
      <NavLink to="/buscar" className={({ isActive }) => isActive ? activeClass : "text-gray-700 hover:text-blue-500"}>
        Buscar Autos
      </NavLink>
      <NavLink to="/publicar" className={({ isActive }) => isActive ? activeClass : "text-gray-700 hover:text-blue-500"}>
        Publicar Auto
      </NavLink>
      <NavLink to="/simulador" className={({ isActive }) => isActive ? activeClass : "text-gray-700 hover:text-blue-500"}>
        Simulador
      </NavLink>
      <NavLink to="/seguros" className={({ isActive }) => isActive ? activeClass : "text-gray-700 hover:text-blue-500"}>
        Cotizar Seguro
      </NavLink>
      <NavLink to="/favoritos" className={({ isActive }) => isActive ? activeClass : "text-gray-700 hover:text-blue-500"}>
        Favoritos
      </NavLink>
      <NavLink to="/mispublicaciones" className={({ isActive }) => isActive ? activeClass : "text-gray-700 hover:text-blue-500"}>
        Mis Publicaciones
      </NavLink>
      <NavLink to="/carrito" className={({ isActive }) => isActive ? activeClass : "text-gray-700 hover:text-blue-500"}>
        Carrito
      </NavLink>

      {usuario ? (
        <div className="flex items-center ml-auto space-x-3">
          <span className="text-sm text-gray-600">{usuario.email}</span>
          <button onClick={cerrarSesion} className="text-sm text-red-600 hover:underline">
            Cerrar sesión
          </button>
        </div>
      ) : (
        <NavLink to="/login" className="ml-auto text-blue-600 hover:underline">
          Iniciar sesión
        </NavLink>
      )}
    </nav>
  );
}
