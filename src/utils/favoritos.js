import { auth } from "../firebase";

const getKey = () => {
  const email = auth.currentUser?.email;
  return `favoritos_${email || "anonimo"}`;
};

export const obtenerFavoritos = () => {
  const data = localStorage.getItem(getKey());
  return data ? JSON.parse(data) : [];
};

export const agregarAFavoritos = (auto) => {
  const actuales = obtenerFavoritos();
  const yaExiste = actuales.some((a) => a.id === auto.id);
  if (!yaExiste) {
    const nuevos = [...actuales, auto];
    localStorage.setItem(getKey(), JSON.stringify(nuevos));
  }
};

export const quitarDeFavoritos = (id) => {
  const actuales = obtenerFavoritos();
  const nuevos = actuales.filter((a) => a.id !== id);
  localStorage.setItem(getKey(), JSON.stringify(nuevos));
};
