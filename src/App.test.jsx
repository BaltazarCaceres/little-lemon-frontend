import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

test('renderiza el botón del carrito', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Verifica que el botón del carrito esté presente
  const cartButton = screen.getByTitle(/agrega productos para continuar/i);
  expect(cartButton).toBeInTheDocument();
});


