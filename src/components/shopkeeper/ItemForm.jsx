import { useState, useEffect } from 'react';

export default function ItemForm({ setItems, editingItem, setEditingItem }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  // **CRITICAL: Populate form when editingItem changes**
  useEffect(() => {
    if (editingItem) {
      console.log('🔄 Editing:', editingItem);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(editingItem.name || '');
      setPrice(editingItem.price ? editingItem.price.toString() : '');
      setQuantity(editingItem.quantity ? editingItem.quantity.toString() : '');
    } else {
      // Clear form for new item
      setName('');
      setPrice('');
      setQuantity('');
    }
  }, [editingItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price || !quantity) {
      alert('Fill all fields!');
      return;
    }

    const itemData = {
      name: name.trim(),
      price: parseFloat(price),
      quantity: parseInt(quantity),
      status: 'OK'
    };

    try {
      if (editingItem) {
        // local edit path (optional): keep existing behavior
        const edited = { ...editingItem, ...itemData };
        setItems(prevItems => prevItems.map(item => item.id === editingItem.id ? edited : item));
        setEditingItem(null);
        alert(`✅ ${edited.name} updated!`);
      } else {
        const response = await fetch('http://localhost:8080/api/pro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemData)
        });

        if (!response.ok) {
          const msg = await response.text();
          throw new Error(msg || 'Failed to persist item');
        }

        const savedItem = await response.json();
        setItems(prevItems => [...prevItems, savedItem]);
        alert(`✅ ${savedItem.name} stored in MySQL (id=${savedItem.id})!`);
      }
    } catch (err) {
      console.error('Error saving item to backend:', err);
      alert('❌ Failed to save: ' + err.message);
    } finally {
      setName('');
      setPrice('');
      setQuantity('');
    }
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setName('');
    setPrice('');
    setQuantity('');
  };

  return (
    <form onSubmit={handleSubmit} style={{background: '#f8f9ff', padding: '2rem', borderRadius: '15px', marginBottom: '2rem'}}>
      <h3 style={{marginBottom: '1rem'}}>
        {editingItem 
          ? `✏️ Edit: ${editingItem.name}` 
          : '➕ Add New Item'
        }
      </h3>
      
      <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
        <input 
          type="text"
          placeholder="Item Name (Rice)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            flex: 1, minWidth: '200px', padding: '1rem', 
            border: '2px solid #e9ecef', borderRadius: '10px',
            fontSize: '1rem'
          }}
        />
        
        <input 
          type="number" step="0.01" min="0"
          placeholder="Price (50)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            flex: 1, minWidth: '150px', padding: '1rem', 
            border: '2px solid #e9ecef', borderRadius: '10px'
          }}
        />
        
        <input 
          type="number" min="0"
          placeholder="Quantity (100)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{
            flex: 1, minWidth: '150px', padding: '1rem', 
            border: '2px solid #e9ecef', borderRadius: '10px'
          }}
        />
      </div>
      
      <div style={{marginTop: '1rem', display: 'flex', gap: '1rem'}}>
        <button 
          type="submit" 
          style={{
            background: '#28a745', color: 'white', border: 'none',
            padding: '1rem 2rem', borderRadius: '10px', fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {editingItem ? '💾 Update Item' : '➕ Add Item'}
        </button>
        
        {editingItem && (
          <button 
            type="button" 
            onClick={cancelEdit}
            style={{
              background: '#6c757d', color: 'white', border: 'none',
              padding: '1rem 2rem', borderRadius: '10px', cursor: 'pointer'
            }}
          >
            ❌ Cancel
          </button>
        )}
      </div>
    </form>
  );
}
