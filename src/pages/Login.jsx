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
  const [aceptaGoogle, setAceptaGoogle] = useState(false);

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
    if (!aceptaGoogle) {
      setError("Debés aceptar los Términos y Condiciones para usar Google.");
      return;
    }

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

      <div className="flex items-center mb-2 space-x-2 text-sm">
        <input
          type="checkbox"
          id="aceptaGoogle"
          checked={aceptaGoogle}
          onChange={(e) => setAceptaGoogle(e.target.checked)}
        />
        <label htmlFor="aceptaGoogle">
          Acepto los{" "}
          <a
            href="/terminos"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Términos y Condiciones
          </a>
        </label>
      </div>

      <button
        onClick={loginGoogle}
        className={`w-full py-2 rounded text-white ${
          aceptaGoogle ? "bg-red-500 hover:bg-red-600" : "bg-red-300 cursor-not-allowed"
        }`}
        disabled={!aceptaGoogle}
      >
        Continuar con Google
      </button>

      <p className="mt-4 text-sm text-center">
        <a href="/olvide-clave" className="text-blue-600 underline">
          ¿Olvidaste tu contraseña?
        </a>
      </p>

      <p className="mt-4 text-sm text-center text-gray-500">
        ¿No tenés cuenta?{" "}
        <a href="/register" className="text-blue-600 underline">
          Registrate acá
        </a>
      </p>
    </div>
  );
}
