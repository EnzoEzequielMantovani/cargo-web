import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RutaVerificada({ children }) {
  const { usuario } = useAuth();

  if (!usuario) return <Navigate to="/login" />;
  if (!usuario.emailVerified) return <Navigate to="/verifica-tu-email" />;

  return children;
}
