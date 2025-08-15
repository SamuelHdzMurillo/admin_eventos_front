import React from "react";

const Home: React.FC = () => {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenidos a Eventos Profesionales</h1>
          <p>
            Organizamos eventos corporativos y profesionales de alta calidad
          </p>
          <button className="cta-button">Conocer Más</button>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Nuestros Servicios</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Eventos Corporativos</h3>
              <p>
                Conferencias, seminarios y eventos empresariales profesionales
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Gestión Integral</h3>
              <p>
                Desde la planificación hasta la ejecución completa del evento
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌟</div>
              <h3>Calidad Premium</h3>
              <p>Estándares de excelencia en todos nuestros servicios</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
