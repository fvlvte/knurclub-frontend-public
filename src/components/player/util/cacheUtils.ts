import { getWsClient } from './getWsClient.ts'

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
    cacheSetPromises.get(url)?.(data)
    cacheSetPromises.delete(url)
  }
  console.log(songAudioCache)
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
    cacheSetPromises.set(url, resolve)
  })
}

export async function songAudioCacheGetFetch(url: string) {
  const i = songAudioCache.get(url)
  if (i) {
    i.timestamp = new Date().getTime()
  }
  if (!i) {
    const wsClient = getWsClient()
    wsClient.send(JSON.stringify({ type: 'sr.v1.fetch', param: [url] }))
    return songAudioCacheGetReal(url)
  }
  return i?.data
}

export async function socketMessageToCacheAction(
  message: string
): Promise<{ type: string; param: unknown[] } | null> {
  const parsed = JSON.parse(message) as { type: string; param: string[] }
  console.log(parsed)
  switch (parsed.type) {
    case 'sr.v1.cache.query.bulk': {
      const ret: { type: string; param: unknown[] } = {
        type: 'sr.v1.cache.query.bulk.result',
        param: [],
      }
      for (const url of parsed.param) {
        if (await songAudioCacheGet(url)) {
          ret.param.push({ url, hit: true })
        } else {
          ret.param.push({ url, hit: false })
        }
      }
      return ret
    }
    case 'sr.v1.cache.store': {
      await songAudioCacheSet(parsed.param[0], parsed.param[1])
      return {
        type: 'sr.v1.cache.store.result',
        param: [parsed.param[0], true],
      }
    }
  }

  return null
}
