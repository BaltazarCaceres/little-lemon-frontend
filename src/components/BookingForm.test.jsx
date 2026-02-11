import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "./BookingForm";

describe("BookingForm component", () => {
  test("renders all required input fields with HTML5 validation attributes", () => {
    render(<BookingForm />);

    const nameInput = screen.getByLabelText(/Nombre/i);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const phoneInput = screen.getByLabelText(/Teléfono/i);
    const dateInput = screen.getByLabelText(/Fecha/i);
    const timeSelect = screen.getByLabelText(/Hora/i);
    const guestsInput = screen.getByLabelText(/Número de personas/i);

    expect(nameInput).toHaveAttribute("required");
    expect(emailInput).toHaveAttribute("type", "email");
    expect(phoneInput).toHaveAttribute("type", "tel");
    expect(dateInput).toHaveAttribute("type", "date");
    expect(timeSelect).toHaveAttribute("required");
    expect(guestsInput).toHaveAttribute("type", "number");
    expect(guestsInput).toHaveAttribute("min", "1");
    expect(guestsInput).toHaveAttribute("max", "20");
  });

  test("submit button is disabled when form is invalid", () => {
    render(<BookingForm />);
    const submitButton = screen.getByRole("button", { name: /Reservar/i });
    expect(submitButton).toBeDisabled();
  });

  test("submit button is enabled when form is valid", () => {
    render(<BookingForm />);
    const nameInput = screen.getByLabelText(/Nombre/i);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const phoneInput = screen.getByLabelText(/Teléfono/i);
    const dateInput = screen.getByLabelText(/Fecha/i);
    const timeSelect = screen.getByLabelText(/Hora/i);
    const guestsInput = screen.getByLabelText(/Número de personas/i);
    const submitButton = screen.getByRole("button", { name: /Reservar/i });

    fireEvent.change(nameInput, { target: { value: "Baltazar" } });
    fireEvent.change(emailInput, { target: { value: "baltazar@example.com" } });
    fireEvent.change(phoneInput, { target: { value: "9991234567" } });
    fireEvent.change(dateInput, { target: { value: "2026-02-15" } });
    fireEvent.change(timeSelect, { target: { value: "19:00" } });
    fireEvent.change(guestsInput, { target: { value: "2" } });

    expect(submitButton).toBeEnabled();
  });
});
