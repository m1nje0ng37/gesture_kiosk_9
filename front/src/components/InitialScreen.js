import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InitialScreen.css'; // 스타일 파일 추가

function InitialScreen() {
  const navigate = useNavigate();

  const handleTouch = () => {
    navigate('/home');
  };

  return (
    <div className="initial-screen" onClick={handleTouch}>
      <h1>화면 아무 곳이나 터치하세요</h1>
    </div>
  );
}

export default InitialScreen;
