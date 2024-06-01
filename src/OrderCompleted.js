import React, { useContext } from 'react';
import { OrderContext } from './OrderContext';
import './OrderCompleted.css';

function OrderCompleted() {
  const { order } = useContext(OrderContext);

  return (
    <div className="order-completed-container">
      <h2>주문이 완료되었습니다</h2>
      <h3>주문하신 음료:</h3>
      <ul>
        {order.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default OrderCompleted;
