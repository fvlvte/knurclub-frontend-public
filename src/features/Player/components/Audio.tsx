import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import BackendSongContext from '../context/BackendSongContext.ts'
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

const Audio = ({ onPlay, onEnded, onTimeUpdate }: AudioControllerProps) => {
  const ref = useRef<HTMLAudioElement>(null)

  const song = useContext(BackendSongContext)
  const audioSource = useAudioSourceCache(song?.audioSourceURL ?? null)
  const playbackControl = useContext(PlaybackControlContext)
  const [songFinished, setSongFinished] = useState(false)

  const handleError = (e: unknown) => {
    console.error(e)
    if (onEnded) {
      onEnded(e as Error)
    }
  }

  const setVolume = useCallback(
    (volume: number) => {
      if (ref.current) {
        if (ref.current.volume === volume) return
        ref.current.volume = volume
      }
    },
    [ref.current]
  )

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
        onEnded(generateCurrentAudioState(ref.current))
      }
      setSongFinished(true)
    }
  }

  const handlePlaybackStart = () => {
    if (ref.current) {
      if (onPlay) {
        onPlay(generateCurrentAudioState(ref.current))
      }
    }
  }

  useEffect(() => {
    if (playbackControl && ref.current) {
      if (playbackControl.isPaused && !ref.current?.paused) {
        ref.current.pause()
      } else if (
        !playbackControl.isPaused &&
        ref.current?.paused &&
        !songFinished
      ) {
        ref.current.play().catch(console.error)
      }

      setVolume(playbackControl.volume)
    }
  }, [playbackControl, ref.current, songFinished])

  useEffect(() => {
    if (ref.current) {
      setSongFinished(false)
      const player = ref.current
      if (player.paused) {
        player
          .play()
          .then(() => {})
          .catch((e) => {
            console.error(e)
          })
      }
    }
    if (!song && onTimeUpdate) {
      onTimeUpdate(null)
    }
  }, [song, ref.current, audioSource])

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
