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


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ShopkeeperDashboard from './pages/ShopkeeperDashboard';
import CustomerShop from './pages/CustomerShop';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>🛒 Smart Inventory System</h1>
          <nav>
            <Link to="/shopkeeper" className="nav-link">Shopkeeper</Link>
            <Link to="/customer" className="nav-link">Customer</Link>
          </nav>
        </header>

        <main className="main">
          <Routes>
            <Route path="/shopkeeper" element={<ShopkeeperDashboard />} />
            <Route path="/customer" element={<CustomerShop />} />
            <Route
              path="/"
              element={
                <div className="welcome">
                  <h2>Welcome! Choose role above.</h2>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;