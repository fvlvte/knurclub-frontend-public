import { WebSocketSingleton } from '../managers/WebSocketSingleton.ts'
import { WSNetworkFrameType } from '../types/WebSocketProtocol.ts'

const CACHE_MAX = 100

const songAudioCache = new Map<string, { data: string; timestamp: number }>()

const cacheSetPromises = new Map<string, (s: string) => void>()

export async function songAudioCacheSet(url: string, data: string) {
  if (songAudioCache.size >= CACHE_MAX) {
    const oldest = Array.from(songAudioCache.entries()).sort(
      (a, b) => a[1].timestamp - b[1].timestamp
    )[0]
    songAudioCache.delete(oldest[0])
  }
  songAudioCache.set(url, { data: data, timestamp: new Date().getTime() })

  if (cacheSetPromises.has(url)) {
    console.log('cacheSetPromises has url')
    cacheSetPromises.get(url)?.(data)
    cacheSetPromises.delete(url)
  }
}

export async function songAudioCacheGet(url: string) {
  const i = songAudioCache.get(url)
  if (i) {
    i.timestamp = new Date().getTime()
  }
  return i?.data
}

async function songAudioCacheGetReal(url: string): Promise<string> {
  return new Promise((resolve) => {
    WebSocketSingleton.getInstance().sendFrameNoResponse({
      type: WSNetworkFrameType.SR_V1_FETCH,
      params: [url],
    })
    cacheSetPromises.set(url, resolve)
  })
}

export async function songAudioCacheGetFetch(url: string) {
  const i = songAudioCache.get(url)
  if (i) {
    i.timestamp = new Date().getTime()
  }
  if (!i) {
    return songAudioCacheGetReal(url)
  }
  return i?.data
}
