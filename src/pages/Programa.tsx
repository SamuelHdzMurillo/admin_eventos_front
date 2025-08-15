import React from "react";

const Programa: React.FC = () => {
  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <h1>Programa de Eventos</h1>
          <p>Descubre nuestra agenda completa de actividades profesionales</p>
        </div>
      </div>

      <section className="programa-content">
        <div className="container">
          <div className="programa-grid">
            <div className="programa-card">
              <h3>Conferencias Magistrales</h3>
              <p>
                Charlas especializadas con expertos reconocidos en la industria
              </p>
              <ul>
                <li>Duración: 90 minutos</li>
                <li>Incluye sesión de preguntas</li>
                <li>Material de apoyo incluido</li>
              </ul>
            </div>
            <div className="programa-card">
              <h3>Talleres Interactivos</h3>
              <p>Sesiones prácticas para desarrollar habilidades específicas</p>
              <ul>
                <li>Duración: 3-4 horas</li>
                <li>Grupos reducidos</li>
                <li>Certificado de participación</li>
              </ul>
            </div>
            <div className="programa-card">
              <h3>Sesiones de Networking</h3>
              <p>Oportunidades para conectar con profesionales del sector</p>
              <ul>
                <li>Duración: 2 horas</li>
                <li>Actividades estructuradas</li>
                <li>Material de contacto</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programa;
