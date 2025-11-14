import { render, screen, fireEvent } from '@testing-library/react';
import ReservationForm from './ReservationForm';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ mensaje: 'Reservación guardada con éxito' }),
  })
);

test('renderiza el formulario y permite ingresar datos', () => {
  render(<ReservationForm />);

  const nameInput = screen.getByPlaceholderText(/nombre/i);
  const emailInput = screen.getByPlaceholderText(/correo/i);
  const phoneInput = screen.getByPlaceholderText(/teléfono/i);
  const dateInput = screen.getByLabelText(/fecha/i);
  const timeInput = screen.getByLabelText(/hora/i);
  const guestsInput = screen.getByLabelText(/número de personas/i);
  const submitButton = screen.getByRole('button', { name: /enviar reservación/i });

  fireEvent.change(nameInput, { target: { value: 'Baltazar' } });
  fireEvent.change(emailInput, { target: { value: 'baltazar@example.com' } });
  fireEvent.change(phoneInput, { target: { value: '9991234567' } });
  fireEvent.change(dateInput, { target: { value: '2025-12-01' } });
  fireEvent.change(timeInput, { target: { value: '19:00' } });
  fireEvent.change(guestsInput, { target: { value: '4' } });

  expect(nameInput.value).toBe('Baltazar');
  expect(emailInput.value).toBe('baltazar@example.com');
  expect(phoneInput.value).toBe('9991234567');
  expect(dateInput.value).toBe('2025-12-01');
  expect(timeInput.value).toBe('19:00');
  expect(guestsInput.value).toBe('4');
});

test('envía datos al backend al hacer submit', async () => {
  render(<ReservationForm />);

  fireEvent.change(screen.getByPlaceholderText(/nombre/i), { target: { value: 'Baltazar' } });
  fireEvent.change(screen.getByPlaceholderText(/correo/i), { target: { value: 'baltazar@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/teléfono/i), { target: { value: '9991234567' } });
  fireEvent.change(screen.getByLabelText(/fecha/i), { target: { value: '2025-12-01' } });
  fireEvent.change(screen.getByLabelText(/hora/i), { target: { value: '19:00' } });
  fireEvent.change(screen.getByLabelText(/número de personas/i), { target: { value: '4' } });

  fireEvent.click(screen.getByRole('button', { name: /enviar reservación/i }));

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining('/api/reservaciones'),
    expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: expect.any(String)
    })
  );
});

