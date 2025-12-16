import { API_CONFIG } from "../config/api.config";
import { StorageUtil } from "../utils/storage.util";

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  async request(endpoint, options = {}) {
    const token = StorageUtil.getToken();

    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config = {
      method: options.method || "GET",
      headers,
      ...options,
    };

    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw {
          status: response.statusCode,
          message: response.message || "Something went wrong",
          data,
        };
      }

      return data;
    } catch (error) {
      if (error.statusCode === 401) {
        StorageUtil.clearAll();
        window.location.href = "/login";
      }
      throw error;
    }
  }

  get(endpoint, options) {
    return this.request(endpoint, { ...options, method: "GET" });
  }

  post(endpoint, body, options) {
    return this.request(endpoint, { ...options, method: "POST", body });
  }

  put(endpoint, body, options) {
    return this.request(endpoint, { ...options, method: "PUT", body });
  }

  delete(endpoint, options) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiService = new ApiService();
