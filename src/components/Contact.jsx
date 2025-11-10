import '../styles/Contact.css';
import Recepcion from '../assets/Recepcion.jpg';
import ContactForm from '../components/forms/ContactForm';

function Contact() {
  return (
    <section className="contact-container">
      <div className="contact-content">
        <div className="contact-image-area">
          <img src={Recepcion} alt="Comunicación con clientes" />
        </div>
        <div className="contact-form-area">
          <h1>Contáctanos</h1>
          <p>¿Tienes dudas o sugerencias? Escríbenos y te responderemos pronto.</p>
          <ContactForm />
          <div className="contact-info">
            <p>📍 Calle 123, Mérida, Yucatán</p>
            <p>📞 +52 999 123 4567</p>
            <p>📧 contacto@littlelemon.mx</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
