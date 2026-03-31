import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import ItemForm from '../components/shopkeeper/ItemForm';
import ItemList from '../components/shopkeeper/ItemList';

export default function ShopkeeperDashboard() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load items from backend on mount
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/api/products');
      console.log('📦 Shopkeeper loaded items:', res.data);
      setItems(res.data);
    } catch (err) {
      console.error('❌ Error loading items:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h2>🛒 Shopkeeper Dashboard ({items.length} items)</h2>
      
      <ItemForm 
        items={items} 
        setItems={setItems}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
        onItemSaved={loadItems}
      />
      
      {loading ? (
        <p style={{textAlign: 'center', padding: '3rem'}}>⏳ Loading items...</p>
      ) : items.length === 0 ? (
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
