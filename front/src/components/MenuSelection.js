import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from './OrderContext';
import '../styles/MenuSelection.css';

// 이미지 import
import americanoImage from '../images/icedamericano.png';
import latteImage from '../images/icedlatte.png';
import lemonadeImage from '../images/lemonade.png';
import strawberrySmoothieImage from '../images/smoothie.png';

import image1 from '../images/1.png';
import image2 from '../images/2.png';
import image3 from '../images/3.png';
import image4 from '../images/4.png';

function MenuSelection() {
  const navigate = useNavigate();
  const { addToOrder } = useContext(OrderContext);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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

  const detectGesture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasRef.current.toBlob(blob => {
      if (!blob) return;

      const formData = new FormData();
      formData.append('file', blob, 'frame.jpg');

      fetch('http://localhost:8000/predict-gesture', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('네트워크 응답이 올바르지 않습니다.');
          }
          return response.json();
        })
        .then(data => {
          console.log('서버 응답 데이터:', data);
          if (data.prediction === 'one') {
            handleOrder('아메리카노');
          } else if (data.prediction === 'two') {
            handleOrder('라떼');
          } else if (data.prediction === 'three') {
            handleOrder('레몬에이드');
          }
        })
        .catch(err => {
          console.error('제스처 예측 에러: ', err);
        });
    }, 'image/jpeg');
  };

  useEffect(() => {
    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch(err => {
          console.error("웹캠 접근 에러: ", err);
        });
    };

    startVideo();
    const intervalId = setInterval(detectGesture, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const text = "어떤걸 주문하시겠습니까? 일번 아메리카노, 이번 라떼, 삼번 레몬에이드, 사번 딸기스무디";
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'ko-KR'; // 한국어 설정
    window.speechSynthesis.speak(speech);
  }, []);

  return (
    <div className="menu-selection-container">
      <h2>주문하기</h2>
      <div className="menu-buttons">
        <button onClick={() => handleOrder('아메리카노')}>
          <img src={americanoImage} alt="아메리카노" className="menu-image" />
          <span className="menu-text">아메리카노</span>
        </button>
        <button onClick={() => handleOrder('라떼')}>
          <img src={latteImage} alt="라떼" className="menu-image" />
          <span className="menu-text">라떼</span>
        </button>
        <button onClick={() => handleOrder('레몬에이드')}>
          <img src={lemonadeImage} alt="레몬에이드" className="menu-image" />
          <span className="menu-text">레몬에이드</span>
        </button>
        <button onClick={() => handleOrder('딸기스무디')}>
          <img src={strawberrySmoothieImage} alt="딸기스무디" className="menu-image" />
          <span className="menu-text">딸기스무디</span>
        </button>
      </div>

      <video ref={videoRef} className="video-feed" width="640" height="480"></video>
      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>

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
