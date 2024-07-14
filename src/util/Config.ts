export class Config {
  public static getBackendEndpoint(): string {
    return import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:21377'
  }

  public static getWSEndpoint(): string {
    return import.meta.env.VITE_WSS_URL ?? 'ws://localhost:8080'
  }

  public static getTwitchOAuthRedirectUrl(): string {
    return `${
      import.meta.env.VITE_FRONTEND_URL ?? 'http://localhost:3000'
    }/oauth-flow`
  }

  public static getWidgetWithTokenURL(token: string): string {
    return `${
      import.meta.env.VITE_FRONTEND_URL ?? 'http://localhost:3000'
    }/new/player?token=${encodeURIComponent(token)}`
  }

  public static getTwitchAppClientID(): string {
    return (
      import.meta.env.VITE_TWITCH_APP_CLIENT_ID ??
      'z4ngv8hovfeaq7rstf7egijqn351wu'
    )
  }
}
