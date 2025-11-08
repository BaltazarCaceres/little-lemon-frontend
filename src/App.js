import { Routes, Route } from 'react-router-dom'; // ❌ No importes BrowserRouter aquí
// ...otros imports

function App() {
  // ...tu lógica de estado

  return (
    <>
      <Header />
      <main>
        <button
          className="open-cart-btn"
          onClick={() => setIsCartOpen(true)}
          title={cartItems.length === 0 ? 'Agrega productos para continuar' : 'Ver carrito'}
        >
          🛒
          {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
        </button>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu addToCart={addToCart} />} />
          <Route path="/reservas" element={<ReservationForm />} />
          <Route path="/nosotros" element={<AboutUs />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>

        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          applyDiscount={applyDiscount}
          total={discountedTotal}
          discount={discount}
          resetCart={resetCart}
          discountMessage={discountMessage}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
