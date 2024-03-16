import { Config } from '../../../Config.ts'
import { WSNetworkFrame } from '../types/WebSocketProtocol.ts'

export class WebSocketSingleton {
  private static instance: WebSocketSingleton
  private ws?: WebSocket
  private frameResolver = new Map<
    string,
    { r: (frame: WSNetworkFrame) => void; t: number }
  >()
  private constructor() {}

  public init(token: string) {
    if (!this.ws) {
      this.ws = new WebSocket(`${Config.getWSEndpoint()}/?token=${token}`)
      // Promise based frame response gen.
      this.ws.addEventListener(
        'message',
        (event: MessageEvent<WSNetworkFrame>) => {
          if (event.data.id) {
            const resolver = this.frameResolver.get(event.data.id)
            if (resolver && resolver.r) {
              resolver.r(event.data)
              this.frameResolver.delete(event.data.id)
            }
          }
        }
      )
    }
  }
  public static getInstance(): WebSocketSingleton {
    if (!WebSocketSingleton.instance) {
      WebSocketSingleton.instance = new WebSocketSingleton()
    }
    return WebSocketSingleton.instance
  }

  public sendFrameNoResponse(frame: WSNetworkFrame): void {
    if (this.ws && this.ws.readyState === this.ws.OPEN) {
      this.ws.send(JSON.stringify(frame))
    } else {
      throw new Error('WebSocket not open')
    }
  }

  public sentFrameWithResponse(frame: WSNetworkFrame): Promise<WSNetworkFrame> {
    if (!frame.id) {
      frame.id =
        Math.random().toString(36).substring(2, 15) +
        new Date().getTime().toString()
    }

    return new Promise((resolve, reject) => {
      if (this.ws && this.ws.readyState === this.ws.OPEN && frame.id) {
        this.ws.send(JSON.stringify(frame))
        this.frameResolver.set(frame.id, {
          r: resolve,
          t: new Date().getTime(),
        })
      } else {
        reject(new Error('WebSocket not open'))
      }
    })
  }
  public getWebSocket(): WebSocket | undefined {
    return this.ws
  }
}
