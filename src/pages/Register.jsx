import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [mostrarPass, setMostrarPass] = useState(false);
  const [mostrarConfirm, setMostrarConfirm] = useState(false);

  const cumpleLongitud = pass.length >= 10;
  const tieneMayuscula = /[A-Z]/.test(pass);
  const tieneNumero = /\d/.test(pass);
  const tieneSimbolo = /[^A-Za-z0-9]/.test(pass);

  const esPasswordFuerte = () =>
    cumpleLongitud && tieneMayuscula && tieneNumero && tieneSimbolo;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (!aceptaTerminos) {
      setError("Debés aceptar los Términos y Condiciones para continuar.");
      return;
    }

    if (pass !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!esPasswordFuerte()) {
      setError("La contraseña no cumple con los requisitos.");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await sendEmailVerification(cred.user);
      setMensaje("Cuenta creada. Te enviamos un correo para verificar tu email.");
      setEmail("");
      setPass("");
      setConfirm("");
    } catch (err) {
      setError("Error al registrar. Verificá el correo.");
    }
  };

  const Icono = ({ visible }) =>
    visible ? (
      <HiEye className="text-xl text-gray-500 cursor-pointer" />
    ) : (
      <HiEyeOff className="text-xl text-gray-500 cursor-pointer" />
    );

  const Requisito = ({ cumple, texto }) => (
    <li className="flex items-center space-x-2 text-sm text-gray-600">
      <span className={cumple ? "text-green-600" : "text-gray-400"}>
        {cumple ? "✅" : "⬜"}
      </span>
      <span>{texto}</span>
    </li>
  );

  return (
    <div className="max-w-md p-6 mx-auto mt-20 bg-white rounded shadow">
      <h1 className="mb-4 text-2xl font-bold text-center">Crear cuenta</h1>

      {mensaje && (
        <div className="p-2 mb-4 text-green-700 bg-green-100 rounded">{mensaje}</div>
      )}
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

        <div className="relative">
          <input
            type={mostrarPass ? "text" : "password"}
            placeholder="Contraseña"
            className="w-full px-3 py-2 pr-10 border rounded"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <span
            className="absolute top-2 right-3"
            onClick={() => setMostrarPass(!mostrarPass)}
          >
            <Icono visible={mostrarPass} />
          </span>
        </div>

        <ul className="pl-1 space-y-1">
          <Requisito cumple={cumpleLongitud} texto="Al menos 10 caracteres" />
          <Requisito cumple={tieneMayuscula} texto="Una letra mayúscula" />
          <Requisito cumple={tieneNumero} texto="Un número" />
          <Requisito cumple={tieneSimbolo} texto="Un símbolo (!@#...)" />
        </ul>

        <div className="relative">
          <input
            type={mostrarConfirm ? "text" : "password"}
            placeholder="Confirmar contraseña"
            className="w-full px-3 py-2 pr-10 border rounded"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <span
            className="absolute top-2 right-3"
            onClick={() => setMostrarConfirm(!mostrarConfirm)}
          >
            <Icono visible={mostrarConfirm} />
          </span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            id="terminos"
            checked={aceptaTerminos}
            onChange={(e) => setAceptaTerminos(e.target.checked)}
            required
          />
          <label htmlFor="terminos">
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
