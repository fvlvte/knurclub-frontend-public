export class Config {
  public static async getBackendURL(): Promise<string> {
    return "http://localhost:80";
  }
}
