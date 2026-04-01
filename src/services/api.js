// // src/services/api.js
// const API_BASE_URL = 'https://smart-inventory-backend-my2r.onrender.com/api';

// export const productAPI = {
//   getAll: async () => {
//     const response = await fetch(`${API_BASE_URL}/products`);
//     if (!response.ok) throw new Error('Failed to fetch products');
//     return response.json();
//   },

//   getAvailable: async () => {
//     const response = await fetch(`${API_BASE_URL}/products/available`);
//     if (!response.ok) throw new Error('Failed to fetch available products');
//     return response.json();
//   },

//   create: async (product) => {
//     const response = await fetch(`${API_BASE_URL}/products`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(product)
//     });
//     if (!response.ok) throw new Error('Failed to create product');
//     return response.json();
//   },

//   update: async (id, product) => {
//     const response = await fetch(`${API_BASE_URL}/products/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(product)
//     });
//     if (!response.ok) throw new Error('Failed to update product');
//     return response.json();
//   },

//   delete: async (id) => {
//     const response = await fetch(`${API_BASE_URL}/products/${id}`, {
//       method: 'DELETE'
//     });
//     if (!response.ok) throw new Error('Failed to delete product');
//   }
// };


// src/services/api.js



// src/services/api.js
const API_BASE_URL = 'https://smart-inventory-backend-my2r.onrender.com/api';

const handleResponse = async (response, errorMessage) => {
  if (!response.ok) {
    throw new Error(`${errorMessage} (Status: ${response.status})`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const productAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    return handleResponse(response, 'Failed to fetch products');
  },

  getAvailable: async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    return handleResponse(response, 'Failed to fetch available products');
  },

  create: async (product) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    return handleResponse(response, 'Failed to create product');
  },

  update: async (id, product) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    return handleResponse(response, 'Failed to update product');
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(response, 'Failed to delete product');
  }
};