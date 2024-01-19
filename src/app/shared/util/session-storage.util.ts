export default class SessionStorageUtil {
  private static readonly TOKEN_KEY = "checkpoint-token";

  static setAuthToken(value: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, value)
  }

  static getAuthToken(): string {
    return sessionStorage.getItem(this.TOKEN_KEY)
  }

  static clearAll(): void {
    sessionStorage.clear();
  }
}
