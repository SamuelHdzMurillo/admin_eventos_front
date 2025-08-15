import React from "react";

const QueVisitar: React.FC = () => {
  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <h1>Qué Visitar</h1>
          <p>Descubre los lugares más interesantes de la ciudad</p>
        </div>
      </div>

      <section className="lugares-content">
        <div className="container">
          <div className="lugares-grid">
            <div className="lugar-card">
              <h3>Atracciones Turísticas Principales</h3>
              <p>Lugares emblemáticos que no puedes perderte</p>
              <div className="lugar-details">
                <p>
                  <strong>Destinos destacados:</strong>
                </p>
                <ul>
                  <li>Plaza Central Histórica</li>
                  <li>Monumento Nacional</li>
                  <li>Mirador Panorámico</li>
                  <li>Paseo Marítimo</li>
                </ul>
                <p>
                  <strong>Horarios:</strong> 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
            <div className="lugar-card">
              <h3>Museos y Centros Culturales</h3>
              <p>Exposiciones culturales e históricas de gran valor</p>
              <div className="lugar-details">
                <p>
                  <strong>Instituciones:</strong>
                </p>
                <ul>
                  <li>Museo de Historia Local</li>
                  <li>Galería de Arte Contemporáneo</li>
                  <li>Centro Cultural Municipal</li>
                  <li>Biblioteca Pública Central</li>
                </ul>
                <p>
                  <strong>Entrada:</strong> Gratuita - $10
                </p>
              </div>
            </div>
            <div className="lugar-card">
              <h3>Parques y Espacios Naturales</h3>
              <p>Áreas verdes para relajarse y disfrutar de la naturaleza</p>
              <div className="lugar-details">
                <p>
                  <strong>Espacios disponibles:</strong>
                </p>
                <ul>
                  <li>Parque Central Municipal</li>
                  <li>Jardín Botánico</li>
                  <li>Reserva Natural</li>
                  <li>Área de Recreación</li>
                </ul>
                <p>
                  <strong>Horarios:</strong> 6:00 AM - 10:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QueVisitar;
