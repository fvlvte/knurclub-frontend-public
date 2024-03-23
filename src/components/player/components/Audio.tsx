import React, { useContext, useEffect, useRef } from 'react'
import BackendSongContext from '../context/BackendSongContext.ts'
import PlaybackInfoContext from '../context/PlaybackInfoContext.ts'
import { useAudioSourceCache } from '../hooks/useAudioSourceCache.ts'
import PlaybackControlContext from '../context/PlaybackControlContext.ts'

type AudioControllerProps = {
  onPlay?: (state: AudioState | null) => void
  onEnded?: (state: AudioState | Error) => void
  onTimeUpdate?: (state: AudioState | null) => void
}

export type AudioState = {
  isPlaying: boolean
  volume: number
  time: {
    current: number
    duration: number
  }
}

const DEFAULT_VOLUME = 0.5

const Audio = ({ onPlay, onEnded, onTimeUpdate }: AudioControllerProps) => {
  const ref = useRef<HTMLAudioElement>(null)

  const song = useContext(BackendSongContext)
  const playbackInfo = useContext(PlaybackInfoContext)
  const audioSource = useAudioSourceCache(song?.audioSourceURL ?? null)
  const playbackControl = useContext(PlaybackControlContext)

  const handleError = (e: unknown) => {
    console.error(e)
    if (onEnded) {
      //onEnded(e as Error)
    }
  }

  const generateCurrentAudioState = (element: HTMLAudioElement): AudioState => {
    return {
      isPlaying: !element.paused,
      volume: element.volume,
      time: {
        current: element.currentTime,
        duration: element.duration,
      },
    } as AudioState
  }

  const handleTimeUpdate = () => {
    if (ref.current) {
      if (onTimeUpdate) {
        onTimeUpdate(generateCurrentAudioState(ref.current))
      }
    }
  }

  const handlePlaybackEnd = () => {
    if (ref.current) {
      if (onEnded) {
        //onEnded(generateCurrentAudioState(ref.current))
      }
    }
  }

  const handlePlaybackStart = () => {
    if (ref.current) {
      if (onPlay) {
        //onPlay(generateCurrentAudioState(ref.current))
      }
    }
  }

  useEffect(() => {
    if (playbackControl && ref.current) {
      if (playbackControl.isPaused && !ref.current?.paused) {
        ref.current.pause()
      } else if (!playbackControl.isPaused && ref.current?.paused) {
        ref.current.play().catch(console.error)
      }

      if (playbackControl.volume > 1) {
        ref.current.volume = playbackControl.volume / 100
      } else {
        ref.current.volume = playbackControl.volume
      }
    }
  }, [playbackControl, ref.current])

  useEffect(() => {
    if (ref.current) {
      const player = ref.current
      if (player.paused) {
        player
          .play()
          .then(() => {})
          .catch((e) => {
            console.error(e)
          })
      }
      ref.current.volume = playbackInfo?.volume ?? DEFAULT_VOLUME
    }
    if (!song && onTimeUpdate) {
      onTimeUpdate(null)
    }
  }, [song, ref.current, audioSource])

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = playbackInfo?.volume ?? DEFAULT_VOLUME
    }
  }, [playbackInfo?.volume, ref.current])

  if (!song || !audioSource) {
    return null
  }

  return (
    <audio
      src={audioSource}
      onError={handleError}
      onPlay={handlePlaybackStart}
      onEnded={handlePlaybackEnd}
      onTimeUpdate={handleTimeUpdate}
      ref={ref}
    />
  )
}

const MemorizedAudio = React.memo(Audio)
export default MemorizedAudio
