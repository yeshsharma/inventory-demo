const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  USER_DATA: "user_data",
  REFRESH_TOKEN: "refresh_token",
};

export const StorageUtil = {
  setToken: (token) => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  },

  getToken: () => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  },

  setUserData: (data) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  },

  getUserData: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  },

  clearAll: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },
};
