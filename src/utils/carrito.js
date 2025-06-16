import { auth } from "../firebase";

const getKey = () => {
  const email = auth.currentUser?.email;
  return `carrito_${email || "anonimo"}`;
};

export const obtenerCarrito = () => {
  const data = localStorage.getItem(getKey());
  return data ? JSON.parse(data) : [];
};

export const agregarAlCarrito = (auto) => {
  const actuales = obtenerCarrito();
  const yaExiste = actuales.some((a) => a.id === auto.id);
  if (!yaExiste) {
    const nuevos = [...actuales, auto];
    localStorage.setItem(getKey(), JSON.stringify(nuevos));
  }
};

export const quitarDelCarrito = (id) => {
  const actuales = obtenerCarrito();
  const nuevos = actuales.filter((a) => a.id !== id);
  localStorage.setItem(getKey(), JSON.stringify(nuevos));
};

export const vaciarCarrito = () => {
  localStorage.removeItem(getKey());
};
