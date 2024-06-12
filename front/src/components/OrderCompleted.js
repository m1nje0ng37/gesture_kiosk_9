import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from './OrderContext';
import '../styles/OrderCompleted.css';

function OrderCompleted() {
  const { order, resetOrder } = useContext(OrderContext);
  const navigate = useNavigate();

  useEffect(() => {
    const text = `주문이 완료되었습니다. 주문하신 음료는 `;
    const orderText = order.join(', ');
    const fullText = `${text}${orderText} 입니다.`;
    
    const speech = new SpeechSynthesisUtterance(fullText);
    speech.lang = 'ko-KR'; // 한국어 설정
    speech.rate = 0.8; // 음성 속도 설정

    const timeoutId = setTimeout(() => {
      window.speechSynthesis.speak(speech);
    }, 500); // 0.5초 지연

    return () => {
      clearTimeout(timeoutId);
      window.speechSynthesis.cancel(); // 컴포넌트 언마운트 시 사운드 중지
    };
  }, [order]);

  const goToHome = () => {
    resetOrder();
    navigate('/');
  };

  return (
    <div className="order-completed-container">
      <h2>주문이 완료되었습니다</h2>
      <h3>주문하신 음료:</h3>
      <ul>
        {order.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button className="home-button" onClick={goToHome}>처음으로 돌아가기</button>
    </div>
  );
}

export default OrderCompleted;
