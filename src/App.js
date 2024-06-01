import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import MenuSelection from './MenuSelection';
import OrderConfirmation from './OrderConfirmation';
import OrderCompleted from './OrderCompleted';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu-selection" element={<MenuSelection />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/order-completed" element={<OrderCompleted />} />
      </Routes>
    </div>
  );
}

export default App;
