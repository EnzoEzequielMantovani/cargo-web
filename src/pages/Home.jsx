import React from "react";
import AutoCard from "../components/AutoCard";
import autosMock from "../data/autosMock";
import { obtenerAutos } from "../utils/localStorage";

export default function Home() {
  const autosPublicados = obtenerAutos();
  const autosTotales = autosPublicados.length > 0 ? autosPublicados : autosMock;

  return (
    <div className="px-6 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        Autos disponibles
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {autosTotales.map((auto) => (
          <AutoCard key={auto.id} auto={auto} />
        ))}
      </div>
    </div>
  );
}
