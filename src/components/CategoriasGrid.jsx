import React from "react";
import { categoriasMock } from "../data/categoriasMock";

const iconCarrito = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-8 h-8 text-blue-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6h12m-6-6v6"
    />
  </svg>
);

export default function CategoriasGrid() {
  return (
    <section className="my-10">
      <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
        Categorías Populares
      </h2>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
        {categoriasMock.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col items-center p-3 transition rounded-lg cursor-pointer bg-gray-50 hover:bg-blue-50"
          >
            <div className="flex items-center justify-center w-12 h-12 mb-1">
              {iconCarrito}
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {cat.nombre}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
