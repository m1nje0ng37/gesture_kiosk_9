// WebSocket을 import합니다.
const WebSocket = require('ws');

// 웹소켓 서버를 생성합니다.
const wss = new WebSocket.Server({ port: 8080 });

// 클라이언트 소켓을 저장할 변수를 선언합니다.
let phoneSocket = null;

// 클라이언트가 서버에 연결되면 실행됩니다.
wss.on('connection', (ws, req) => {
  console.log('Client connected');

  // 클라이언트로부터 메시지를 받으면 실행됩니다.
  ws.on('message', (message) => {
    console.log('Received: %s', message);

    // 받은 메시지를 JSON 형태로 파싱합니다.
    const data = JSON.parse(message);

    // 핸드폰 앱이 연결되면 소켓을 저장합니다.
    if (data.type === 'phone') {
      phoneSocket = ws;
    }

    // 받은 제스처 데이터를 키오스크로 전송합니다.
    if (phoneSocket && data.type === 'gesture') {
      phoneSocket.send(JSON.stringify(data));
    }
  });

  // 클라이언트 연결이 닫히면 실행됩니다.
  ws.on('close', () => {
    console.log('Client disconnected');
    // 연결이 닫힌 클라이언트가 핸드폰 앱이었다면 소켓을 초기화합니다.
    if (ws === phoneSocket) {
      phoneSocket = null;
    }
  });
});

// 키오스크와 핸드폰 앱 간의 통신을 중개하는 부분을 구현합니다.
