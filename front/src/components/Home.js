import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [gesture, setGesture] = useState('손 모양을 감지 중...'); // 초기 상태 설정

  const startOrder = useCallback(() => {
    console.log('버튼이 클릭되었습니다.'); // 버튼 클릭 로그
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
            console.log('서버 응답 데이터:', data); // 서버 응답 데이터를 콘솔에 출력
            setGesture(data.prediction); // 제스처 상태 업데이트
            if (data.prediction === 'one') {
              console.log('제스처 "one"이 인식되었습니다. 버튼을 클릭합니다.'); // 제스처 인식 로그
              startOrder();
            }
          })
          .catch(err => {
            console.error('제스처 예측 에러: ', err);
            setGesture('제스처 예측 에러'); // 에러 메시지를 상태로 설정
          });
      }, 'image/jpeg');
    };

    startVideo();
    const intervalId = setInterval(detectGesture, 2000); // 간격을 2초로 조절

    return () => clearInterval(intervalId);
  }, [startOrder]);

  return (
    <div className="home-container">
      <h1>Welcome to the Cafe</h1>
      <button onClick={startOrder} className="start-button">주문하기</button>
      <video ref={videoRef} className="video-feed" width="640" height="480"></video>
      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
      <p>인식된 제스처: {gesture}</p> {/* 제스처 상태를 화면에 표시 */}
    </div>
  );
}

export default Home;
