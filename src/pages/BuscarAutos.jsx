import React from "react";
import AutoCard from "../components/AutoCard";
import SearchBar from "../components/SearchBar";
import autosMock from "../data/autosMock";
import { obtenerAutos } from "../utils/localStorage";

export default function BuscarAutos() {
  const autosTotales = [...autosMock, ...obtenerAutos()];
  const [autosFiltrados, setAutosFiltrados] = React.useState(autosTotales);

  const handleSearch = (query) => {
    const filtered = autosTotales.filter((auto) =>
      `${auto.marca} ${auto.modelo} ${auto.anio} ${auto.pais}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setAutosFiltrados(filtered);
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Buscar Autos</h1>
      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
        {autosFiltrados.length > 0 ? (
          autosFiltrados.map((auto) => <AutoCard key={auto.id} auto={auto} />)
        ) : (
          <p className="col-span-3 italic text-center text-gray-400">
            No hay autos para mostrar. Probá con otra búsqueda.
          </p>
        )}
      </div>
    </div>
  );
}
