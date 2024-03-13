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
import { useWebsocket } from './hooks/useWebsocket.ts'
import { socketMessageToCacheAction } from './util/cacheUtils.ts'
import { getWsClient } from './util/getWsClient.ts'
import { useAudioSourceCache } from './hooks/useAudioSourceCache.ts'

const u = new URLSearchParams(window.location.search)
const token = u.get('token') ?? ''

const ws = getWsClient(token)

const PlayerWrapper = () => {
  /* Context Variables */
  const [song, setSongInfo] = useState<Song | null>(null)
  const [audioState, setAudioState] = useState<AudioState | null>(null)
  const [playbackInfo, setPlaybackInfo] = useState<PlaybackInfo | null>(null)
  const [, setIsPreparingToPlay] = useState(true)

  const [isSessionClosed] = useState(false)

  const { onMessageRef } = useWebsocket(ws)

  const [url, setUrl] = useState<string | null>(null)

  onMessageRef.current = (message: unknown) => {
    if (url !== 'https://www.youtube.com/watch?v=oqzTignky58')
      setUrl('https://www.youtube.com/watch?v=oqzTignky58')
    return socketMessageToCacheAction(message as string)
  }

  const audioSourceCache = useAudioSourceCache(url)

  useEffect(() => {
    console.log(audioSourceCache)
  }, [audioSourceCache])

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
