import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  const startOrder = () => {
    navigate('/menu-selection');
  };

  useEffect(() => {
    const text = "카페에 오신 걸 환영합니다. 주문을 원하시면 카메라에 1을 표시해 주세요.";
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'ko-KR'; // 한국어 설정
    speech.rate = 0.8; // 음성 속도 설정

    const timeoutId = setTimeout(() => {
      window.speechSynthesis.speak(speech);
    }, 500); // 0.5초 지연

    return () => {
      clearTimeout(timeoutId);
      window.speechSynthesis.cancel(); // 컴포넌트 언마운트 시 사운드 중지
    };
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to the Cafe</h1>
      <button onClick={startOrder} className="start-button">주문하기</button>
    </div>
  );
}

export default Home;
