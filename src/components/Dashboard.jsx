import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, CheckCircle, XCircle, AlertCircle, Clock, Upload, Download } from 'lucide-react';
import api from '../services/api';
import URLTable from './URLTable';

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef(null);

  /**
   * Fetch all URLs on component mount
   */
  useEffect(() => {
    fetchURLs();
    fetchStats();
  }, []);

  /**
   * Fetch URLs from API
   */
  const fetchURLs = async () => {
    setLoading(true);
    try {
      const response = await api.getAllURLs();
      setUrls(response.data);
    } catch (error) {
      showMessage('Error fetching URLs', 'error');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch statistics
   */
  const fetchStats = async () => {
    try {
      const response = await api.getStatus();
      setStats(response.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  /**
   * Handle CSV file upload
   */
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.csv')) {
      showMessage('Please upload a CSV file', 'error');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      showMessage('File size must be less than 5MB', 'error');
      return;
    }

    setUploading(true);
    showMessage('Uploading CSV file...', 'info');

    try {
      const response = await api.uploadCSV(file);
      setUrls(response.data);
      showMessage(response.message, 'success');
      await fetchStats();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error uploading file. Please try again.';
      showMessage(errorMessage, 'error');
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  /**
   * Handle CSV download
   */
  const handleDownload = async () => {
    try {
      showMessage('Preparing CSV file for download...', 'info');
      await api.downloadCSV();
      showMessage('CSV file downloaded successfully', 'success');
    } catch (error) {
      showMessage('Error downloading CSV file', 'error');
    }
  };

  /**
   * Trigger manual check
   */
  const handleManualCheck = async () => {
    if (urls.length === 0) {
      showMessage('Please upload a CSV file with URLs first', 'error');
      return;
    }

    setChecking(true);
    showMessage('Check started... This may take a few moments.', 'info');

    try {
      const response = await api.checkURLs();
      setUrls(response.data);
      showMessage(`Check completed at ${response.timestamp}`, 'success');
      await fetchStats();
    } catch (error) {
      showMessage('Error during check. Please try again.', 'error');
    } finally {
      setChecking(false);
    }
  };

  /**
   * Show temporary message
   */
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  /**
   * Get message styling
   */
  const getMessageStyle = () => {
    if (!message) return '';
    switch (message.type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            URL Indexation Checker
          </h1>
          <p className="text-gray-600">
            Monitor Google indexation status of your URLs
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg border ${getMessageStyle()}`}>
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total URLs</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Indexed</p>
                  <p className="text-2xl font-semibold text-green-600">{stats.indexed}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <XCircle className="h-8 w-8 text-red-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Not Indexed</p>
                  <p className="text-2xl font-semibold text-red-600">{stats.notIndexed}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-8 w-8 text-gray-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Invalid</p>
                  <p className="text-2xl font-semibold text-gray-600">{stats.invalid}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Pending</p>
                  <p className="text-2xl font-semibold text-blue-600">{stats.pending}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* File Upload & Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Upload Section */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload CSV File (Max 30 URLs)
              </label>
              <div className="flex items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {uploading && (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                CSV format: URL column required (up to 30 URLs, max 5MB)
              </p>
            </div>

            {/* Download Button */}
            <div className="flex items-end">
              <button
                onClick={handleDownload}
                disabled={urls.length === 0}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">
              🕐 Automatic check runs daily at <span className="font-semibold">9:00 AM IST</span>
            </p>
            {stats && stats.lastCheck !== 'Never' && (
              <p className="text-sm text-gray-500 mt-1">
                Last checked: {stats.lastCheck}
              </p>
            )}
          </div>
          <button
            onClick={handleManualCheck}
            disabled={checking || urls.length === 0}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${checking ? 'animate-spin' : ''}`} />
            {checking ? 'Checking...' : 'Run Check Now'}
          </button>
        </div>

        {/* URL Table */}
        <URLTable urls={urls} loading={loading} />

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>URL Indexation Checker Dashboard</p>
          <p className="mt-1">Monitoring {urls.length} URLs</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;