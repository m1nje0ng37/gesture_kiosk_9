import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [gesture, setGesture] = useState('손 모양을 감지 중...');
  const [showPopup, setShowPopup] = useState(false);

  const startOrder = useCallback(() => {
    console.log('버튼이 클릭되었습니다.');
    navigate('/menu-selection');
  }, [navigate]);

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
            setGesture(data.prediction);
            if (data.prediction === 'one') {
              console.log('제스처 "one"이 인식되었습니다. 팝업을 띄웁니다.');
              setShowPopup(true);
            }
          })
          .catch(err => {
            console.error('제스처 예측 에러: ', err);
            setGesture('제스처 예측 에러');
          });
      }, 'image/jpeg');
    };

    startVideo();
    const intervalId = setInterval(detectGesture, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handlePopupConfirm = () => {
    setShowPopup(false);
    startOrder();
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Cafe</h1>
      <button 
        onClick={() => {
          console.log('버튼 클릭 이벤트 발생');
          startOrder();
        }} 
        className="start-button"
      >
        주문하기
      </button>
      <video ref={videoRef} className="video-feed" width="640" height="480"></video>
      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
      <p>인식된 제스처: {gesture}</p>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>one 제스처를 취하셨습니다. 맞나요?</p>
            <button onClick={handlePopupConfirm}>예</button>
            <button onClick={handlePopupCancel}>아니오</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
