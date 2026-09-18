import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Carrito from "../pages/carrito/carrito";
import Catalogo from "../pages/catalogo/catalogo";
import Checkout from "../pages/checkout/checkout";
import Contacto from "../pages/contacto/contacto";
import Home from "../pages/home/home";
import NotFound from "../pages/notFound/notFound";
import Producto from "../pages/producto/producto";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/producto/:id" element={<Producto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
