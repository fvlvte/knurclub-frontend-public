import { Config } from '../../../Config.ts'

export function getWsClient(token?: string): WebSocket {
  // @ts-expect-error ws xD
  if (window.ws) {
    // @ts-expect-error ws xD
    return window.ws
  } else {
    if (!token) throw new Error('Token is required')
    // @ts-expect-error ws xD
    window.ws = new WebSocket(`${Config.getWSEndpoint()}/?token=${token}`)
    // @ts-expect-error ws xD
    return window.ws
  }
}
