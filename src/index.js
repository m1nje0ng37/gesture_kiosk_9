import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { OrderProvider } from './OrderContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <OrderProvider>
    <Router>
      <App />
    </Router>
  </OrderProvider>
);
