import '../../styles/form.css';
import { useState } from 'react';

function ReservationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanValue = value;

    if (name === 'phone') {
      cleanValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    }

    if (name === 'name') {
      cleanValue = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
    }

    setFormData(prev => ({ ...prev, [name]: cleanValue }));
  };

  // ✅ Nueva función para enviar la reserva al backend
  const sendReservation = async () => {
    try {
      const response = await fetch('https://little-lemon-backend.onrender.com/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar la reserva');
      }

      const result = await response.json();
      console.log('Reserva guardada:', result);
    } catch (err) {
      console.error(err);
      setError('No se pudo guardar la reserva. Intenta más tarde.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      setError('El teléfono debe tener exactamente 10 dígitos.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('El correo electrónico no es válido.');
      return;
    }

    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError('La fecha debe ser futura.');
      return;
    }

    const hour = parseInt(formData.time.split(':')[0], 10);
    if (hour < 12 || hour > 22) {
      setError('Las reservaciones solo están disponibles entre 12:00 PM y 10:00 PM.');
      return;
    }

    setError('');
    await sendReservation(); // 👈 Aquí se conecta con el backend

    alert(`Reserva confirmada para ${formData.name} el ${formData.date} a las ${formData.time} para ${formData.guests} personas.`);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: 1,
    });
  };

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <h2>Reserva tu mesa</h2>

      <label>
        Nombre:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>

      <label>
        Correo electrónico:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>

      <label>
        Teléfono:
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} maxLength="10" required />
      </label>

      <label>
        Fecha:
        <input type="date" name="date" value={formData.date} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} />
      </label>

      <label>
        Hora:
        <input type="time" name="time" value={formData.time} onChange={handleChange} required min="12:00" max="22:00" />
      </label>

      <label>
        Número de personas:
        <input type="number" name="guests" value={formData.guests} onChange={handleChange} min="1" max="20" required />
      </label>

      {error && <p className="error">{error}</p>}
      <button type="submit">Reservar</button>
    </form>
  );
}

export default ReservationForm;
