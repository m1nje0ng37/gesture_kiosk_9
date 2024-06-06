import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from './OrderContext';
import '../styles/OrderCompleted.css';

function OrderCompleted() {
  const { order, resetOrder } = useContext(OrderContext);
  const navigate = useNavigate();

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
