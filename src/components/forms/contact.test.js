import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from './ContactForm';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ mensaje: 'Mensaje enviado con éxito' }),
  })
);

test('renderiza el formulario de contacto y permite ingresar datos', () => {
  render(<ContactForm />);

  const nameInput = screen.getByPlaceholderText(/nombre/i);
  const emailInput = screen.getByPlaceholderText(/correo/i);
  const messageInput = screen.getByPlaceholderText(/mensaje/i);
  const dateInput = screen.getByLabelText(/fecha/i);
  const timeInput = screen.getByLabelText(/hora/i);
  const guestsInput = screen.getByLabelText(/número de personas/i);
  const submitButton = screen.getByRole('button', { name: /enviar mensaje/i });

  fireEvent.change(nameInput, { target: { value: 'Baltazar' } });
  fireEvent.change(emailInput, { target: { value: 'baltazar@example.com' } });
  fireEvent.change(messageInput, { target: { value: 'Quiero saber más sobre el menú' } });
  fireEvent.change(dateInput, { target: { value: '2025-12-01' } });
  fireEvent.change(timeInput, { target: { value: '14:00' } });
  fireEvent.change(guestsInput, { target: { value: '2' } });

  expect(nameInput.value).toBe('Baltazar');
  expect(emailInput.value).toBe('baltazar@example.com');
  expect(messageInput.value).toBe('Quiero saber más sobre el menú');
  expect(dateInput.value).toBe('2025-12-01');
  expect(timeInput.value).toBe('14:00');
  expect(guestsInput.value).toBe('2');
});

test('envía datos al backend al hacer submit', async () => {
  render(<ContactForm />);

  fireEvent.change(screen.getByPlaceholderText(/nombre/i), { target: { value: 'Baltazar' } });
  fireEvent.change(screen.getByPlaceholderText(/correo/i), { target: { value: 'baltazar@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/mensaje/i), { target: { value: 'Quiero saber más sobre el menú' } });
  fireEvent.change(screen.getByLabelText(/fecha/i), { target: { value: '2025-12-01' } });
  fireEvent.change(screen.getByLabelText(/hora/i), { target: { value: '14:00' } });
  fireEvent.change(screen.getByLabelText(/número de personas/i), { target: { value: '2' } });

  fireEvent.click(screen.getByRole('button', { name: /enviar mensaje/i }));

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining('/contact'),
    expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: expect.any(String)
    })
  );
});
