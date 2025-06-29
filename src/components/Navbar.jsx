import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const activeClass = "text-blue-600 font-bold border-b-2 border-blue-600";

  return (
    <nav className="flex items-center p-4 space-x-4 overflow-x-auto bg-white shadow">
      <NavLink to="/" end className={({ isActive }) => isActive ? activeClass : "text-gray-700 hover:text-blue-500"}>
        Inicio
      </NavLink>
      <NavLink to="/buscar" className={({ isActive }) => isActive ? activeClass : "text-gray-700 hover:text-blue-500"}>
        Buscar Autos
      </NavLink>
      <NavLink to="/publicar" className={({ isActive }) => isActive ? activeClass : "text-gray-700 hover:text-blue-500"}>
        Publicar Auto
      </NavLink>
      <NavLink to="/mispublicaciones" className={({ isActive }) => isActive ? activeClass : "text-gray-700 hover:text-blue-500"}>
        Mis Publicaciones
      </NavLink>
      <NavLink to="/reservas-recibidas" className={({ isActive }) => isActive ? activeClass : "text-gray-700 hover:text-blue-500"}>
        Reservas Recibidas
      </NavLink>
      <NavLink to="/favoritos" className={({ isActive }) => isActive ? activeClass : "text-gray-700 hover:text-blue-500"}>
        Favoritos
      </NavLink>
      <NavLink to="/carrito" className={({ isActive }) => isActive ? activeClass : "text-gray-700 hover:text-blue-500"}>
        Mi Carrito
      </NavLink>
      <NavLink to="/simulador" className={({ isActive }) => isActive ? activeClass : "text-gray-700 hover:text-blue-500"}>
        Simulador
      </NavLink>
      <NavLink to="/seguros" className={({ isActive }) => isActive ? activeClass : "text-gray-700 hover:text-blue-500"}>
        Cotizar Seguro
      </NavLink>
      <NavLink to="/micuenta" className={({ isActive }) => isActive ? activeClass : "text-gray-700 hover:text-blue-500"}>
        Mi Cuenta
      </NavLink>
    </nav>
  );
}
