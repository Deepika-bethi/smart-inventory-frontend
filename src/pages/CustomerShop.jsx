import { useState, useEffect } from 'react';
import ProductList from '../components/customer/ProductList';
import Cart from '../components/customer/Cart';

export default function CustomerShop() {
  const [cart, setCart] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);

  // Load from SAME KEY as Shopkeeper ('smartInventoryItems')
  useEffect(() => {
    console.log('🛒 Customer loading inventory...');
    const savedItems = localStorage.getItem('smartInventoryItems');
    if (savedItems) {
      try {
        const items = JSON.parse(savedItems);
        console.log('✅ Customer found items:', items);
        const inStock = items.filter(item => item.quantity > 0);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAvailableProducts(inStock);
      } catch (e) {
        console.error('Customer load error:', e);
      }
    } else {
      console.log('❌ No inventory found');
    }
  }, []);

  const addToCart = (product) => {
    const cartItem = { ...product, qty: 1 };
    setCart([...cart, cartItem]);
    console.log('Added to cart:', cartItem);
  };

  const refreshStock = () => {
    console.log('🔄 Refreshing stock...');
    const savedItems = localStorage.getItem('smartInventoryItems');
    if (savedItems) {
      const items = JSON.parse(savedItems);
      const inStock = items.filter(item => item.quantity > 0);
      setAvailableProducts(inStock);
    }
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
