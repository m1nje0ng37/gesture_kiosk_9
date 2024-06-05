import React, { useEffect, useState, useRef } from 'react';
import './WebcamCapture.css'; // CSS 파일을 import

const WebcamCapture = ({ onStream }) => {
  const [stream, setStream] = useState(null); // 웹캠 스트림 상태 관리
  const videoRef = useRef(null); // 비디오 요소에 대한 참조 생성

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream); // 스트림 상태 업데이트
        if (typeof onStream === 'function') {
          onStream(mediaStream); // 부모 컴포넌트로 스트림 전달
        }
      } catch (error) {
        console.error('웹캠에 접근하는 중 오류가 발생했습니다.', error);
      }
    };

    getMediaStream(); // 미디어 스트림 가져오기 함수 호출
  }, [onStream]); // onStream 함수가 변경될 때만 효과 재실행

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream; // 비디오 요소에 스트림 할당
    }
  }, [stream]); // stream 상태가 변경될 때마다 효과 재실행

  return (
    <div className="webcam-capture-container">
      {/* 비디오 요소를 표시하는 JSX */}
      <video ref={videoRef} autoPlay playsInline className="webcam-video" />
    </div>
  );
};

export default WebcamCapture;
