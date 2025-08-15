import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <h2>Eventos</h2>
          </Link>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <Link
            to="/programa"
            className={`nav-link ${isActive("/programa") ? "active" : ""}`}
          >
            Programa
          </Link>
          <Link
            to="/hospedaje"
            className={`nav-link ${isActive("/hospedaje") ? "active" : ""}`}
          >
            Hospedaje
          </Link>
          <Link
            to="/restaurantes"
            className={`nav-link ${isActive("/restaurantes") ? "active" : ""}`}
          >
            Restaurantes
          </Link>
          <Link
            to="/quevisitar"
            className={`nav-link ${isActive("/quevisitar") ? "active" : ""}`}
          >
            Qué Visitar
          </Link>
          <Link
            to="/director"
            className={`nav-link ${isActive("/director") ? "active" : ""}`}
          >
            Director
          </Link>
          <Link
            to="/contacto"
            className={`nav-link ${isActive("/contacto") ? "active" : ""}`}
          >
            Contacto
          </Link>
        </div>

        <div className="navbar-auth">
          <button className="login-btn">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Iniciar Sesión
          </button>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
