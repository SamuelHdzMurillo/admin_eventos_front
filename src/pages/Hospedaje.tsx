import React from "react";

const Hospedaje: React.FC = () => {
  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <h1>Opciones de Hospedaje</h1>
          <p>Alojamiento de calidad para todos los presupuestos</p>
        </div>
      </div>

      <section className="hospedaje-content">
        <div className="container">
          <div className="hospedaje-grid">
            <div className="hospedaje-card">
              <h3>Hotel Premium</h3>
              <p>Alojamiento de lujo con todas las comodidades</p>
              <div className="hospedaje-details">
                <p>
                  <strong>Características:</strong>
                </p>
                <ul>
                  <li>Habitaciones de lujo</li>
                  <li>Servicio de conserjería 24/7</li>
                  <li>Restaurante gourmet</li>
                  <li>Spa y gimnasio</li>
                </ul>
                <p>
                  <strong>Precio:</strong> Desde $200/noche
                </p>
              </div>
            </div>
            <div className="hospedaje-card">
              <h3>Hotel Estándar</h3>
              <p>Confort y calidad a precios accesibles</p>
              <div className="hospedaje-details">
                <p>
                  <strong>Características:</strong>
                </p>
                <ul>
                  <li>Habitaciones confortables</li>
                  <li>WiFi gratuito</li>
                  <li>Desayuno incluido</li>
                  <li>Estacionamiento</li>
                </ul>
                <p>
                  <strong>Precio:</strong> Desde $120/noche
                </p>
              </div>
            </div>
            <div className="hospedaje-card">
              <h3>Hostal Económico</h3>
              <p>Opción económica para viajeros</p>
              <div className="hospedaje-details">
                <p>
                  <strong>Características:</strong>
                </p>
                <ul>
                  <li>Habitaciones compartidas</li>
                  <li>Cocina común</li>
                  <li>Área de trabajo</li>
                  <li>WiFi gratuito</li>
                </ul>
                <p>
                  <strong>Precio:</strong> Desde $40/noche
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hospedaje;
