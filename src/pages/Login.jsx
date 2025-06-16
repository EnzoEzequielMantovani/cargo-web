import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const loginEmail = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      navigate("/");
    } catch (err) {
      setError("Correo o contraseña incorrectos.");
    }
  };

  const loginGoogle = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setError("Error al iniciar sesión con Google.");
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-20 bg-white rounded shadow">
      <h1 className="mb-4 text-2xl font-bold text-center">Iniciar Sesión</h1>

      {error && (
        <div className="p-2 mb-4 text-red-700 bg-red-100 rounded">{error}</div>
      )}

      <form onSubmit={loginEmail} className="space-y-4">
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
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Ingresar
        </button>
      </form>

      <div className="my-4 text-center text-gray-500">ó</div>

      <button
        onClick={loginGoogle}
        className="w-full py-2 text-white bg-red-500 rounded hover:bg-red-600"
      >
        Continuar con Google
      </button>

      <p className="mt-4 text-sm text-center text-gray-500">
        ¿No tenés cuenta? <a href="/register" className="text-blue-600 underline">Registrate acá</a>
      </p>
    </div>
  );
}
