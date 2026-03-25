export default function ItemList({ items, setItems, setEditingItem }) {
  const deleteItem = async (id) => {
    if (!confirm('Delete this item?')) return;

    try {
      // Attempt backend deletion first
      const resp = await fetch(`http://localhost:8080/api/pro/${id}`, { method: 'DELETE' });
      if (!resp.ok) throw new Error(await resp.text());

      setItems(items.filter(item => item.id !== id));
      alert('✅ Item deleted from MySQL');
    } catch (err) {
      console.error('Delete error', err);
      alert('❌ Could not delete item: ' + err.message);
    }
  };

  const editItem = (item) => {
    console.log('✏️ Edit clicked:', item);
    setEditingItem(item); // **TRIGGERS useEffect in ItemForm**
  };

  return (
    <div>
      <h3 style={{marginBottom: '1rem'}}>📋 Inventory ({items.length} items)</h3>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', color: 'white'}}>
            <th style={{padding: '1rem', textAlign: 'left'}}>Name</th>
            <th style={{padding: '1rem', textAlign: 'left'}}>Price</th>
            <th style={{padding: '1rem', textAlign: 'left'}}>Stock</th>
            <th style={{padding: '1rem', textAlign: 'left'}}>Status</th>
            <th style={{padding: '1rem', textAlign: 'left'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} style={{
              background: item.quantity < 5 ? '#fff3cd' : 'white'
            }}>
              <td style={{padding: '1rem'}}>{item.name}</td>
              <td style={{padding: '1rem'}}>₹{item.price.toFixed(2)}</td>
              <td style={{padding: '1rem'}}>{item.quantity}</td>
              <td style={{padding: '1rem'}}>
                {item.quantity < 5 ? `LOW (${item.quantity})` : 'OK'}
              </td>
              <td style={{padding: '1rem'}}>
                <button 
                  onClick={() => editItem(item)}
                  style={{
                    background: '#ffc107', color: '#212529', border: 'none',
                    padding: '0.5rem 1rem', borderRadius: '5px', marginRight: '0.5rem',
                    cursor: 'pointer', fontSize: '0.9rem'
                  }}
                >
                  ✏️ Edit
                </button>
                <button 
                  onClick={() => deleteItem(item.id)}
                  style={{
                    background: '#dc3545', color: 'white', border: 'none',
                    padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
