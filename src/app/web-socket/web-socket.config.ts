import { RxStomp, RxStompConfig } from '@stomp/rx-stomp';
import SessionStorageUtil from '../shared/util/session-storage.util';

export const webSocketConfig: RxStompConfig = {
  brokerURL: 'ws://localhost:8089/ws',

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 500 (500 milli seconds)
  reconnectDelay: 10000,

  // Will log diagnostics on console
  // It can be quite verbose, not recommended in production
  // Skip this key to stop logging to console
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },

  beforeConnect: (client: RxStomp): Promise<void> => {
    return new Promise<void>(resolve => {
      client.stompClient.connectHeaders = {
        Authorization: 'Bearer ' + SessionStorageUtil.getAuthToken(),
      };
      resolve();
    });
  },
};
