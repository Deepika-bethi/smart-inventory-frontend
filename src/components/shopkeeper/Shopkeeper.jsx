// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Shopkeeper() {
//   const [products, setProducts] = useState([]);  // EMPTY start
//   const [formData, setFormData] = useState({name:'', price:'', quantity:''});

//   useEffect(() => {
//     axios.get('/api/products')
//       .then(res => {
//         console.log('API DATA:', res.data);  // PROVES curl data loads
//         setProducts(res.data);  // ONLY API data
//       })
//       .catch(err => console.error('ERROR:', err));
//   }, []);

//   const addItem = (e) => {
//     e.preventDefault();
//     axios.post('/api/products', formData)
//       .then(() => window.location.reload())  // Hard refresh
//       .catch(err => console.error('POST ERROR:', err));
//   };

//   return (
//     <div>
//       <h2>Items from MySQL: {products.length}</h2>
//       <pre>{JSON.stringify(products, null, 2)}</pre>  {/* RAW API DATA */}
      
//       <form onSubmit={addItem}>
//         <input placeholder="name" onChange={e => setFormData({...formData, name: e.target.value})} />
//         <input type="number" placeholder="price" onChange={e => setFormData({...formData, price: e.target.value})} />
//         <input type="number" placeholder="quantity" onChange={e => setFormData({...formData, quantity: e.target.value})} />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

// export default Shopkeeper;


import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';

function Shopkeeper() {
  const [products, setProducts] = useState([]);
  
  // LOAD FROM API ONLY (no static data)
  useEffect(() => {
    console.log('📦 Shopkeeper loading products from API...');
    apiClient.get('/api/products')
      .then(res => {
        console.log('✅ Shopkeeper API DATA:', res.data);
        setProducts(res.data);
      })
      .catch(err => console.error('❌ API ERROR:', err));
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    const newItem = {
      name: e.target.name.value,
      price: parseFloat(e.target.price.value),
      quantity: parseInt(e.target.quantity.value)
    };
    
    try {
      await apiClient.post('/api/products', newItem);
      // Reload from API
      const res = await apiClient.get('/api/products');
      setProducts(res.data);
      e.target.reset();
    } catch (err) {
      console.error('Add failed:', err);
    }
  };

  return (
    <div style={{padding: 20}}>
      <h1>🛒 Shopkeeper ({products.length} from MySQL)</h1>
      
      {/* Add Form */}
      <form onSubmit={addItem} style={{marginBottom: 20}}>
        <input name="name" placeholder="Name" required style={{padding: 8, margin: 5}} />
        <input name="price" type="number" placeholder="Price" required style={{padding: 8, margin: 5}} />
        <input name="quantity" type="number" placeholder="Quantity" required style={{padding: 8, margin: 5}} />
        <button type="submit" style={{padding: 8, margin: 5}}>Add to MySQL</button>
      </form>

      {/* Show EXACT API data */}
      <h3>From MySQL:</h3>
      <pre>{JSON.stringify(products, null, 2)}</pre>
      
      <table border="1" style={{width: '100%', marginTop: 20}}>
        <thead>
          <tr><th>Name</th><th>₹Price</th><th>Stock</th><th>Status</th></tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.quantity}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Shopkeeper;
