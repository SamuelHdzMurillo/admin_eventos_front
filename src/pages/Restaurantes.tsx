import React from "react";

const Restaurantes: React.FC = () => {
  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <h1>Restaurantes y Gastronomía</h1>
          <p>Experiencias culinarias para todos los gustos</p>
        </div>
      </div>

      <section className="restaurantes-content">
        <div className="container">
          <div className="restaurantes-grid">
            <div className="restaurante-card">
              <h3>Cocina Local Tradicional</h3>
              <p>Sabores auténticos de la región con ingredientes frescos</p>
              <div className="restaurante-details">
                <p>
                  <strong>Especialidades:</strong>
                </p>
                <ul>
                  <li>Platos típicos regionales</li>
                  <li>Ingredientes locales</li>
                  <li>Ambiente familiar</li>
                  <li>Precios moderados</li>
                </ul>
                <p>
                  <strong>Rango de precios:</strong> $15-30 por persona
                </p>
              </div>
            </div>
            <div className="restaurante-card">
              <h3>Gastronomía Internacional</h3>
              <p>Platos de diferentes culturas y tradiciones culinarias</p>
              <div className="restaurante-details">
                <p>
                  <strong>Especialidades:</strong>
                </p>
                <ul>
                  <li>Cocina italiana</li>
                  <li>Gastronomía asiática</li>
                  <li>Platos mediterráneos</li>
                  <li>Vinos internacionales</li>
                </ul>
                <p>
                  <strong>Rango de precios:</strong> $25-50 por persona
                </p>
              </div>
            </div>
            <div className="restaurante-card">
              <h3>Opción Vegetariana y Saludable</h3>
              <p>Menús nutritivos y deliciosos para dietas especiales</p>
              <div className="restaurante-details">
                <p>
                  <strong>Especialidades:</strong>
                </p>
                <ul>
                  <li>Platos vegetarianos</li>
                  <li>Opciones veganas</li>
                  <li>Sin gluten</li>
                  <li>Ingredientes orgánicos</li>
                </ul>
                <p>
                  <strong>Rango de precios:</strong> $20-35 por persona
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Restaurantes;
