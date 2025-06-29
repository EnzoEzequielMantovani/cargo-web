import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { guardarAuto } from "../utils/localStorage";
import { auth } from "../firebase";

export default function PublicarAuto() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    anio: "",
    precio: "",
    descripcion: "",
    imagenes: [""],
    pais: "",
    tipo: "",
    combustible: "",
    transmision: "",
    kilometros: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (name === "imagenes" && index !== null) {
      const nuevas = [...form.imagenes];
      nuevas[index] = value;
      setForm({ ...form, imagenes: nuevas });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const agregarImagen = () => {
    setForm({ ...form, imagenes: [...form.imagenes, ""] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.imagenes.filter((url) => url.trim() !== "").length < 5) {
      setError("Debés ingresar al menos 5 fotos.");
      return;
    }

    // Convertir precio a número sin puntos
    const precioSanitizado = parseFloat(form.precio.replaceAll(".", "").replace(",", "."));

    if (isNaN(precioSanitizado) || precioSanitizado < 1) {
      setError("Ingresá un precio válido.");
      return;
    }

    const nuevoAuto = {
      ...form,
      id: Date.now(),
      precio: precioSanitizado,
      kilometros: parseInt(form.kilometros),
      anio: parseInt(form.anio),
      email: auth.currentUser?.email?.toLowerCase(),
      imagen: form.imagenes[0],
    };
    guardarAuto(nuevoAuto);
    navigate("/mispublicaciones");
  };

  return (
    <div className="max-w-2xl p-6 mx-auto mt-10 bg-white rounded shadow">
      <h1 className="mb-6 text-2xl font-bold">Publicar Auto</h1>

      {error && <div className="mb-4 font-semibold text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="marca" value={form.marca} onChange={handleChange} placeholder="Marca" className="w-full p-2 border rounded" required />
        <input name="modelo" value={form.modelo} onChange={handleChange} placeholder="Modelo" className="w-full p-2 border rounded" required />
        <input name="anio" type="number" value={form.anio} onChange={handleChange} placeholder="Año" className="w-full p-2 border rounded" required />
        <input name="precio" value={form.precio} onChange={handleChange} placeholder="Precio en USD (ej: 12.000.000)" className="w-full p-2 border rounded" required />
        <input name="kilometros" type="number" value={form.kilometros} onChange={handleChange} placeholder="Kilómetros" className="w-full p-2 border rounded" required />
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" className="w-full p-2 border rounded" required />
        <input name="pais" value={form.pais} onChange={handleChange} placeholder="País de origen" className="w-full p-2 border rounded" required />
        <input name="tipo" value={form.tipo} onChange={handleChange} placeholder="Tipo de vehículo" className="w-full p-2 border rounded" required />
        <input name="combustible" value={form.combustible} onChange={handleChange} placeholder="Tipo de combustible" className="w-full p-2 border rounded" required />
        <input name="transmision" value={form.transmision} onChange={handleChange} placeholder="Transmisión" className="w-full p-2 border rounded" required />

        <div>
          <label className="block mb-1 font-semibold">Fotos del auto (mínimo 5):</label>
          {form.imagenes.map((url, idx) => (
            <input
              key={idx}
              value={url}
              onChange={(e) => handleChange(e, idx)}
              placeholder={`URL imagen #${idx + 1}`}
              className="w-full p-2 mb-2 border rounded"
              required={idx < 5}
            />
          ))}
          <button type="button" onClick={agregarImagen} className="mt-2 text-sm text-blue-600 underline">
            + Agregar otra imagen
          </button>
        </div>

        <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          Publicar
        </button>
      </form>
    </div>
  );
}
