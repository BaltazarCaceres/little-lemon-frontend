import React, { useState, useEffect } from "react";

function BookingForm() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    if (date) {
      const times = fetchAPI(new Date(date));
      setAvailableTimes(times);
    }
  }, [date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = submitAPI({ date, time, name });
    if (success) {
      alert("Reserva enviada correctamente!");
    } else {
      alert("Error al enviar la reserva.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Fecha:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Hora:
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        >
          <option value="">Selecciona una hora</option>
          {availableTimes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit">Reservar</button>
    </form>
  );
}

export default BookingForm;
