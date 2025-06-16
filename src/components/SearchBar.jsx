import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="my-6 flex justify-center">
      <input
        type="text"
        placeholder="Buscar por marca, modelo, año o país..."
        value={query}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
