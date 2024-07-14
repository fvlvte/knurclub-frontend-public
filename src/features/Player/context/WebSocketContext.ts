import { createContext } from 'react'

export type WebSocketContextType = {
  ws: WebSocket | null
  isConnected: boolean
}

const WebSocketContext = createContext<WebSocketContextType>({
  ws: null,
  isConnected: false,
})
export default WebSocketContext
