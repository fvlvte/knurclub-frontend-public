import { useContext, useEffect, useRef } from 'react'
import SongContext from './context/SongContext.ts'
import PlaybackInfoContext from './context/PlaybackInfoContext.ts'

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

const AudioController = ({
  onPlay,
  onEnded,
  onTimeUpdate,
}: AudioControllerProps) => {
  const ref = useRef<HTMLAudioElement>(null)

  const song = useContext(SongContext)
  const playbackInfo = useContext(PlaybackInfoContext)

  const handleError = (e: Error) => {
    if (onEnded) {
      onEnded(e)
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
        onEnded(generateCurrentAudioState(ref.current))
      }
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
    if (ref.current) {
      if (!ref.current.paused) {
        ref.current.pause()
      }
      if (song?.startFrom) {
        ref.current.fastSeek(song.startFrom)
      }
      ref.current.volume = 0.02137
      ref.current.play().catch(handleError)
    }
    if (!song && onTimeUpdate) {
      onTimeUpdate(null)
    }
  }, [song, ref.current])

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = playbackInfo?.volume ?? DEFAULT_VOLUME
    }
  }, [playbackInfo?.volume, ref.current])

  return (
    <audio
      src={song?.playerAudioSource}
      onPlay={handlePlaybackStart}
      onEnded={handlePlaybackEnd}
      onTimeUpdate={handleTimeUpdate}
      ref={ref}
    />
  )
}

export default AudioController
