export class Config {
  public static async getBackendURL(): Promise<string> {
    return "http://localhost:80";
  }

  public static getNewBackendURL(): string {
    return process.env.REACT_APP_BACKEND_URL ?? "http://localhost:21377";
  }

  public static getTwitchOAuthRedirectUrl(): string {
    return `${
      process.env.REACT_APP_FRONTEND_URL ?? "http://localhost:3000"
    }/oauth-flow`;
  }
  public static getWidgetWithTokenURL(token: string): string {
    return `${
      process.env.REACT_APP_FRONTEND_URL ?? "http://localhost:3000"
    }/v2/widget?token=${encodeURIComponent(token)}`;
  }
}
