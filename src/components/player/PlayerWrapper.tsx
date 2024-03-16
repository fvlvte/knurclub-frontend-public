import { useState } from 'react'
import { Container } from './Container.tsx'
import { PlaybackInfo } from './types/Common.ts'
import AudioController, { AudioState } from './AudioController.tsx'
import BackendSongContext from './context/BackendSongContext.ts'
import AudioInfoContext from './context/AudioInfoContext.ts'
import PlaybackInfoContext from './context/PlaybackInfoContext.ts'
import Title from './Title.tsx'
import Subtitle from './Subtitle.tsx'
import { Info } from './Info.tsx'
import Progress from './Progress.tsx'
import { useBackendSong } from './hooks/useBackendSong.ts'

const PlayerWrapper = () => {
  const song = useBackendSong()
  const [audioState, setAudioState] = useState<AudioState | null>(null)
  const [playbackInfo, setPlaybackInfo] = useState<PlaybackInfo | null>(null)
  const [, setIsPreparingToPlay] = useState(true)

  const [isSessionClosed] = useState(false)

  return (
    <BackendSongContext.Provider value={song}>
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
    </BackendSongContext.Provider>
  )
}

export default PlayerWrapper
