// services/inventory.service.js
import { apiService } from "./api.service";
import { API_CONFIG } from "../config/api.config";

export const inventoryService = {
  
  getInventory: async () => {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.INVENTORY);
      console.log("Inventory API Response:", response);

      return {
        success: true,
        data: response.items, // Extract items array from response
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to fetch inventory",
        error,
      };
    }
  },

  /**
   * Updates an inventory item
   * @param {string} id - Item ID
   * @param {object} data - Updated item data
   * @returns {Promise} Promise containing update result
   */
  updateInventory: async (data) => {
    try {
      const response = await apiService.put(
        `${API_CONFIG.ENDPOINTS.INVENTORY}`,
        data
      );

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to update inventory",
        error,
      };
    }
  },

  getOrders: async () => {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.ORDERS);
      console.log("Orders API Response:", response);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to fetch orders",
        error,
      };
    }
  },
};
