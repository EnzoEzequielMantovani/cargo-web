const CARRITO_KEY = "carritoCargo";

export const obtenerCarrito = () => {
  const data = localStorage.getItem(CARRITO_KEY);
  return data ? JSON.parse(data) : [];
};

export const agregarAlCarrito = (auto) => {
  const actuales = obtenerCarrito();
  const yaExiste = actuales.some((a) => a.id === auto.id);
  if (!yaExiste) {
    const nuevos = [...actuales, auto];
    localStorage.setItem(CARRITO_KEY, JSON.stringify(nuevos));
  }
};

export const quitarDelCarrito = (id) => {
  const actuales = obtenerCarrito();
  const nuevos = actuales.filter((a) => a.id !== id);
  localStorage.setItem(CARRITO_KEY, JSON.stringify(nuevos));
};

export const vaciarCarrito = () => {
  localStorage.removeItem(CARRITO_KEY);
};
