import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from './OrderContext';
import './MenuSelection.css';

function MenuSelection() {
  const navigate = useNavigate();
  const { addToOrder } = useContext(OrderContext);

  const handleOrder = (menu) => {
    addToOrder(menu);
    navigate('/order-confirmation');
  };

  return (
    <div className="menu-selection-container">
      <h2>주문하기</h2>
      <div className="menu-buttons">
        <button onClick={() => handleOrder('아메리카노')}>아메리카노</button>
        <button onClick={() => handleOrder('라떼')}>라떼</button>
        <button onClick={() => handleOrder('레몬에이드')}>레몬에이드</button>
        <button onClick={() => handleOrder('아이스티')}>아이스티</button>
      </div>
    </div>
  );
}

export default MenuSelection;
