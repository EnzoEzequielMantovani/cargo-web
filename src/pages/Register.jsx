import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (pass !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      navigate("/");
    } catch (err) {
      setError("Error al registrar. Verificá el correo.");
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-20 bg-white rounded shadow">
      <h1 className="mb-4 text-2xl font-bold text-center">Crear cuenta</h1>

      {error && (
        <div className="p-2 mb-4 text-red-700 bg-red-100 rounded">{error}</div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full px-3 py-2 border rounded"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className="w-full px-3 py-2 border rounded"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Registrarme
        </button>
      </form>

      <p className="mt-4 text-sm text-center text-gray-500">
        ¿Ya tenés cuenta?{" "}
        <a href="/login" className="text-blue-600 underline">
          Iniciar sesión
        </a>
      </p>
    </div>
  );
}
