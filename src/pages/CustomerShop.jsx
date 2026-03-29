import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../components/customer/ProductList';
import Cart from '../components/customer/Cart';

export default function CustomerShop() {
  const [cart, setCart] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);

  // Load from API instead of localStorage
  useEffect(() => {
    console.log('🛒 Customer loading products from API...');
    axios.get('http://localhost:8080/api/products')
      .then(res => {
        console.log('✅ Customer API data:', res.data);
        const inStock = res.data.filter(item => item.quantity > 0);
        setAvailableProducts(inStock);
      })
      .catch(err => {
        console.error('❌ Customer API error:', err);
        setAvailableProducts([]);
      });
  }, []);

  const addToCart = (product) => {
    const cartItem = { ...product, qty: 1 };
    setCart([...cart, cartItem]);
    console.log('Added to cart:', cartItem);
  };

  const refreshStock = () => {
    console.log('🔄 Refreshing stock from API...');
    axios.get('http://localhost:8080/api/products')
      .then(res => {
        const inStock = res.data.filter(item => item.quantity > 0);
        setAvailableProducts(inStock);
      })
      .catch(err => console.error('Refresh error:', err));
  };

  return (
    <div className="shop">
      <h2>🛍️ Customer Shop ({availableProducts.length} available)</h2>
      
      <div className="shop-container">
        <div className="products-section">
          {availableProducts.length === 0 ? (
            <div style={{padding: '2rem', textAlign: 'center', color: '#666'}}>
              <h3>📭 No Products Available</h3>
              <p>Ask shopkeeper to add items first!</p>
              <button className="btn btn-info" onClick={refreshStock}>
                🔄 Check Again
              </button>
            </div>
          ) : (
            <>
              <ProductList products={availableProducts} addToCart={addToCart} />
              <button className="btn btn-info" onClick={refreshStock}>
                🔄 Refresh Stock
              </button>
            </>
          )}
        </div>
        
        <div className="cart-section">
          <Cart cart={cart} setCart={setCart} />
        </div>
      </div>
    </div>
  );
}
