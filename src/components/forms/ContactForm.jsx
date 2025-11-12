import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando...');

    try {
      const response = await fetch("https://little-lemon-backend.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          date: "2099-12-31",
          time: "00:00",
          guests: 0,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus("Mensaje enviado con éxito 🍋");
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus("Error al enviar el mensaje.");
      }
    } catch (err) {
      console.error(err);
      setStatus("No se pudo conectar con el servidor.");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>Nombre:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>Mensaje:
        <textarea name="message" rows="4" value={formData.message} onChange={handleChange} required />
      </label>
      <button type="submit">Enviar</button>
      <p>{status}</p>
    </form>
  );
}
