import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from './OrderContext';
import '../styles/MenuSelection.css';

// 이미지 import
import americanoImage from './images/icedamericano.png';
import latteImage from './images/icedlatte.png';
import lemonadeImage from './images/lemonade.png';
import strawberrySmoothieImage from './images/smoothie.png';

import image1 from './images/1.png';
import image2 from './images/2.png';
import image3 from './images/3.png';
import image4 from './images/4.png';

function MenuSelection() {
  const navigate = useNavigate();
  const { addToOrder } = useContext(OrderContext);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const text = "어떤걸 주문하시겠습니까? 일번 아메리카노, 이번 라떼, 삼번 레몬에이드, 사번 딸기스무디";
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'ko-KR'; // 한국어 설정
    window.speechSynthesis.speak(speech);
  }, []);

  const handleOrder = (menu) => {
    setSelectedMenu(menu);
    setIsPopupVisible(true);
  };

  const confirmOrder = () => {
    addToOrder(selectedMenu);
    navigate('/order-confirmation');
  };

  const cancelOrder = () => {
    setIsPopupVisible(false);
    setSelectedMenu(null);
  };

  return (
    <div className="menu-selection-container">
      <h2>주문하기</h2>
      <div className="menu-buttons">
        <button onClick={() => handleOrder('아메리카노')}>
          <img src={americanoImage} alt="아메리카노" className="menu-image" />
          <span className="menu-text">아메리카노</span>
          <img src={image1} alt="1" className="side-image" />
        </button>
        <button onClick={() => handleOrder('라떼')}>
          <img src={latteImage} alt="라떼" className="menu-image" />
          <span className="menu-text">라떼</span>
          <img src={image2} alt="2" className="side-image" />
        </button>
        <button onClick={() => handleOrder('레몬에이드')}>
          <img src={lemonadeImage} alt="레몬에이드" className="menu-image" />
          <span className="menu-text">레몬에이드</span>
          <img src={image3} alt="3" className="side-image" />
        </button>
        <button onClick={() => handleOrder('딸기스무디')}>
          <img src={strawberrySmoothieImage} alt="딸기스무디" className="menu-image" />
          <span className="menu-text">딸기스무디</span>
          <img src={image4} alt="4" className="side-image" />
        </button>
      </div>

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>선택 확인</h3>
            <p>{selectedMenu}를 주문하시겠습니까?</p>
            <div className="popup-buttons">
              <button onClick={confirmOrder}>예</button>
              <button onClick={cancelOrder}>아니오</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuSelection;
