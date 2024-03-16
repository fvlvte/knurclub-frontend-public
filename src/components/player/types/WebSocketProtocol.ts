enum WSNetworkFrameType {
  SR_V1_CACHE_QUERY_BULK = 'sr.v1.cache.query.bulk',
  SR_V1_CACHE_QUERY_BULK_RESULT = 'sr.v1.cache.query.bulk.result',
  SR_V1_CACHE_STORE = 'sr.v1.cache.store',
  SR_V1_CACHE_STORE_RESULT = 'sr.v1.cache.store.result',
  SR_V1_FETCH = 'sr.v1.fetch',
}

type WSNetworkFrame = {
  id?: string
  isReply?: boolean
  type: WSNetworkFrameType
  params: unknown
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

type SR_V1_CACHE_STORE_RESULT = {
  type: WSNetworkFrameType.SR_V1_CACHE_STORE_RESULT
  params: [sourceUrl: string, success: boolean]
}

export {
  type WSNetworkFrame,
  WSNetworkFrameType,
  type SR_V1_CACHE_QUERY_BULK,
  type SR_V1_FETCH,
  type SR_V1_CACHE_QUERY_BULK_RESULT,
  type SR_V1_CACHE_STORE,
  type SR_V1_CACHE_STORE_RESULT,
}
