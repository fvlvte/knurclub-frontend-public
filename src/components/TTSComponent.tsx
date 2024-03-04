import React, { useCallback, useEffect, useRef } from 'react'
import { Config } from '../Config'

interface TTSComponentProps {
  text: string
  completionCallback?: () => void
}

export const TTSComponent: React.FC<TTSComponentProps> = (
  props: TTSComponentProps
) => {
  const audioRef: React.Ref<HTMLAudioElement> = useRef<HTMLAudioElement>(null)

  const callback = useCallback(() => {
    if (props.completionCallback) props.completionCallback()
  }, [props.completionCallback])

  useEffect(() => {
    const audioElement = audioRef.current
    if (audioElement) {
      Config.getBackendURL().then((url) => {
        const text = encodeURIComponent(props.text)

        audioElement.src = `${url}/v1/tts?data=${text}`

        audioElement.onended = callback
        audioElement.onerror = console.log
        audioElement.play().catch(console.log)
      })
    }
  }, [props, callback])

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, display: 'block' }}>
      <audio ref={audioRef}></audio>
    </div>
  )
}
