import { Config } from '../../../Config.ts'

export class WebSocketSingleton {
  private static instance: WebSocketSingleton
  private ws?: WebSocket
  private constructor() {}

  public init(token: string) {
    if (!this.ws) {
      this.ws = new WebSocket(`${Config.getWSEndpoint()}/?token=${token}`)
    }
  }
  public static getInstance(): WebSocketSingleton {
    if (!WebSocketSingleton.instance) {
      WebSocketSingleton.instance = new WebSocketSingleton()
    }
    return WebSocketSingleton.instance
  }
  public getWebSocket(): WebSocket | undefined {
    return this.ws
  }
}
