export class Config {
  public static async getBackendURL(): Promise<string> {
    return "http://localhost:80";
  }

  public static getNewBackendURL(): string {
    return "http://localhost:21377";
  }

  public static getTwitchOAuthRedirectUrl(): string {
    return "http://localhost:3000/oauth-flow";
  }
  public static getWidgetWithTokenURL(token: string): string {
    return `http://localhost:3000/v2/widget?token=${encodeURIComponent(token)}`;
  }
}
