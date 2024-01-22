import { webSocketConfig } from './web-socket.config';
import { WebSocketService } from './web-socket.service';

export function webSocketServiceFactory() {
  const rxStomp = new WebSocketService();
  rxStomp.configure(webSocketConfig);
  return rxStomp;
}
