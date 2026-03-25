import React, { useState } from 'react';

function AddItem() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    status: 'OK'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const pro = {
      name: formData.name,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      status: formData.status
    };

    console.log("Sending to backend:", pro); // Debug log

    try {
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pro)
      });

      console.log("Response status:", response.status); // Debug log

      if (response.ok) {
        alert('✅ Product saved to MySQL!');
        setFormData({ name: '', price: '', quantity: '', status: 'OK' });
      } else {
        const errorText = await response.text();
        console.error("Backend error:", errorText);
        alert('❌ Error: ' + errorText);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('❌ Network error - is Spring Boot running on port 8080?');
    }
  };

  return (
    <div style={{ maxWidth: '400px', padding: '20px', margin: '20px' }}>
      <h2>Add Product to Database</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            placeholder="Product Name (e.g. Rice)"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <input
            placeholder="Price (e.g. 25.50)"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <input
            placeholder="Quantity (e.g. 10)"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            required
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '12px', 
            background: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          💾 Save to MySQL
        </button>
      </form>
      
      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <strong>Debug tips:</strong><br/>
        • Check Browser Console (F12)<br/>
        • Check Spring Boot logs<br/>
        • Backend must run on port 8080
      </div>
    </div>
  );
}

export default AddItem;
