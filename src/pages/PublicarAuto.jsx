import React, { useState } from "react";
import { guardarAuto } from "../utils/localStorage";
import { useAuth } from "../context/AuthContext";

export default function PublicarAuto() {
  const { usuario } = useAuth();

  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    anio: "",
    pais: "",
    precio: "",
    imagen: "",
    descripcion: "",
    destacado: false,
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const campos = ["marca", "modelo", "anio", "pais", "precio", "imagen"];
    const incompleto = campos.some((campo) => !form[campo]);

    if (incompleto) {
      setMensaje("Por favor, completá todos los campos obligatorios.");
      return;
    }

    const nuevoAuto = {
      ...form,
      id: Date.now(),
      precio: Number(form.precio),
      anio: Number(form.anio),
      kilometros: Math.floor(Math.random() * 50000 + 10000),
      combustible: "Nafta",
      transmision: "Automática",
      tipo: "otro",
      publicadoPor: usuario?.email || "desconocido",
    };

    guardarAuto(nuevoAuto);

    setMensaje("Auto publicado con éxito!");
    setForm({
      marca: "",
      modelo: "",
      anio: "",
      pais: "",
      precio: "",
      imagen: "",
      descripcion: "",
      destacado: false,
    });
  };

  return (
    <div className="max-w-xl p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Publicar Auto</h1>

      {mensaje && (
        <div className="p-3 mb-4 text-green-700 bg-green-100 rounded">{mensaje}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {["marca", "modelo", "anio", "pais", "precio", "imagen"].map((campo) => (
          <div key={campo}>
            <label className="block mb-1 font-semibold capitalize" htmlFor={campo}>
              {campo}*
            </label>
            <input
              type={campo === "anio" || campo === "precio" ? "number" : "text"}
              id={campo}
              name={campo}
              value={form[campo]}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
        ))}

        <div>
          <label className="block mb-1 font-semibold" htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="destacado"
            name="destacado"
            checked={form.destacado}
            onChange={handleChange}
          />
          <label htmlFor="destacado">Destacar publicación por 7 días (+USD 20)</label>
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white transition bg-blue-600 rounded hover:bg-blue-700"
        >
          Publicar Auto
        </button>
      </form>
    </div>
  );
}
