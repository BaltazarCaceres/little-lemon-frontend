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

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://little-lemon-backend-n4ky.onrender.com/api/reservaciones',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Error al guardar la reservación');
      }

      const result = await response.json();
      setMensaje('✅ Reservación guardada con éxito');
      setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: 1 });
    } catch (error) {
      console.error('Error:', error);
      setMensaje('❌ No se pudo guardar la reservación. Intenta más tarde.');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="reservation-form" 
      autoComplete="off"   // 👈 evita autocompletado en todo el form
    >
      <h2>Reserva tu mesa</h2>

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

      <label htmlFor="phone">Teléfono:</label>
      <input 
        name="phone" 
        type="tel" 
        value={formData.phone} 
        onChange={handleChange} 
        required 
        autoComplete="off" 
      />

      <label htmlFor="date">Fecha:</label>
      <input 
        name="date" 
        type="date" 
        value={formData.date} 
        onChange={handleChange} 
        required 
        autoComplete="off" 
      />

      <label htmlFor="time">Hora:</label>
      <input 
        name="time" 
        type="time" 
        value={formData.time} 
        onChange={handleChange} 
        required 
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
        required 
        autoComplete="off" 
      />

      <button type="submit">Reservar</button>

      {/* Mensaje de confirmación o error */}
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}

export default ReservationForm;
