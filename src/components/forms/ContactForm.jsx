import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    date: '',
    time: '',
    guests: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://little-lemon-backend-n4ky.onrender.com/api/contacto',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert('✅ Mensaje enviado con éxito');
        setFormData({ name: '', email: '', message: '', date: '', time: '', guests: 1 });
      } else {
        alert('❌ Error: ' + (result.error || 'No se pudo guardar el mensaje'));
      }
    } catch (error) {
      alert('❌ Error al conectar con el servidor');
      console.error(error);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="contact-form" 
      autoComplete="off"   // 👈 evita autocompletado en todo el form
    >
      <h2>Contáctanos</h2>

      <label htmlFor="name">Nombre:</label>
      <input 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        required 
        autoComplete="off" 
      />

      <label htmlFor="email">Correo electrónico:</label>
      <input 
        name="email" 
        type="email" 
        value={formData.email} 
        onChange={handleChange} 
        required 
        autoComplete="off" 
      />

      <label htmlFor="message">Mensaje:</label>
      <textarea 
        name="message" 
        value={formData.message} 
        onChange={handleChange} 
        required 
        autoComplete="off"
      ></textarea>

      <label htmlFor="date">Fecha:</label>
      <input 
        name="date" 
        type="date" 
        value={formData.date} 
        onChange={handleChange} 
        autoComplete="off" 
      />

      <label htmlFor="time">Hora:</label>
      <input 
        name="time" 
        type="time" 
        value={formData.time} 
        onChange={handleChange} 
        autoComplete="off" 
      />

      <label htmlFor="guests">Número de personas:</label>
      <input 
        name="guests" 
        type="number" 
        min="1" 
        max="20" 
        value={formData.guests} 
        onChange={handleChange} 
        autoComplete="off" 
      />

      <button type="submit">Enviar</button>
    </form>
  );
}

export default ContactForm;
