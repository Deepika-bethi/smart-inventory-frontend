// // COMPLETE WORKING Inventory.jsx
// import React, { useState, useEffect } from 'react';

// const Inventory = () => {
//   const [products, setProducts] = useState([]);  // ← EMPTY!
//   const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '' });

//   // ✅ REAL BACKEND CALL
//   useEffect(() => {
//     fetch('http://localhost:8080/api/products')
//       .then(res => res.json())
//       .then(data => {
//         console.log('API DATA:', data);  // DEBUG
//         setProducts(data);
//       })
//       .catch(err => console.error('FETCH ERROR:', err));
//   }, []);

//   // ✅ REAL BACKEND SAVE
//   const addProduct = async (e) => {
//     e.preventDefault();
//     console.log('ADDING:', newProduct);  // DEBUG
    
//     const response = await fetch('http://localhost:8080/api/products', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         name: newProduct.name,
//         price: parseFloat(newProduct.price),
//         quantity: parseInt(newProduct.quantity)
//       })
//     });
    
//     const saved = await response.json();
//     console.log('SAVED:', saved);  // DEBUG
    
//     setNewProduct({ name: '', price: '', quantity: '' });
//     // REFETCH
//     window.location.reload();  // SIMPLE REFRESH
//   };

//   return (
//     <div>
//       <h2>Inventory ({products.length} items)</h2>
      
//       <form onSubmit={addProduct}>
//         <input 
//           placeholder="Name" 
//           value={newProduct.name}
//           onChange={e => setNewProduct({...newProduct, name: e.target.value})}
//         />
//         <input 
//           type="number" 
//           placeholder="Price" 
//           value={newProduct.price}
//           onChange={e => setNewProduct({...newProduct, price: e.target.value})}
//         />
//         <input 
//           type="number" 
//           placeholder="Quantity" 
//           value={newProduct.quantity}
//           onChange={e => setNewProduct({...newProduct, quantity: e.target.value})}
//         />
//         <button type="submit">Add Item</button>
//       </form>

//       <table>
//         <thead>
//           <tr><th>Name</th><th>Price</th><th>Stock</th></tr>
//         </thead>
//         <tbody>
//           {products.map(p => (
//             <tr key={p.id}>
//               <td>{p.name}</td>
//               <td>₹{p.price}</td>
//               <td>{p.quantity}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Inventory;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Shopkeeper = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('OK');

  // Fetch all products from MySQL on component load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name || !price || !quantity) return;

    try {
      const newProduct = { name, price: parseFloat(price), quantity: parseInt(quantity), status };
      await axios.post('/api/products', newProduct);
      
      // Refetch to update dashboard
      setName(''); setPrice(''); setQuantity(''); setStatus('OK');
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="shopkeeper-dashboard">
      <h2>🛒 Shopkeeper Dashboard ({products.length} items)</h2>
      
      {/* Add New Item Form */}
      <form onSubmit={handleAdd} className="add-item-form">
        <h3>➕ Add New Item</h3>
        <input
          type="text"
          placeholder="Name (e.g., sugar)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="OK">OK</option>
          <option value="Low">Low</option>
          <option value="Out">Out</option>
        </select>
        <button type="submit">➕ Add Item</button>
      </form>

      {/* Inventory Table */}
      <div className="inventory">
        <h3>📋 Inventory ({products.length} items)</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>₹{product.price?.toFixed(2) || 0}</td>
                <td>{product.quantity}</td>
                <td>{product.status}</td>
                <td>
                  <button onClick={() => handleDelete(product.id)}>🗑️ Delete</button>
                  {/* Add Edit button logic here if needed */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shopkeeper;
