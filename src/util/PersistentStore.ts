export class PersistentStore {
  static setKey(key: string, value: string) {
    if (!window.localStorage) throw new Error("No localStorage present");

    window.localStorage.setItem(key, value);
  }

  static getKey(key: string): string | null {
    if (!window.localStorage) throw new Error("No localStorage present");
    return window.localStorage.getItem(key);
  }

  static removeKey(key: string): void {
    if (!window.localStorage) throw new Error("No localStorage present");
    return window.localStorage.removeItem(key);
  }
}
