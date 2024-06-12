import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MenuSelection from './components/MenuSelection';
import OrderConfirmation from './components/OrderConfirmation';
import OrderCompleted from './components/OrderCompleted';
import WebcamCapture from './components/WebcamCapture';

function App() {
  const handleStream = (stream) => {
    console.log('웹캠 스트림을 받았습니다.', stream);
  };

  return (
    <div>
      <WebcamCapture onStream={handleStream} />
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
