import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // ✅ Importa el router
import App from './App.jsx'; // ✅ Asegúrate de usar la extensión correcta si renombraste

test('renders learn react link', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

