import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AudioState } from '../components/Audio.tsx'
import AudioInfoContext from '../context/AudioInfoContext.ts'
import { Components } from '../'
import { WebSocketSingleton } from '../managers/WebSocketSingleton.ts'
import { WSNetworkFrameType } from '../types/WSShared.ts'
import BackendSongContext from '../context/BackendSongContext.ts'

const PlayerWrapper = () => {
  const [audioState, setAudioState] = useState<AudioState | null>(null)
  const [, setIsPreparingToPlay] = useState(true)
  const song = useContext(BackendSongContext)
  const [isSessionClosed] = useState(false)

  useEffect(() => {
    if (audioState) {
      WebSocketSingleton.getInstance().sendFrameNoResponse({
        type: WSNetworkFrameType.SR_V1_PLAYBACK_STATE,
        params: {
          playing: audioState.isPlaying,
          playerState: {
            duration: audioState.time.duration,
            currentTime: audioState.time.current,
          },
          songId: song?.audioSourceURL,
        },
      })
    } else {
      WebSocketSingleton.getInstance().sendFrameNoResponse({
        type: WSNetworkFrameType.SR_V1_PLAYBACK_STATE,
        params: {
          playing: false,
          playerState: undefined,
          songId: undefined,
        },
      })
    }
  }, [audioState])

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

  const onPlay = useCallback(() => {
    setIsPreparingToPlay(false)
  }, [setIsPreparingToPlay])

  return (
    <AudioInfoContext.Provider value={audioState}>
      {isSessionClosed ? (
        <h1 style={{ color: 'black' }}>SESSION CLOSED - REFRESH SOURCE</h1>
      ) : (
        <>
          <Components.Audio onPlay={onPlay} onTimeUpdate={onTimeUpdate} />
          <Components.Container>
            <Components.Title />
            <Components.Subtitle />
            <Components.Info />
            <Components.Progress />
          </Components.Container>
        </>
      )}
    </AudioInfoContext.Provider>
  )
}

const MemorizedPlayerWrapper = React.memo(PlayerWrapper)
export default MemorizedPlayerWrapper
