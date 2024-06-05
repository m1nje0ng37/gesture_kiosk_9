import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import MenuSelection from './MenuSelection';
import OrderConfirmation from './OrderConfirmation';
import OrderCompleted from './OrderCompleted';
import WebcamCapture from './WebcamCapture';

function App() {
  // 웹캠 스트림을 받아서 처리하는 함수
  const handleStream = (stream) => {
    // 웹캠 스트림을 처리하는 로직 구현
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
