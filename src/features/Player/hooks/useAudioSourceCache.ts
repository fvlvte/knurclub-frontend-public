import { useEffect, useState } from 'react'
import { songAudioCacheGetFetch } from '../util/cacheUtils.ts'

export function useAudioSourceCache(url: string | null) {
  const [cache, setCache] = useState<string | null>(null)

  useEffect(() => {
    if (url === null) {
      setCache(null)
      return
    }
    setCache(null)
    songAudioCacheGetFetch(url).then((data) => {
      setCache(data ?? null)
    })
  }, [url])

  return cache
}
