import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BuscarAutos from "./pages/BuscarAutos";
import PublicarAuto from "./pages/PublicarAuto";
import MiCuenta from "./pages/MiCuenta";
import Navbar from "./components/Navbar";
import Simulador from "./pages/Simulador";
import AutoDetalle from "./pages/AutoDetalle";
import CotizadorSeguros from "./pages/CotizadorSeguros";
import MisFavoritos from "./pages/MisFavoritos";
import MisPublicaciones from "./pages/MisPublicaciones";
import Carrito from "./pages/Carrito";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buscar" element={<BuscarAutos />} />
        <Route path="/publicar" element={<PublicarAuto />} />
        <Route path="/micuenta" element={<MiCuenta />} />
        <Route path="/simulador" element={<Simulador />} />
        <Route path="/seguros" element={<CotizadorSeguros />} />
        <Route path="/auto/:id" element={<AutoDetalle />} />
        <Route path="/favoritos" element={<MisFavoritos />} />
        <Route path="/mispublicaciones" element={<MisPublicaciones />} />
        <Route path="/carrito" element={<Carrito />} />


      </Routes>
    </Router>
  );
}

export default App;
