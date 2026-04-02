import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate a successful login
    console.log(`Logging in as ${username} with role ${role}`);
    
    // Call the onLogin prop to update global state
    onLogin({ username, role });
    
    // In a real app, you'd verify credentials here.
    // For "fake login", we just redirect based on role.
    if (role === 'shopkeeper') {
      navigate('/shopkeeper');
    } else {
      navigate('/customer');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🔐 Welcome Back</h2>
        <p>Please log in to your account</p>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              placeholder="Enter any username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter any password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>I am a:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="customer">🛒 Customer</option>
              <option value="shopkeeper">👨‍💼 Shopkeeper</option>
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary login-btn">
            Login
          </button>
        </form>
        
        <div className="login-footer">
          <small>Any username/password works for this demo!</small>
        </div>
      </div>
      
      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 80vh;
        }
        .login-card {
          background: white;
          padding: 2.5rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }
        .login-card h2 { margin-bottom: 0.5rem; color: #333; }
        .login-card p { color: #666; margin-bottom: 2rem; }
        .form-group { text-align: left; margin-bottom: 1.5rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; color: #444; font-weight: 600; }
        .form-group input, .form-group select {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
        }
        .login-btn {
          width: 100%;
          padding: 1rem;
          margin-top: 1rem;
          font-size: 1.1rem;
          font-weight: bold;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .login-btn:hover { background: #764ba2; }
        .login-footer { margin-top: 1.5rem; color: #888; }
      `}</style>
    </div>
  );
}
