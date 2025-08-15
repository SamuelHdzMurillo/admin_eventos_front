import React from "react";

const Contacto: React.FC = () => {
  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <h1>Contacto</h1>
          <p>Ponte en contacto con nuestro equipo profesional</p>
        </div>
      </div>

      <section className="contacto-content">
        <div className="container">
          <div className="contacto-grid">
            <div className="contacto-info">
              <h3>Información de Contacto</h3>
              <div className="contacto-details">
                <div className="contacto-item">
                  <h4>📧 Email</h4>
                  <p>info@eventosprofesionales.com</p>
                  <p>ventas@eventosprofesionales.com</p>
                </div>

                <div className="contacto-item">
                  <h4>📞 Teléfono</h4>
                  <p>+1 (555) 123-4567</p>
                  <p>+1 (555) 987-6543</p>
                </div>

                <div className="contacto-item">
                  <h4>📍 Dirección</h4>
                  <p>Av. Principal 123, Suite 456</p>
                  <p>Ciudad Empresarial, CP 12345</p>
                  <p>Estado, País</p>
                </div>

                <div className="contacto-item">
                  <h4>🕒 Horarios de Atención</h4>
                  <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                  <p>Sábados: 9:00 AM - 2:00 PM</p>
                  <p>Domingos: Cerrado</p>
                </div>
              </div>
            </div>

            <div className="contacto-form-container">
              <h3>Formulario de Contacto</h3>
              <form className="contacto-form">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre Completo *</label>
                  <input type="text" id="nombre" name="nombre" required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" required />
                </div>

                <div className="form-group">
                  <label htmlFor="empresa">Empresa</label>
                  <input type="text" id="empresa" name="empresa" />
                </div>

                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <input type="tel" id="telefono" name="telefono" />
                </div>

                <div className="form-group">
                  <label htmlFor="tipo-evento">Tipo de Evento</label>
                  <select id="tipo-evento" name="tipo-evento">
                    <option value="">Seleccione una opción</option>
                    <option value="conferencia">Conferencia</option>
                    <option value="seminario">Seminario</option>
                    <option value="evento-corporativo">
                      Evento Corporativo
                    </option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">Mensaje *</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;
