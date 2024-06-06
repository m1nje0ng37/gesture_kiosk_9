import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MenuSelection from './components/MenuSelection';
import OrderConfirmation from './components/OrderConfirmation';
import OrderCompleted from './components/OrderCompleted';
import WebcamCapture from './components/WebcamCapture';

/**
 * 애플리케이션의 라우팅 및 웹캠 캡처를 처리하는 메인 컴포넌트입니다.
 */
function App() {
  // 웹캠 스트림을 받아서 처리하는 함수
  const handleStream = (stream) => {
    // 웹캠 스트림을 처리하는 로직 구현
    console.log('웹캠 스트림을 받았습니다.', stream);
  };

  return (
    <div>
      {/* 웹캠 캡처 컴포넌트를 렌더링하고, 스트림 처리 함수를 props로 전달 */}
      <WebcamCapture onStream={handleStream} />
      {/* 라우트 설정 */}
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
