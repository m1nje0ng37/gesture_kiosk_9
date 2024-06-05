import React, { useEffect, useState, useRef } from 'react';

/**
 * 웹캠을 사용하여 비디오를 캡처하는 컴포넌트입니다.
 * @param {function} onStream - 웹캠 스트림을 처리하는 콜백 함수
 */
const WebcamCapture = ({ onStream }) => {
  const [stream, setStream] = useState(null); // 웹캠 스트림 상태 관리
  const videoRef = useRef(null); // 비디오 요소에 대한 참조 생성

  // 컴포넌트가 마운트되거나 업데이트될 때 웹캠 스트림을 가져오는 효과
  useEffect(() => {
    const getMediaStream = async () => {
      try {
        // 미디어 장치에서 비디오 스트림 가져오기
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(stream); // 스트림 상태 업데이트
        if (typeof onStream === 'function') {
          onStream(stream); // 부모 컴포넌트로 스트림 전달
        }
      } catch (error) {
        console.error('웹캠에 접근하는 중 오류가 발생했습니다.', error);
      }
    };

    getMediaStream(); // 미디어 스트림 가져오기 함수 호출

    // 컴포넌트가 언마운트될 때 실행되는 클린업 함수 반환
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop()); // 스트림 정리
      }
    };
  }, [onStream]); // onStream 함수가 변경될 때마다 효과 재실행

  // 스트림이 변경될 때 비디오 요소에 스트림 할당하는 효과
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream; // 비디오 요소에 스트림 할당
    }
  }, [stream]); // stream 상태가 변경될 때마다 효과 재실행

  return (
    <div>
      {/* 비디오 요소를 표시하는 JSX */}
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
};

export default WebcamCapture;
