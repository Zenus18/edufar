export default class StorageProvider {
  constructor() {
    this.access_token = null;
    this.token_type = null;
  }
  static setStorage(key, value) {
    localStorage.setItem(key, value);
  }
  static getItem(key) {
    return localStorage.getItem(key);
  }
  static setAuthTokens(access_token, token_type) {
    this.access_token = access_token;
    this.token_type = token_type;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("token_type", token_type);
  }

  static isAuthenticated() {
    return (
      localStorage.getItem("access_token") != null &&
      localStorage.getItem("access_token") != ""
    );
  }

  static clearAuthTokens() {
    this.access_token = null;
    this.token_type = null;
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
  }
}
