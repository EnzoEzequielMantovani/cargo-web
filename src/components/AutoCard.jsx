import React from "react";
import { Link } from "react-router-dom";

export default function AutoCard({ auto }) {
  return (
    <Link to={`/auto/${auto.id}`} className="block">
      <div className="overflow-hidden transition bg-white shadow rounded-2xl hover:shadow-md dark:bg-gray-800">
        <img
          src={auto.imagen}
          alt={`${auto.marca} ${auto.modelo}`}
          className="object-cover w-full h-48"
        />
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            {auto.marca} {auto.modelo}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{auto.anio}</p>
          <p className="mt-2 font-semibold text-blue-600">
            USD {auto.precio.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}
