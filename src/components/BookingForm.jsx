import React, { useState, useEffect } from "react";

function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
  });

  const [availableTimes, setAvailableTimes] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // Simulación de fetchAPI: reemplázalo con tu lógica real
  const fetchAPI = (date) => {
    return ["18:00", "19:00", "20:00", "21:00"];
  };

  useEffect(() => {
    if (formData.date) {
      const times = fetchAPI(new Date(formData.date));
      setAvailableTimes(times);
    }
  }, [formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://little-lemon-backend-n4ky.onrender.com/api/reservaciones",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Error al guardar la reservación");

      await response.json();
      setMensaje("✅ Reservación guardada con éxito");
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 1,
      });
    } catch (error) {
      console.error("Error:", error);
      setMensaje("❌ No se pudo guardar la reservación. Intenta más tarde.");
    }
  };

  const isValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.date &&
    formData.time &&
    formData.guests >= 1;

  return (
    <form onSubmit={handleSubmit} className="reservation-form" autoComplete="off">
      <h2>Reserva tu mesa</h2>

      <label htmlFor="name">Nombre:</label>
      <input id="name" name="name" value={formData.name} onChange={handleChange} required />

      <label htmlFor="email">Correo electrónico:</label>
      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />

      <label htmlFor="phone">Teléfono:</label>
      <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />

      <label htmlFor="date">Fecha:</label>
      <input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />

      <label htmlFor="time">Hora:</label>
      <select id="time" name="time" value={formData.time} onChange={handleChange} required>
        <option value="">Selecciona una hora</option>
        {availableTimes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <label htmlFor="guests">Número de personas:</label>
      <input id="guests" name="guests" type="number" min="1" max="20" value={formData.guests} onChange={handleChange} required />

      <button type="submit" disabled={!isValid}>Reservar</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}

export default BookingForm;
