enum WSNetworkFrameType {
  SERVER_HELLO = 'server.hello',
  CLIENT_HELLO = 'client.hello',

  SR_V1_CACHE_QUERY_BULK = 'sr.v1.cache.query.bulk',
  SR_V1_CACHE_QUERY_BULK_RESULT = 'sr.v1.cache.query.bulk.result',
  SR_V1_CACHE_STORE = 'sr.v1.cache.store',
  SR_V1_CHANGE_CURRENT_SONG = 'sr.v1.change.current_song',
  SR_V1_CACHE_STORE_RESULT = 'sr.v1.cache.store.result',
  SR_V1_FETCH = 'sr.v1.fetch',
  SR_V1_PLAYBACK_STATE = 'sr.v1.playback.state',
}

type WSNetworkFrame = {
  id?: string
  isReply?: boolean
  type: WSNetworkFrameType
  params: unknown
}

type SERVER_HELLO = {
  type: WSNetworkFrameType.SERVER_HELLO
  params: {
    version: string
    serverId: string
  }
}

type CLIENT_HELLO = {
  type: WSNetworkFrameType.CLIENT_HELLO
  params: {
    version: string
    clientId: string
  }
}

type PlaybackState = {
  playing?: boolean
  playerState?: { currentTime: number; duration: number }
  songId?: string
}

type SR_V1_PLAYBACK_STATE = {
  type: WSNetworkFrameType.SR_V1_PLAYBACK_STATE
  params: PlaybackState
}

type SR_V1_CACHE_QUERY_BULK = {
  type: WSNetworkFrameType.SR_V1_CACHE_QUERY_BULK
  params: string[]
}

type SR_V1_FETCH = {
  type: WSNetworkFrameType.SR_V1_FETCH
  params: string[]
}

type SR_V1_CACHE_STORE = {
  type: WSNetworkFrameType.SR_V1_CACHE_STORE
  params: [sourceUrl: string, value: string]
}

type SR_V1_CACHE_QUERY_BULK_RESULT = {
  type: WSNetworkFrameType.SR_V1_CACHE_QUERY_BULK_RESULT
  params: {
    url: string
    hit: boolean
  }[]
}

type SR_V1_CHANGE_CURRENT_SONG = {
  type: WSNetworkFrameType.SR_V1_CHANGE_CURRENT_SONG
  params: BackendSong | null
}

type SR_V1_CACHE_STORE_RESULT = {
  type: WSNetworkFrameType.SR_V1_CACHE_STORE_RESULT
  params: [sourceUrl: string, success: boolean]
}

export type BackendSong = {
  title: string
  subtitle: string

  audioSourceURL?: string
  iconSource?: string
  startFrom?: number

  user: {
    id: string
    name: string
    reputation: number
  }

  duration: number
  playing: boolean
}

export {
  type WSNetworkFrame,
  WSNetworkFrameType,
  type SERVER_HELLO,
  type CLIENT_HELLO,
  type PlaybackState,
  type SR_V1_PLAYBACK_STATE,
  type SR_V1_CACHE_QUERY_BULK,
  type SR_V1_FETCH,
  type SR_V1_CHANGE_CURRENT_SONG,
  type SR_V1_CACHE_QUERY_BULK_RESULT,
  type SR_V1_CACHE_STORE,
  type SR_V1_CACHE_STORE_RESULT,
}
