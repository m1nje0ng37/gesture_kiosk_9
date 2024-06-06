import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

function OrderConfirmation() {
  const navigate = useNavigate();

  useEffect(() => {
    const text = "더 주문하시겠습니까? 1번 더 주문하기 2번 주문 끝내기";
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'ko-KR'; // 한국어 설정
    window.speechSynthesis.speak(speech);
  }, []);

  return (
    <div className="order-confirmation-container">
      <h2>더 주문하시겠습니까?</h2>
      <div className="confirmation-buttons">
        <button onClick={() => navigate('/menu-selection')}>더 주문하기</button>
        <button onClick={() => navigate('/order-completed')}>주문 끝내기</button>
      </div>
    </div>
  );
}

export default OrderConfirmation;
