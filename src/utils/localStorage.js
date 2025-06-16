// src/utils/localStorage.js

const STORAGE_KEY = "autosCargo";

export const guardarAuto = (auto) => {
  const actuales = obtenerAutos();
  const nuevos = [...actuales, auto];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevos));
};

export const obtenerAutos = () => {
  const guardados = localStorage.getItem(STORAGE_KEY);
  return guardados ? JSON.parse(guardados) : [];
};

export const limpiarAutos = () => {
  localStorage.removeItem(STORAGE_KEY);
};
