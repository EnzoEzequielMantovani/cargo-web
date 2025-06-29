import React from "react";
import { useNavigate } from "react-router-dom";

export default function AutoCard({ auto }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/auto/${auto.id}`)}
      className="p-3 transition bg-white rounded shadow cursor-pointer hover:shadow-md"
    >
      <img
        src={auto.imagen}
        alt={`${auto.marca} ${auto.modelo}`}
        className="object-cover w-full h-40 mb-3 rounded"
      />
      <h2 className="text-lg font-semibold">
        {auto.marca} {auto.modelo}
      </h2>
      <p className="text-sm text-gray-500">Año: {auto.anio}</p>
      <p className="text-sm font-bold text-green-700">
        USD {auto.precio.toLocaleString()}
      </p>
    </div>
  );
}
