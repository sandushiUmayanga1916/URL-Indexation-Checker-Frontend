import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = {
  /**
   * Get all URLs
   */
  getAllURLs: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/urls`);
      return response.data;
    } catch (error) {
      console.error('Error fetching URLs:', error);
      throw error;
    }
  },

  /**
   * Trigger manual indexation check
   */
  checkURLs: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/urls/check`);
      return response.data;
    } catch (error) {
      console.error('Error checking URLs:', error);
      throw error;
    }
  },

  /**
   * Get check status and statistics
   */
  getStatus: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/urls/status`);
      return response.data;
    } catch (error) {
      console.error('Error fetching status:', error);
      throw error;
    }
  }
};

export default api;