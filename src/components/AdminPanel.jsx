import React, { useEffect, useState } from "react";
import "./AdminPanel.css";

function AdminPanel() {
  const [reservaciones, setReservaciones] = useState([]);
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llamadas al backend
        const resReservas = await fetch(
          "https://little-lemon-backend-n4ky.onrender.com/api/reservaciones"
        );
        const resContactos = await fetch(
          "https://little-lemon-backend-n4ky.onrender.com/api/contacto"
        );

        if (!resReservas.ok || !resContactos.ok) {
          throw new Error("Error al obtener datos del servidor");
        }

        const dataReservas = await resReservas.json();
        const dataContactos = await resContactos.json();

        setReservaciones(dataReservas);
        setContactos(dataContactos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>

      <section>
        <h2>📋 Reservaciones</h2>
        {reservaciones.length === 0 ? (
          <p>No hay reservaciones registradas.</p>
        ) : (
          <ul>
            {reservaciones.map((reserva) => (
              <li key={reserva._id}>
                <strong>{reserva.name}</strong> — {reserva.date} {reserva.time}  
                ({reserva.guests} personas)
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>✉️ Contactos</h2>
        {contactos.length === 0 ? (
          <p>No hay mensajes de contacto.</p>
        ) : (
          <ul>
            {contactos.map((contacto) => (
              <li key={contacto._id}>
                <strong>{contacto.name}</strong> — {contacto.email}: {contacto.message}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default AdminPanel;

