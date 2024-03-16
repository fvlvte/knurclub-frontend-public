import { useCallback, useEffect, useRef, useState } from 'react'

export function useWebsocket(ws: WebSocket | null) {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const onMessageRef = useRef<((message: unknown) => Promise<unknown>) | null>(
    null
  )

  const cleanUpSocket = useCallback(() => {
    if (!ws) return

    if (socket) {
      socket.close()
      setSocket(null)
    }
  }, [socket])

  useEffect(() => {
    if (!ws) return
    setSocket(ws)
    ws.onopen = () => {
      ws?.send(
        JSON.stringify({
          type: 'event.subscribe',
          param: ['songrequest.queue'],
        })
      )
    }

    ws.onmessage = async (evt) => {
      if (onMessageRef.current) {
        const ret = await onMessageRef.current(evt.data)
        if (ret) {
          ws.send(JSON.stringify(ret))
        }
      }
    }

    ws.onclose = cleanUpSocket
    ws.onerror = cleanUpSocket

    return () => {
      cleanUpSocket()
    }
  }, [ws])

  return { socket, onMessageRef }
}
