import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const httpClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await api.get<T>(endpoint);
    return response.data;
  },

  post: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await api.post<T>(endpoint, data);
    return response.data;
  },

  upload: async <T>(endpoint: string, files: File[], onProgress?: (progress: number) => void): Promise<T> => {
    const formData = new FormData();
    files.forEach(file => formData.append('file', file));

    const response = await api.post<T>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentComplete = (progressEvent.loaded / progressEvent.total) * 100;
          onProgress(percentComplete);
        }
      },
    });

    return response.data;
  },

  uploadWithPaths: async <T>(endpoint: string, files: File[], paths: string[], onProgress?: (progress: number) => void): Promise<T> => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    paths.forEach(path => formData.append('paths', path));

    const response = await api.post<T>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentComplete = (progressEvent.loaded / progressEvent.total) * 100;
          onProgress(percentComplete);
        }
      },
    });

    return response.data;
  },

  getUri: (endpoint: string): string => {
    return `${BASE_URL}${endpoint}`;
  },

  download: async (endpoint: string): Promise<Blob> => {
    const response = await api.get(endpoint, {
      responseType: 'blob',
    });
    return response.data;
  }
};