import { useEffect, useState } from 'react'
import { Container } from './Container.tsx'
import { PlaybackInfo, Song } from './UOKIK.ts'

const PLAYER_PING_INTERVAL_MS = 1000

const PlayerWrapper = () => {
  const [isSessionClosed, setIsSessionClosed] = useState(false)
  const u = new URLSearchParams(window.location.search)
  const [song, setSongInfo] = useState<Song | undefined>(undefined)
  const [playbackInfo, setPlaybackInfo] = useState<PlaybackInfo | undefined>(
    undefined
  )
  const [ws, setWs] = useState<undefined | WebSocket>(undefined)
  const token = u.get('token') ?? ''

  useEffect(() => {
    let interval: number | null = null

    const ws = new WebSocket(`ws://localhost:8080?token=${token}`)

    setWs(ws)
    ws.onopen = () => {
      interval = window.setInterval(() => {
        try {
          ws.send(
            JSON.stringify({
              type: 'sr.v1.player.status',
              param: new Date().getTime(),
              id: 'ping',
            })
          )
        } catch (e) {
          if (e instanceof Error) {
            console.error(
              `Failed to send status ping message for reason ${e.message}`
            )
          }
        }
      }, PLAYER_PING_INTERVAL_MS)

      setIsSessionClosed(false)

      ws.send(
        JSON.stringify({
          type: 'event.subscribe',
          param: ['songrequest.queue'],
        })
      )

      ws.send(
        JSON.stringify({
          type: 'sr.init',
          param: null,
        })
      )
    }

    ws.onmessage = (evt) => {
      const data = (
        typeof evt.data === 'string' ? JSON.parse(evt.data) : evt.data
      ) as { type: string; params: unknown }

      switch (data.type) {
        case 'sr.v1.playback.start': {
          setSongInfo(data.params as Song)
          break
        }
        case 'sr.v1.playback.update': {
          setPlaybackInfo(data.params as PlaybackInfo)
          break
        }
        case 'sr.v1.playback.skip': {
          setSongInfo(undefined)
          setPlaybackInfo(undefined)
          break
        }
      }
    }

    function wsCleanup() {
      if (interval) {
        window.clearInterval(interval)
        interval = null
      }
      setIsSessionClosed(true)
    }

    ws.onclose = wsCleanup
    ws.onerror = wsCleanup

    return () => {
      wsCleanup()
    }
  }, [token])

  const wsProxyMessage = (data: string) => {
    if (ws) {
      try {
        ws.send(data)
      } catch (e) {
        if (e instanceof Error) {
          console.error(
            `Failed to send status ping message for reason ${e.message}`
          )
        }
      }
    }
  }

  return (
    <>
      {isSessionClosed ? (
        <h1>SESSION CLOSED - REFRESH SOURCE</h1>
      ) : (
        <Container
          wsProxyMessage={wsProxyMessage}
          playback={playbackInfo}
          song={song}
        />
      )}
    </>
  )
}

export default PlayerWrapper
