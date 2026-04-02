// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import ShopkeeperDashboard from './pages/ShopkeeperDashboard';
// import CustomerShop from './pages/CustomerShop';
// import './index.css';

// function App() {
//   return (
//     <Router>
//       <div className="app">
//         <header className="header">
//           <h1>🛒 Smart Inventory System</h1>
//           <nav>
//             <Link to="/shopkeeper" className="nav-link">Shopkeeper</Link>
//             <Link to="/customer" className="nav-link">Customer</Link>
//           </nav>
//         </header>
//         <main className="main">
//           <Routes>
//             <Route path="/shopkeeper" element={<ShopkeeperDashboard />} />
//             <Route path="/customer" element={<CustomerShop />} />
//             <Route path="/" element={
//               <div className="welcome">
//                 <h2>Welcome! Choose role above.</h2>
//               </div>
//             } />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import ShopkeeperDashboard from './pages/ShopkeeperDashboard';
import CustomerShop from './pages/CustomerShop';
import LoginPage from './pages/LoginPage';
import './index.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="header-top">
            <h1>🛒 Smart Inventory System</h1>
            {user && (
              <div className="user-info">
                <span>Welcome, {user.username}! ({user.role})</span>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </div>
            )}
          </div>
          <nav>
            <Link to="/shopkeeper" className="nav-link">Shopkeeper</Link>
            <Link to="/customer" className="nav-link">Customer</Link>
          </nav>
        </header>

        <main className="main">
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={(userData) => setUser(userData)} />} />
            <Route 
              path="/shopkeeper" 
              element={user && user.role === 'shopkeeper' ? <ShopkeeperDashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/customer" 
              element={user && user.role === 'customer' ? <CustomerShop /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/" 
              element={<Navigate to="/login" />} 
            />
          </Routes>
        </main>
      </div>
      
      <style>{`
        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 20px;
        }
        .btn-logout {
          background: #ff4757;
          color: white;
          border: none;
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          cursor: pointer;
          font-weight: bold;
        }
        .btn-logout:hover { background: #ff6b81; }
      `}</style>
    </Router>
  );
}

export default App;