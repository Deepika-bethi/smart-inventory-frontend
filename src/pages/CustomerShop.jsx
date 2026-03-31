import { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import ProductList from '../components/customer/ProductList';
import Cart from '../components/customer/Cart';

export default function CustomerShop() {
  const [cart, setCart] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load from API instead of localStorage
  useEffect(() => {
    console.log('🛒 Customer loading products from API...');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(null);
    let isMounted = true;
    apiClient.get('/api/products')
      .then(res => {
        if (isMounted) {
          console.log('✅ Customer API data:', res.data);
          const inStock = res.data.filter(item => item.quantity > 0);
          console.log('📦 In stock items:', inStock.length);
          setAvailableProducts(inStock);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          console.error('❌ Customer API error:', err);
          setError(err.message);
          setAvailableProducts([]);
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const addToCart = (product) => {
    const cartItem = { ...product, qty: 1 };
    setCart([...cart, cartItem]);
    console.log('Added to cart:', cartItem);
  };

  const refreshStock = () => {
    console.log('🔄 Refreshing stock from API...');
    setLoading(true);
    apiClient.get('/api/products')
      .then(res => {
        const inStock = res.data.filter(item => item.quantity > 0);
        setAvailableProducts(inStock);
        setError(null);
      })
      .catch(err => {
        console.error('Refresh error:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading && <p style={{textAlign: 'center', color: '#666'}}>⏳ Loading products...</p>}
      {error && <p style={{textAlign: 'center', color: 'red'}}>❌ Error: {error}</p>}
      {!loading && !error && (
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
      )}
    </>
  );
}
