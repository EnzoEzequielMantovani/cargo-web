import React from "react";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
      <div className="text-2xl font-bold cursor-pointer">CarGo!</div>
      <nav className="space-x-6">
        <a href="/" className="hover:underline">Inicio</a>
        <a href="/buscar" className="hover:underline">Buscar Autos</a>
        <a href="/publicar" className="hover:underline">Publicar Auto</a>
        <a href="/micuenta" className="hover:underline">Mi Cuenta</a>
      </nav>
    </header>
  );
}
