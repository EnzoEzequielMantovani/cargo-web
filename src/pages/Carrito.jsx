import React, { useEffect, useState } from "react";
import { obtenerCarrito, quitarDelCarrito, vaciarCarrito } from "../utils/carrito";
import AutoCard from "../components/AutoCard";

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    setCarrito(obtenerCarrito());
  }, []);

  const quitar = (id) => {
    quitarDelCarrito(id);
    setCarrito(carrito.filter((a) => a.id !== id));
  };

  const totalEstimado = carrito.reduce((acc, auto) => {
    const flete = 1800;
    const impuestos = auto.precio * 0.35;
    const gestion = auto.precio * 0.05;
    return acc + auto.precio + flete + impuestos + gestion;
  }, 0);

  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Carrito de Compra</h1>

      {carrito.length === 0 ? (
        <p className="text-gray-500">No hay autos en tu carrito.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {carrito.map((auto) => (
              <div key={auto.id}>
                <AutoCard auto={auto} />
                <button
                  onClick={() => quitar(auto.id)}
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  Quitar del carrito
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 mt-6 bg-gray-100 rounded shadow">
            <h2 className="mb-2 text-xl font-semibold text-blue-700">Resumen estimado</h2>
            <p>Total aproximado por todos los autos:</p>
            <p className="text-2xl font-bold text-green-700">USD {totalEstimado.toLocaleString()}</p>
            <p className="mt-2 text-sm text-gray-500">
              Incluye impuestos, flete y gestión estimada por auto.
            </p>
            <button
              onClick={() => {
                vaciarCarrito();
                setCarrito([]);
              }}
              className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Finalizar compra (simulado)
            </button>
          </div>
        </>
      )}
    </div>
  );
}
