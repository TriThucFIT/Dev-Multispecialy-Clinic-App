import { createContext, useContext } from 'react'
import { Client } from '@stomp/stompjs'
import WebSocket from 'ws'
import { useSetRecoilState } from 'recoil'
import { messageState } from '@renderer/state'

const ListenMessageContext = createContext<any>(null)

export const useListenMessage = () => {
  return useContext(ListenMessageContext)
}

export const ListenMessageProvider = ({ children }: { children: React.ReactNode }) => {
  const setMessages = useSetRecoilState(messageState)
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
      setMessages((oldMessages) => [...oldMessages, JSON.parse(message.body)])
    })
  }

  stompClient.activate()
  return (
    <ListenMessageContext.Provider value={stompClient}>{children}</ListenMessageContext.Provider>
  )
}
