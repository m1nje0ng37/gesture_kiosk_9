import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/OrderConfirmation.css';

function OrderConfirmation() {
  const navigate = useNavigate();

  useEffect(() => {
    const text = "음료를 더 주문하시겠습니까? 1번 더 주문하기 2번 주문 끝내기";
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'ko-KR'; // 한국어 설정

    const timeoutId = setTimeout(() => {
      window.speechSynthesis.speak(speech);
    }, 500); // 0.5초 지연

    return () => {
      clearTimeout(timeoutId);
      window.speechSynthesis.cancel(); // 컴포넌트 언마운트 시 사운드 중지
    };
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
