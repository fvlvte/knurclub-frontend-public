import { useContext, useState } from 'react'
import { Container } from './Container.tsx'
import { PlaybackInfo } from './types/Common.ts'
import AudioController, { AudioState } from './AudioController.tsx'
import SongContext from './context/SongContext.ts'
import AudioInfoContext from './context/AudioInfoContext.ts'
import PlaybackInfoContext from './context/PlaybackInfoContext.ts'
import Title from './Title.tsx'
import Subtitle from './Subtitle.tsx'
import { Info } from './Info.tsx'
import Progress from './Progress.tsx'
import { useWebsocket } from './hooks/useWebsocket.ts'
import { socketMessageToCacheAction } from './util/cacheUtils.ts'
import { useBackendSong } from './hooks/useBackendSong.ts'
import WebSocketContext from './context/WebSocketContext.ts'

const PlayerWrapper = () => {
  const song = useBackendSong()
  const [audioState, setAudioState] = useState<AudioState | null>(null)
  const [playbackInfo, setPlaybackInfo] = useState<PlaybackInfo | null>(null)
  const [, setIsPreparingToPlay] = useState(true)

  const ws = useContext(WebSocketContext)

  const [isSessionClosed] = useState(false)

  const { onMessageRef } = useWebsocket(ws.ws)

  onMessageRef.current = (message: unknown) => {
    return socketMessageToCacheAction(message as string)
  }

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
                      ) > 0.666 ||
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
