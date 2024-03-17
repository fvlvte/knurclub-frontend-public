import WebSocketContext, {
  WebSocketContextType,
} from '../context/WebSocketContext.ts'
import React, { useEffect, useState } from 'react'
import { WebSocketSingleton } from '../managers/WebSocketSingleton.ts'
import { default as equal } from 'deep-equal'
import {
  BackendSong,
  CLIENT_HELLO,
  SERVER_HELLO,
  SR_V1_CACHE_QUERY_BULK,
  SR_V1_CACHE_QUERY_BULK_RESULT,
  SR_V1_CACHE_STORE,
  SR_V1_CACHE_STORE_RESULT,
  SR_V1_CHANGE_CURRENT_SONG,
  WSNetworkFrame,
  WSNetworkFrameType,
} from '../types/WSShared.ts'
import { songAudioCacheGet, songAudioCacheSet } from '../util/cacheUtils.ts'
import BackendSongContext from '../context/BackendSongContext.ts'

type WebSocketWrapperProps = {
  token: string
  children: React.ReactNode
}

export function WebSocketWrapper(props: WebSocketWrapperProps) {
  const [helloPacketExchanged, setHelloPacketExchanged] = useState(false)
  const [webSocketContext, setWebSocketContext] =
    useState<WebSocketContextType>({
      ws: null,
      isConnected: false,
    })

  const [song, setSong] = useState<BackendSong | null>(null)

  const globalMessageHandler = async (message: MessageEvent) => {
    const { isReply, type } = JSON.parse(message.data) as WSNetworkFrame
    const data = JSON.parse(message.data) as WSNetworkFrame

    if (isReply) return

    switch (type) {
      case WSNetworkFrameType.SERVER_HELLO: {
        const parsed = data as SERVER_HELLO
        console.log('Server Hello', parsed.params)
        WebSocketSingleton.getInstance().sendFrameNoResponse({
          type: WSNetworkFrameType.CLIENT_HELLO,
          params: {
            version: '1.0',
            clientId: 'web',
          },
        } as CLIENT_HELLO)
        setHelloPacketExchanged(true)
        break
      }
      case WSNetworkFrameType.SR_V1_CHANGE_CURRENT_SONG: {
        const parsed = data as SR_V1_CHANGE_CURRENT_SONG
        setSong(parsed.params)
        break
      }
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
      default:
        console.error(`Unhandled frame type ${type}`)
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
      <BackendSongContext.Provider value={song}>
        {webSocketContext.isConnected &&
          webSocketContext.ws !== null &&
          helloPacketExchanged &&
          props.children}
      </BackendSongContext.Provider>
    </WebSocketContext.Provider>
  )
}
