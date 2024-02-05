import Url from "@/constant/constant_url";

const { default: Api } = require("@/utils/api");
const { default: api } = require("@/utils/axios");
const { default: StorageProvider } = require("@/utils/storage");

class AuthController {
  static async login(postData) {
    try {
      const response = await api.post(Api.LOGIN_URL, postData);
      const { access_token, token_type, role } = response.data;
      if (access_token && token_type) {
        StorageProvider.setAuthTokens(access_token, token_type);
        StorageProvider.setStorage("role", role);
        console.log("login successful");
        window.location.href = "/";
      } else {
        console.log(`login failed: ${response.data.message}`);
      }
    } catch (e) {
      console.log(e.message);
    }
  }
  static handleLogout() {
    try {
      if (
        localStorage.getItem("access_token") != null &&
        localStorage.getItem("token_type") != null
      ) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
      }
      window.location.href = "/"; // Ganti URL dengan URL halaman login Anda
    } catch (error) {
      console.error(error);
    }
  }
}
export default AuthController;
