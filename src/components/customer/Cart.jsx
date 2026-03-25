export default function Cart({ cart, setCart }) {
  // Remove single item from cart
  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  // Update quantity for specific cart item
  const updateQty = (index, newQty) => {
    if (newQty <= 0) {
      removeFromCart(index);
      return;
    }
    setCart(cart.map((item, i) => 
      i === index ? { ...item, qty: newQty } : item
    ));
  };

  // Checkout - Update shopkeeper stock
  const checkout = () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }

    let inventory = JSON.parse(localStorage.getItem('smartInventoryItems') || '[]');
    let total = 0;

    cart.forEach(cartItem => {
      const shopItem = inventory.find(item => item.id === cartItem.id);
      if (shopItem) {
        shopItem.quantity = Math.max(0, shopItem.quantity - (cartItem.qty || 1));
        total += shopItem.price * (cartItem.qty || 1);
      }
    });

    localStorage.setItem('smartInventoryItems', JSON.stringify(inventory));
    alert(`✅ Purchase Complete!\nTotal: ₹${total.toFixed(2)}`);
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);

  if (cart.length === 0) {
    return (
      <div className="cart empty" style={{padding: '2rem', textAlign: 'center'}}>
        <h3>🛒 Shopping Cart (0)</h3>
        <p>Cart is empty. Add items from left!</p>
      </div>
    );
  }

  return (
    <div className="cart" style={{padding: '1.5rem', border: '2px solid #333', borderRadius: '10px'}}>
      <h3>🛒 Shopping Cart ({cart.length} items)</h3>
      
      {/* CART ITEMS WITH QUANTITY INPUTS */}
      <div style={{maxHeight: '300px', overflowY: 'auto'}}>
        {cart.map((item, index) => (
          <div key={index} style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '1rem', 
            borderBottom: '1px solid #eee',
            gap: '1rem'
          }}>
            <div style={{flex: 1}}>
              <strong>{item.name}</strong>
              <div>₹{item.price.toFixed(2)}</div>
            </div>
            
            {/* QUANTITY INPUT */}
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <label>Qty:</label>
              <input 
                type="number"
                min="1"
                value={item.qty || 1}
                onChange={(e) => updateQty(index, parseInt(e.target.value))}
                style={{
                  width: '60px', 
                  padding: '0.5rem', 
                  border: '1px solid #ccc', 
                  borderRadius: '5px',
                  textAlign: 'center'
                }}
              />
              <div>₹{(item.price * (item.qty || 1)).toFixed(2)}</div>
            </div>
            
            {/* REMOVE BUTTON */}
            <button 
              onClick={() => removeFromCart(index)}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* TOTAL & CHECKOUT */}
      <div style={{marginTop: '1.5rem', paddingTop: '1rem', borderTop: '2px solid #333'}}>
        <h3 style={{textAlign: 'center', marginBottom: '1rem'}}>
          Total: ₹{total.toFixed(2)}
        </h3>
        <button 
          onClick={checkout}
          style={{
            width: '100%',
            background: '#28a745',
            color: 'white',
            border: 'none',
            padding: '1rem',
            fontSize: '1.1rem',
            borderRadius: '10px',
            cursor: 'pointer'
          }}
        >
          💳 Checkout & Pay
        </button>
      </div>
    </div>
  );
}
