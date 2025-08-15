import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Programa from "./pages/Programa";
import Hospedaje from "./pages/Hospedaje";
import Restaurantes from "./pages/Restaurantes";
import QueVisitar from "./pages/QueVisitar";
import Director from "./pages/Director";
import Contacto from "./pages/Contacto";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programa" element={<Programa />} />
            <Route path="/hospedaje" element={<Hospedaje />} />
            <Route path="/restaurantes" element={<Restaurantes />} />
            <Route path="/quevisitar" element={<QueVisitar />} />
            <Route path="/director" element={<Director />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="container">
            <p>
              &copy; 2024 Eventos Profesionales. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
