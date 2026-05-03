import { useEffect, useState, useContext } from "react";
import { CartContext } from "./CartContext";

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const { cart, addToCart, clearCart } = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/orders")
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  const handleCheckout = async () => {
    const res = await fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ items: cart })
    });

    const newOrder = await res.json();
    setOrders(prev => [...prev, newOrder]);
    clearCart();
  };

  return (
    <div>
      <h1>Products</h1>

      {products.map(p => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}

      <h2>Cart</h2>
      {cart.map((item, i) => (
        <p key={i}>{item.name}</p>
      ))}

      {cart.length > 0 && (
        <button onClick={handleCheckout}>Checkout</button>
      )}

      <h2>Orders</h2>
      {orders.map(o => (
        <div key={o.id}>
          <h4>Order #{o.id}</h4>
        </div>
      ))}
    </div>
  );
}

export default App;