import { render, screen, fireEvent } from '@testing-library/react';
import ReservationForm from './ReservationForm';

test('renderiza el formulario y permite ingresar datos', () => {
  render(<ReservationForm />);

  // Buscar los campos por label o placeholder
  const nameInput = screen.getByLabelText(/nombre/i);
  const emailInput = screen.getByLabelText(/correo/i);
  const phoneInput = screen.getByLabelText(/teléfono/i);
  const dateInput = screen.getByLabelText(/fecha/i);
  const timeInput = screen.getByLabelText(/hora/i);
  const guestsInput = screen.getByLabelText(/invitados/i);
  const submitButton = screen.getByRole('button', { name: /reservar/i });

  // Verificar que estén en el documento
  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(phoneInput).toBeInTheDocument();
  expect(dateInput).toBeInTheDocument();
  expect(timeInput).toBeInTheDocument();
  expect(guestsInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  // Simular entrada de datos
  fireEvent.change(nameInput, { target: { value: 'Baltazar' } });
  fireEvent.change(emailInput, { target: { value: 'baltazar@example.com' } });
  fireEvent.change(phoneInput, { target: { value: '9991234567' } });
  fireEvent.change(dateInput, { target: { value: '2025-12-01' } });
  fireEvent.change(timeInput, { target: { value: '19:00' } });
  fireEvent.change(guestsInput, { target: { value: '4' } });

  // Verificar que los valores se actualizan
  expect(nameInput.value).toBe('Baltazar');
  expect(emailInput.value).toBe('baltazar@example.com');
  expect(phoneInput.value).toBe('9991234567');
  expect(dateInput.value).toBe('2025-12-01');
  expect(timeInput.value).toBe('19:00');
  expect(guestsInput.value).toBe('4');
});
