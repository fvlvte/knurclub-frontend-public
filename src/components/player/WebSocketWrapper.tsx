import WebSocketContext, {
  WebSocketContextType,
} from './context/WebSocketContext.ts'
import React, { useEffect, useState } from 'react'
import { WebSocketSingleton } from './managers/WebSocketSingleton.ts'
import { default as equal } from 'deep-equal'

type WebSocketWrapperProps = {
  token: string
  children: React.ReactNode
}

const messageDetour = (event: unknown) => {
  console.log('messageDetour')
  console.log(event)
}

export function WebSocketWrapper(props: WebSocketWrapperProps) {
  const [webSocketContext, setWebSocketContext] =
    useState<WebSocketContextType>({
      ws: null,
      isConnected: false,
    })

  useEffect(() => {
    const openListener = () => {
      const ws = WebSocketSingleton.getInstance().getWebSocket() ?? null

      const newState = {
        ws: ws,
        isConnected: ws?.readyState === ws?.OPEN ?? false,
      }

      setWebSocketContext((prev) => (equal(prev, newState) ? prev : newState))
    }

    if (webSocketContext.ws === null) {
      const ws = WebSocketSingleton.getInstance().getWebSocket()
      if (!ws || ws.readyState !== ws.OPEN) {
        WebSocketSingleton.getInstance().init(props.token)
      }
    }

    const ws = WebSocketSingleton.getInstance().getWebSocket()
    ws?.addEventListener('open', openListener)
    ws?.addEventListener('message', messageDetour)

    const newState = {
      ws: ws ?? null,
      isConnected: ws?.readyState === ws?.OPEN ?? false,
    }

    setWebSocketContext((prev) => (equal(prev, newState) ? prev : newState))

    return () => {
      const ws = WebSocketSingleton.getInstance().getWebSocket()
      ws?.removeEventListener('open', openListener)
    }
  }, [webSocketContext])

  return (
    <WebSocketContext.Provider value={webSocketContext}>
      {webSocketContext.isConnected &&
        webSocketContext.ws !== null &&
        props.children}
    </WebSocketContext.Provider>
  )
}
