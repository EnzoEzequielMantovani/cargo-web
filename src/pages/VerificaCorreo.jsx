import React from "react";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

export default function VerificaCorreo() {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const reenviarVerificacion = async () => {
    if (usuario) {
      await sendEmailVerification(usuario);
      alert("Correo de verificación reenviado.");
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-20 text-center bg-yellow-100 rounded shadow">
      <h1 className="mb-4 text-2xl font-bold text-yellow-700">⚠️ Verificación requerida</h1>
      <p className="mb-4 text-gray-700">
        Necesitás verificar tu correo para acceder a esta sección.
        Revisá tu bandeja de entrada o spam y hacé clic en el enlace de verificación.
      </p>

      <button
        onClick={reenviarVerificacion}
        className="px-4 py-2 mb-3 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Reenviar correo de verificación
      </button>

      <br />

      <button
        onClick={() => navigate("/")}
        className="text-sm text-blue-600 underline"
      >
        Volver al inicio
      </button>
    </div>
  );
}
