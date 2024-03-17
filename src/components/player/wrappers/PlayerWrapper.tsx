import React, { useCallback, useState } from 'react'
import { PlaybackInfo } from '../types/Common.ts'
import { AudioState } from '../components/Audio.tsx'
import AudioInfoContext from '../context/AudioInfoContext.ts'
import PlaybackInfoContext from '../context/PlaybackInfoContext.ts'
import { Components } from '../'

const PlayerWrapper = () => {
  const [audioState, setAudioState] = useState<AudioState | null>(null)
  const [playbackInfo, setPlaybackInfo] = useState<PlaybackInfo | null>(null)
  const [, setIsPreparingToPlay] = useState(true)

  const [isSessionClosed] = useState(false)

  const onTimeUpdate = useCallback(
    (as: AudioState | null) => {
      setAudioState((prevState) => {
        if (as === null) {
          return as
        } else if (prevState == null) {
          return as
        } else if (
          Math.abs(as.time.current - (prevState?.time.current ?? 0)) > 0.666 ||
          prevState.isPlaying !== as.isPlaying
        ) {
          return as
        } else {
          return prevState
        }
      })
    },
    [setAudioState]
  )

  const onEnded = useCallback(() => {
    setAudioState(null)
    setPlaybackInfo(null)
  }, [setAudioState, setPlaybackInfo])

  const onPlay = useCallback(() => {
    setIsPreparingToPlay(false)
  }, [setIsPreparingToPlay])

  return (
    <AudioInfoContext.Provider value={audioState}>
      <PlaybackInfoContext.Provider value={playbackInfo}>
        {isSessionClosed ? (
          <h1 style={{ color: 'black' }}>SESSION CLOSED - REFRESH SOURCE</h1>
        ) : (
          <>
            <Components.Audio
              onPlay={onPlay}
              onEnded={onEnded}
              onTimeUpdate={onTimeUpdate}
            />
            <Components.Container>
              <Components.Title />
              <Components.Subtitle />
              <Components.Info />
              <Components.Progress />
            </Components.Container>
          </>
        )}
      </PlaybackInfoContext.Provider>
    </AudioInfoContext.Provider>
  )
}

const MemorizedPlayerWrapper = React.memo(PlayerWrapper)
export default MemorizedPlayerWrapper
