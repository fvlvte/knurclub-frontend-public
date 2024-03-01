export class Config {
  public static async getBackendURL(): Promise<string> {
    return "http://localhost:80";
  }

  public static getNewBackendURL(): string {
    return import.meta.env.VITE_BACKEND_URL ?? "http://localhost:21378";
  }

  public static getTwitchOAuthRedirectUrl(): string {
    return `${
        import.meta.env.VITE_FRONTEND_URL ?? "http://localhost:3000"
    }/oauth-flow`;
  }
  public static getWidgetWithTokenURL(token: string): string {
    return `${
        import.meta.env.VITE_FRONTEND_URL ?? "http://localhost:3000"
    }/v2/widget?token=${encodeURIComponent(token)}`;
  }

  public static getTwitchAppClientID(): string {
    return (
        import.meta.env.VITE_TWITCH_APP_CLIENT_ID ??
      "z4ngv8hovfeaq7rstf7egijqn351wu"
    );
  }
}
