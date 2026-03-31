import axios from 'axios';

// Get API base URL based on environment
const getApiBaseUrl = () => {
  // For development (localhost)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8080';
  }
  
  // For production (Vercel or deployed)
  // Replace with your actual backend URL when deployed
  // Example: 'https://your-backend.herokuapp.com' or 'https://api.yourdomain.com'
  const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  return backendUrl;
};

const API_BASE_URL = getApiBaseUrl();

console.log('🌐 API Base URL:', API_BASE_URL);

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;
export { API_BASE_URL };
