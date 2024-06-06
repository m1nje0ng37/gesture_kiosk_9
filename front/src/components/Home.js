import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  const startOrder = () => {
    navigate('/menu-selection');
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Cafe</h1>
      <button onClick={startOrder} className="start-button">주문하기</button>
    </div>
  );
}

export default Home;
