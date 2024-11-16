import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { chatRoomId } from '../pages/ChatRoom';

export interface ChatMessage {
  content: string;
  roomId: string;
  sender?: string;
  timestamp?: string;
}

let stompClient: Client | null = null;
let messageHandler: ((message: ChatMessage) => void) | null = null;
const url = import.meta.env.VITE_API_URL;

// 2. (1)에서 받은 토큰을 헤더에 첨부하고 웹 소켓에 연결할 스톰프 클라이언트 생성
export const createStompClient = (token: string = ''): Client => {
  stompClient = new Client({
    webSocketFactory: () =>
      new SockJS(`${url}/api/v1/ws-chat`, null, {
        transports: ['websocket'],
        timeout: 5000,
      }),
    reconnectDelay: 3000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    debug: (str: string) => {
      console.log('Debug:', str);
    },
    onConnect: () => {
      // 5. 채팅방을 구독하는 함수 실행
      subscribeToRoom(chatRoomId);
    },
    onDisconnect: () => {
      console.log('끊김');
    },
    onStompError: (frame) => {
      console.error('Stomp error:', frame);
    },
  });

  return stompClient;
};

export const connectStompClient = (): void => {
  if (stompClient) {
    // 4. 웹 소켓 연결 시도
    stompClient.activate(); // 연결 성공시 (5) onConnect() 호출
  }
};

export const disconnectStompClient = (): void => {
  if (stompClient) {
    stompClient.deactivate();
  }
};

export const setMessageHandler = (
  handler: (message: ChatMessage) => void
): void => {
  messageHandler = handler;
};

export const subscribeToRoom = (roomId: string): void => {
  // 6. 채팅방을 구독하는 함수
  // 특정 아이디를 갖는 채팅방에 구독함
  if (stompClient && stompClient.connected) {
    stompClient.subscribe(`/topic/chat/${roomId}`, (message: IMessage) => {
      const receivedMessage: ChatMessage = JSON.parse(message.body);
      if (messageHandler) {
        messageHandler(receivedMessage);
      }
    });
  }
};

export const sendMessage = (content: string, roomId: string): void => {
  if (stompClient && stompClient.connected) {
    const message: ChatMessage = {
      content,
      roomId,
      timestamp: new Date().toISOString(),
    };

    stompClient.publish({
      destination: '/app/chat/message',
      body: JSON.stringify(message),
    });
  }
};
