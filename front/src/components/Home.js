import React, { useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startOrder = useCallback(() => {
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
          console.error("Error accessing webcam: ", err);
        });
    };

    const detectGesture = () => {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasRef.current.toBlob(blob => {
        const formData = new FormData();
        formData.append('file', blob, 'frame.jpg');

        fetch('http://localhost:8000/predict-gesture', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            if (data.prediction === 'one') {
              startOrder();
            }
          })
          .catch(err => {
            console.error('Error predicting gesture: ', err);
          });
      }, 'image/jpeg');
    };

    startVideo();
    const intervalId = setInterval(detectGesture, 1000);

    return () => clearInterval(intervalId);
  }, [startOrder]);

  return (
    <div className="home-container">
      <h1>Welcome to the Cafe</h1>
      <button onClick={startOrder} className="start-button">주문하기</button>
      <video ref={videoRef} className="video-feed" width="640" height="480"></video>
      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
    </div>
  );
}

export default Home;
