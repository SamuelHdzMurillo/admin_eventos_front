import React from "react";

const Director: React.FC = () => {
  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <h1>Director General</h1>
          <p>Conoce al líder de nuestro equipo profesional</p>
        </div>
      </div>

      <section className="director-content">
        <div className="container">
          <div className="director-profile">
            <div className="director-info">
              <h2>Dr. Juan Carlos Pérez Rodríguez</h2>
              <p className="director-title">
                Director General de Eventos Profesionales
              </p>

              <div className="director-bio">
                <h3>Biografía Profesional</h3>
                <p>
                  Con más de 15 años de experiencia en la organización de
                  eventos internacionales, el Dr. Pérez ha liderado exitosamente
                  más de 200 eventos corporativos y profesionales en 15 países
                  diferentes.
                </p>

                <h3>Formación Académica</h3>
                <ul>
                  <li>
                    Doctorado en Administración de Empresas - Universidad de
                    Harvard
                  </li>
                  <li>
                    Maestría en Gestión de Eventos - Universidad de Barcelona
                  </li>
                  <li>Licenciatura en Comunicación - Universidad Nacional</li>
                </ul>

                <h3>Experiencia Profesional</h3>
                <ul>
                  <li>
                    Director de Eventos en Corporación Internacional (2018-2023)
                  </li>
                  <li>
                    Gerente Senior de Eventos en Grupo Empresarial (2015-2018)
                  </li>
                  <li>Coordinador de Eventos Corporativos (2010-2015)</li>
                </ul>

                <h3>Certificaciones</h3>
                <ul>
                  <li>Certified Meeting Professional (CMP)</li>
                  <li>Certified Special Events Professional (CSEP)</li>
                  <li>Project Management Professional (PMP)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Director;
