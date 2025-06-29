import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function OlvideClave() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMensaje("Te enviamos un correo para restablecer tu contraseña.");
    } catch (err) {
      setError("No se pudo enviar el email. Verificá el correo ingresado.");
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-20 bg-white rounded shadow">
      <h1 className="mb-4 text-2xl font-bold text-center">¿Olvidaste tu contraseña?</h1>

      {mensaje && (
        <div className="p-2 mb-4 text-green-700 bg-green-100 rounded">{mensaje}</div>
      )}
      {error && (
        <div className="p-2 mb-4 text-red-700 bg-red-100 rounded">{error}</div>
      )}

      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="email"
          placeholder="Ingresá tu correo"
          className="w-full px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Enviar enlace de recuperación
        </button>
      </form>

      <p className="mt-4 text-sm text-center text-gray-500">
        <a href="/login" className="text-blue-600 underline">Volver al inicio de sesión</a>
      </p>
    </div>
  );
}
