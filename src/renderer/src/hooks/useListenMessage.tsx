/**
 * @file useListenMessage.tsx
 * @description Hooks for listening to messages from websocket if login user is doctor
 */

import { messageState } from '@renderer/state'
import { Patient } from '@renderer/types/Patient/patient'
import { useSetRecoilState } from 'recoil'
import { Client } from '@stomp/stompjs'
import WebSocket from 'ws'

export const useListenMessage = () => {
  const setMessage = useSetRecoilState<Patient[]>(messageState)
  console.log('useListenMessage');
  

  const stompClient = new Client({
    brokerURL: 'ws://127.0.0.1:61614/stomp',
    webSocketFactory: () => {
      return new WebSocket('ws://127.0.0.1:61614/stomp', 'stomp')
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000
  })

  stompClient.onConnect = (frame) => {
    console.log('Connected: ' + frame)

    stompClient.subscribe('/queue/heart_patients', (message) => {
        console.log(`Received message: ${message.body}`);
        
      setMessage((prev) => [...prev, JSON.parse(message.body)])
    })
  }

  stompClient.activate()
}
