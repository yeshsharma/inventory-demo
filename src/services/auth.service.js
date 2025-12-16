import { apiService } from "./api.service";
import { API_CONFIG } from "../config/api.config";
import { StorageUtil } from "../utils/storage.util";

export const authService = {
  login: async (credentials) => {
    try {
      const response = await apiService.post(
        API_CONFIG.ENDPOINTS.LOGIN,
        credentials
      );

      if (response.token || response.access_token) {
        const token = response.token || response.access_token;
        StorageUtil.setToken(token);

        if (response.user) {
          StorageUtil.setUserData(response.user);
        }

        return {
          success: true,
          data: response,
        };
      }

      return {
        success: false,
        message: "Invalid response from server",
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "",
      };
    }
  },

  logout: () => {
    StorageUtil.clearAll();
  },

  isAuthenticated: () => {
    return !!StorageUtil.getToken();
  },

  getCurrentUser: () => {
    return StorageUtil.getUserData();
  },
};
