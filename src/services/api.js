import axios from 'axios';

const API_BASE_URL = 'https://url-indexation-checker-backend-lg6n.vercel.app/api';

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
   * Upload CSV file with URLs
   */
  uploadCSV: async (file) => {
    try {
      const formData = new FormData();
      formData.append('csvFile', file);

      const response = await axios.post(`${API_BASE_URL}/urls/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error uploading CSV:', error);
      throw error;
    }
  },

  /**
   * Download CSV file with current URLs
   */
  downloadCSV: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/urls/download`, {
        responseType: 'blob'
      });

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `url-indexation-report-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Error downloading CSV:', error);
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