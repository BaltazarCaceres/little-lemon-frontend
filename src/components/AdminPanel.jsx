import React, { useEffect, useState } from "react";
import "./AdminPanel.css";

function AdminPanel() {
  const [reservaciones, setReservaciones] = useState([]);
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Estado para modal de confirmación
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Estado para toast
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // 🔄 Función para cargar datos
  const fetchData = async () => {
    setLoading(true);
    try {
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
      mostrarToast("Datos actualizados correctamente ✅", "success");
    } catch (err) {
      setError(err.message);
      mostrarToast("❌ Error al actualizar datos", "error");
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al iniciar
  useEffect(() => {
    fetchData();
  }, []);

  // 🗑️ Confirmar eliminación
  const confirmarEliminacion = (type, id) => {
    setDeleteTarget({ type, id });
    setShowModal(true);
  };

  // 🗑️ Ejecutar eliminación
  const eliminarElemento = async () => {
    if (!deleteTarget) return;

    try {
      if (deleteTarget.type === "reserva") {
        const res = await fetch(
          `https://little-lemon-backend-n4ky.onrender.com/api/reservaciones/${deleteTarget.id}`,
          { method: "DELETE" }
        );
        if (!res.ok) throw new Error("Error al eliminar reservación");
        setReservaciones(reservaciones.filter((r) => r._id !== deleteTarget.id));
        mostrarToast(
          "Reservación eliminada con éxito ✅ – Actualiza la página para ver cambios",
          "success"
        );
      } else if (deleteTarget.type === "contacto") {
        const res = await fetch(
          `https://little-lemon-backend-n4ky.onrender.com/api/contacto/${deleteTarget.id}`,
          { method: "DELETE" }
        );
        if (!res.ok) throw new Error("Error al eliminar contacto");
        setContactos(contactos.filter((c) => c._id !== deleteTarget.id));
        mostrarToast(
          "Contacto eliminado con éxito ✅ – Actualiza la página para ver cambios",
          "success"
        );
      }
    } catch (err) {
      console.error("❌ Error al eliminar:", err);
      mostrarToast(err.message || "Error al eliminar ❌", "error");
    } finally {
      setShowModal(false);
      setDeleteTarget(null);
    }
  };

  // 🎉 Mostrar toast
  const mostrarToast = (mensaje, tipo) => {
    setToastMessage(mensaje);
    setToastType(tipo);
    setTimeout(() => setToastMessage(""), 4000);
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>

      {/* Contador */}
      <div className="counter">
        Total reservaciones: {reservaciones.length} | Total contactos: {contactos.length}
      </div>

      {/* Botón de actualizar datos */}
      <button className="refresh-btn" onClick={fetchData}>
        🔄 Actualizar datos
      </button>

      {/* Reservaciones */}
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
                <button
                  className="delete-btn"
                  onClick={() => confirmarEliminacion("reserva", reserva._id)}
                >
                  🗑️ Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Contactos */}
      <section>
        <h2>✉️ Contactos</h2>
        {contactos.length === 0 ? (
          <p>No hay mensajes de contacto.</p>
        ) : (
          <ul>
            {contactos.map((contacto) => (
              <li key={contacto._id}>
                <strong>{contacto.name}</strong> — {contacto.email}:{" "}
                {contacto.message}
                <button
                  className="delete-btn"
                  onClick={() => confirmarEliminacion("contacto", contacto._id)}
                >
                  🗑️ Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>
              ¿Seguro que quieres eliminar esta{" "}
              {deleteTarget?.type === "reserva"
                ? "reservación"
                : "entrada de contacto"}
              ?
            </p>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={eliminarElemento}>
                ✅ Sí, eliminar
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className={toastType === "success" ? "toast" : "toast-error"}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
