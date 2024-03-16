import WebSocketContext, {
  WebSocketContextType,
} from './context/WebSocketContext.ts'
import React, { useEffect, useState } from 'react'
import { WebSocketSingleton } from './managers/WebSocketSingleton.ts'
import { default as equal } from 'deep-equal'
import {
  SR_V1_CACHE_QUERY_BULK,
  SR_V1_CACHE_QUERY_BULK_RESULT,
  SR_V1_CACHE_STORE,
  SR_V1_CACHE_STORE_RESULT,
  WSNetworkFrame,
  WSNetworkFrameType,
} from './types/WebSocketProtocol.ts'
import { songAudioCacheGet, songAudioCacheSet } from './util/cacheUtils.ts'

type WebSocketWrapperProps = {
  token: string
  children: React.ReactNode
}

export function WebSocketWrapper(props: WebSocketWrapperProps) {
  const [webSocketContext, setWebSocketContext] =
    useState<WebSocketContextType>({
      ws: null,
      isConnected: false,
    })

  const globalMessageHandler = async (message: MessageEvent) => {
    const { isReply, type } = JSON.parse(message.data) as WSNetworkFrame
    const data = JSON.parse(message.data)
    console.log(data)
    if (isReply) return
    switch (type) {
      case WSNetworkFrameType.SR_V1_CACHE_QUERY_BULK: {
        const parsed = data as SR_V1_CACHE_QUERY_BULK
        const ret: SR_V1_CACHE_QUERY_BULK_RESULT = {
          type: WSNetworkFrameType.SR_V1_CACHE_QUERY_BULK_RESULT,
          params: [],
        }
        for (const url of parsed.params) {
          if (await songAudioCacheGet(url)) {
            ret.params.push({ url, hit: true })
          } else {
            ret.params.push({ url, hit: false })
          }
        }
        WebSocketSingleton.getInstance().sendFrameNoResponse(ret)
        break
      }
      case WSNetworkFrameType.SR_V1_CACHE_STORE: {
        const parsed = data as SR_V1_CACHE_STORE
        const [sourceUrl, value] = parsed.params
        await songAudioCacheSet(sourceUrl, value)
        WebSocketSingleton.getInstance().sendFrameNoResponse({
          type: WSNetworkFrameType.SR_V1_CACHE_STORE_RESULT,
          params: [sourceUrl, true],
        } as SR_V1_CACHE_STORE_RESULT)
        break
      }
    }
  }

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
    ws?.addEventListener('message', globalMessageHandler)

    const newState = {
      ws: ws ?? null,
      isConnected: ws?.readyState === ws?.OPEN ?? false,
    }

    setWebSocketContext((prev) => (equal(prev, newState) ? prev : newState))

    return () => {
      const ws = WebSocketSingleton.getInstance().getWebSocket()
      ws?.removeEventListener('open', openListener)
      ws?.removeEventListener('message', globalMessageHandler)
    }
  }, [webSocketContext, globalMessageHandler])

  return (
    <WebSocketContext.Provider value={webSocketContext}>
      {webSocketContext.isConnected &&
        webSocketContext.ws !== null &&
        props.children}
    </WebSocketContext.Provider>
  )
}
