import { useEffect, useRef } from 'react'

type AudioControllerProps = {
  onPlay?: (state: AudioState) => void
  onEnded?: (state: AudioState | Error) => void
  onTimeUpdate?: (state: AudioState) => void
  source?: string
  volume?: number
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
  source,
  volume,
}: AudioControllerProps) => {
  const ref = useRef<HTMLAudioElement>(null)

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

      // TODO: remove
      ref.current.play().catch(handleError)
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
      ref.current.volume = 0.02137
      ref.current.play().catch(handleError)
    }
  }, [source, ref.current])

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume ?? DEFAULT_VOLUME
    }
  }, [volume, ref.current])

  return (
    <audio
      src={source}
      onPlay={handlePlaybackStart}
      onEnded={handlePlaybackEnd}
      onTimeUpdate={handleTimeUpdate}
      ref={ref}
    />
  )
}

export default AudioController
