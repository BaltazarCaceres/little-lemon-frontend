import { useEffect, useState } from 'react';
import './AdminPanel.css'; // Puedes crear estilos personalizados aquí

export default function AdminPanel() {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://little-lemon-backend.onrender.com/reservations')
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener las reservaciones');
        return res.json();
      })
      .then((data) => setReservas(data))
      .catch((err) => {
        console.error(err);
        setError('No se pudieron cargar las reservaciones');
      });
  }, []);

  return (
    <section className="admin-panel">
      <h2>📋 Panel de Reservaciones</h2>
      {error && <p className="error">{error}</p>}
      {reservas.length === 0 ? (
        <p>No hay reservaciones registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Personas</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva._id}>
                <td>{reserva.name}</td>
                <td>{reserva.email}</td>
                <td>{reserva.phone}</td>
                <td>{reserva.date}</td>
                <td>{reserva.time}</td>
                <td>{reserva.guests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
