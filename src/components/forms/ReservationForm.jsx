import { useState } from 'react';

function ReservationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
      const response = await fetch('https://little-lemon-backend-n4ky.onrender.com/api/reservaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        alert('✅ Reservación guardada con éxito');
        setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: 1 });
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error) {
      alert('❌ Error al conectar con el servidor');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <h2>Reserva tu mesa</h2>
      <label htmlFor="name">Nombre:</label>
      <input name="name" value={formData.name} onChange={handleChange} required />

      <label htmlFor="email">Correo electrónico:</label>
      <input name="email" type="email" value={formData.email} onChange={handleChange} required />

      <label htmlFor="phone">Teléfono:</label>
      <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required />

      <label htmlFor="date">Fecha:</label>
      <input name="date" type="date" value={formData.date} onChange={handleChange} required />

      <label htmlFor="time">Hora:</label>
      <input name="time" type="time" value={formData.time} onChange={handleChange} required />

      <label htmlFor="guests">Número de personas:</label>
      <input name="guests" type="number" min="1" max="20" value={formData.guests} onChange={handleChange} required />

      <button type="submit">Reservar</button>
    </form>
  );
}

export default ReservationForm;
