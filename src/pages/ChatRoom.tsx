import { useEffect, useState } from 'react';

import { getTokenFromSession } from '../utils/sessionStorageUtils';
import {
  connectStompClient,
  createStompClient,
  disconnectStompClient,
  sendMessage,
  setMessageHandler,
} from '../utils/websocketService';

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

export const chatRoomId = '24';

export const ChatRoom = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // 1. 유저의 토큰을 첨부해서 웹 소켓 서버에 연결
    const token = getTokenFromSession();
    createStompClient(token);
    connectStompClient();

    // 2. 메시지 수신 핸들러 설정
    setMessageHandler((newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // 3. 컴포넌트 언마운트 시 WebSocket 연결 종료
    return () => {
      disconnectStompClient();
    };
  }, []);

  // 메시지 전송 핸들러
  const sendMessageHandler = () => {
    if (!inputMessage.trim()) return;

    // 메시지 전송
    sendMessage(inputMessage, chatRoomId);

    // 로컬 상태에 메시지 추가
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: 'Me',
        content: inputMessage,
        timestamp: new Date().toISOString(),
      },
    ]);

    // 입력창 초기화
    setInputMessage('');
  };

  return (
    <div>
      <h1>Chat Room {chatRoomId}</h1>
      <div
        style={{
          height: '300px',
          overflowY: 'scroll',
          border: '1px solid #ccc',
          padding: '8px',
        }}
      >
        {/* 메시지 목록 렌더링 */}
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>{msg.sender}:</strong> {msg.content}
            <div style={{ fontSize: '0.8rem', color: '#888' }}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="메시지"
        style={{
          width: 'calc(100% - 70px)',
          padding: '8px',
          margin: '10px 0',
          boxSizing: 'border-box',
        }}
      />
      <button
        onClick={sendMessageHandler}
        style={{
          padding: '8px 12px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        전송
      </button>
    </div>
  );
};

export default ChatRoom;
