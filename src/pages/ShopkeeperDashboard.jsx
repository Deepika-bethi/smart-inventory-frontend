import React, { useState, useEffect } from 'react';  // ✅ FIXED IMPORT
import ItemForm from '../components/shopkeeper/ItemForm';
import ItemList from '../components/shopkeeper/ItemList';

export default function ShopkeeperDashboard() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  return (
    <div className="dashboard">
      <h2>🛒 Shopkeeper Dashboard ({items.length} items)</h2>
      
      <ItemForm 
        items={items} 
        setItems={setItems}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
      />
      
      {items.length === 0 ? (
        <p style={{textAlign: 'center', padding: '3rem'}}>No items - add first!</p>
      ) : (
        <ItemList 
          items={items} 
          setItems={setItems}
          setEditingItem={setEditingItem}  // ✅ FIXED COMMA HERE
        />
      )}
    </div>
  );
}
