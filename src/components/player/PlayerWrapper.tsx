import { useEffect, useState } from 'react'
import { Container } from './Container.tsx'
import { PlaybackInfo, Song } from './UOKIK.ts'
import AudioController, { AudioState } from './AudioController.tsx'
import SongContext from './context/SongContext.ts'
import AudioInfoContext from './context/AudioInfoContext.ts'
import PlaybackInfoContext from './context/PlaybackInfoContext.ts'
import Title from './Title.tsx'
import Subtitle from './Subtitle.tsx'
import { Info } from './Info.tsx'
import Progress from './Progress.tsx'
import { Config } from '../../Config.ts'

const u = new URLSearchParams(window.location.search)

const PlayerWrapper = () => {
  /* Context Variables */
  const [song, setSongInfo] = useState<Song | null>(null)
  const [audioState, setAudioState] = useState<AudioState | null>(null)
  const [playbackInfo, setPlaybackInfo] = useState<PlaybackInfo | null>(null)
  const [isPrepringToPlay, setIsPreparingToPlay] = useState(true)

  const [isSessionClosed, setIsSessionClosed] = useState(false)

  const token = u.get('token') ?? ''

  const [ws, setWs] = useState<WebSocket | null>(null)

  const onTick = (
    ws: WebSocket,
    song: Song | null,
    audioState: AudioState | null,
    isPrepringToPlay: boolean
  ) => {
    try {
      let param: null | {
        status: string
        song?: Song
        audioState?: AudioState
      } = null

      //console.log(song, audioState)
      if (isPrepringToPlay) {
        if (audioState && audioState.isPlaying && song !== null) {
          setIsPreparingToPlay(false)
        }
        return
      } else if (song === null) {
        param = { status: 'idle' }
      } else {
        const s = { ...song }
        delete s.playerAudioSource
        delete s.playerIconSource
        param = {
          status: 'playing',
          song: s as Song,
          audioState: audioState as AudioState,
        }
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
  }

  useEffect(() => {
    if (ws) {
      onTick(ws, song, audioState, isPrepringToPlay)
    }
  }, [ws, song, audioState, isPrepringToPlay])

  // Guard for bugging of prepare to play (if can't play skip song)
  useEffect(() => {
    let timeout: number | undefined
    if (isPrepringToPlay) {
      timeout = window.setTimeout(() => {
        setSongInfo(null)
        setPlaybackInfo(null)
        setAudioState(null)
        setIsPreparingToPlay(false)
      }, 6666)
    }
    return () => {
      if (timeout) {
        window.clearTimeout(timeout)
      }
    }
  }, [isPrepringToPlay])

  useEffect(() => {
    let interval: number | null = null
    const ws = new WebSocket(`${Config.getWSEndpoint()}/?token=${token}`)

    ws.onopen = () => {
      ws?.send(
        JSON.stringify({
          type: 'event.subscribe',
          param: ['songrequest.queue'],
        })
      )

      setIsSessionClosed(false)
      setIsPreparingToPlay(true)
      setWs(ws)
    }

    ws.onmessage = (evt) => {
      const data = (
        typeof evt.data === 'string' ? JSON.parse(evt.data) : evt.data
      ) as { type: string; params: unknown }

      switch (data.type) {
        case 'sr.v1.playback.start': {
          setIsPreparingToPlay(true)
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
            <h1 style={{ color: 'black' }}>SESSION CLOSED - REFRESH SOURCE</h1>
          ) : (
            <>
              <AudioController
                onPlay={() => {
                  setIsPreparingToPlay(false)
                }}
                onEnded={() => {
                  setSongInfo(null)
                  setAudioState(null)
                  setPlaybackInfo(null)
                }}
                onTimeUpdate={(as) => {
                  setAudioState((prevState) => {
                    if (as === null) {
                      return as
                    } else if (prevState == null) {
                      return as
                    } else if (
                      Math.abs(
                        as.time.current - (prevState?.time.current ?? 0)
                      ) > 1 ||
                      prevState.isPlaying !== as.isPlaying
                    ) {
                      return as
                    } else {
                      return prevState
                    }
                  })
                }}
              />
              <Container>
                <Title />
                <Subtitle />
                <Info />
                <Progress />
              </Container>
            </>
          )}
        </PlaybackInfoContext.Provider>
      </AudioInfoContext.Provider>
    </SongContext.Provider>
  )
}

export default PlayerWrapper
