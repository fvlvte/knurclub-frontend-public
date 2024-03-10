import { useEffect, useState } from 'react'
import { Container } from './Container.tsx'
import { PlaybackInfo, Song } from './UOKIK.ts'
import AudioController, { AudioState } from './AudioController.tsx'
import SongContext from './context/SongContext.ts'
import AudioInfoContext from './context/AudioInfoContext.ts'
import PlaybackInfoContext from './context/PlaybackInfoContext.ts'

const PLAYER_PING_INTERVAL_MS = 1000

const u = new URLSearchParams(window.location.search)

const PlayerWrapper = () => {
  /* Context Variables */
  const [song, setSongInfo] = useState<Song | null>(null)
  const [audioState, setAudioState] = useState<AudioState | null>(null)
  const [playbackInfo, setPlaybackInfo] = useState<PlaybackInfo | null>(null)

  const [isSessionClosed, setIsSessionClosed] = useState(false)

  const token = u.get('token') ?? ''

  useEffect(() => {
    let interval: number | null = null

    const ws = new WebSocket(`ws://localhost:8080?token=${token}`)

    ws.onopen = () => {
      interval = window.setInterval(() => {
        try {
          let param: null | { status: string; song?: Song } = null

          if (!song || !audioState) {
            param = { status: 'idle' }
          } else {
            param = { status: 'playing', song: song }
          }

          ws.send(
            JSON.stringify({
              type: 'sr.v1.player.status',
              param: param,
              id: new Date().getTime(),
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
          setSongInfo(null)
          setPlaybackInfo(null)
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

  return (
    <SongContext.Provider value={song}>
      <AudioInfoContext.Provider value={audioState}>
        <PlaybackInfoContext.Provider value={playbackInfo}>
          {isSessionClosed ? (
            <h1>SESSION CLOSED - REFRESH SOURCE</h1>
          ) : (
            <>
              <AudioController
                onTimeUpdate={(as: AudioState) => {
                  setAudioState(as)
                }}
              />
              <Container />
            </>
          )}
        </PlaybackInfoContext.Provider>
      </AudioInfoContext.Provider>
    </SongContext.Provider>
  )
}

export default PlayerWrapper
