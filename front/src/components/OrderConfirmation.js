import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/OrderConfirmation.css';

function OrderConfirmation() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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
          if (data.prediction === 'good') {
            navigate('/menu-selection');
          } else if (data.prediction === 'bad') {
            navigate('/order-completed');
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

      <video ref={videoRef} className="video-feed" width="640" height="480"></video>
      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
    </div>
  );
}

export default OrderConfirmation;
