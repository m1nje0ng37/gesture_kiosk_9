import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

function OrderConfirmation() {
  const navigate = useNavigate();

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
