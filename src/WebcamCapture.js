import React, { useEffect, useState, useRef } from 'react';

const WebcamCapture = ({ onStream }) => {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(stream);
        if (typeof onStream === 'function') {
          onStream(stream); // 부모 컴포넌트로 스트림 전달
        }
      } catch (error) {
        console.error('웹캠에 접근하는 중 오류가 발생했습니다.', error);
      }
    };

    getMediaStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop()); // 스트림 정리
      }
    };
  }, [onStream]);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
};

export default WebcamCapture;
