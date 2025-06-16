const KEY = "favoritosCargo";

export const obtenerFavoritos = () => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const agregarAFavoritos = (auto) => {
  const actuales = obtenerFavoritos();
  const yaExiste = actuales.some((a) => a.id === auto.id);
  if (!yaExiste) {
    const nuevos = [...actuales, auto];
    localStorage.setItem(KEY, JSON.stringify(nuevos));
  }
};

export const quitarDeFavoritos = (id) => {
  const actuales = obtenerFavoritos();
  const nuevos = actuales.filter((a) => a.id !== id);
  localStorage.setItem(KEY, JSON.stringify(nuevos));
};
