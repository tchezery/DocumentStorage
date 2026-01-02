import { httpClient } from '../api/httpClient';
import { UploadResponse, FileNode } from '../types/dtos';

export const fileService = {
  uploadFiles: async (files: File[], onProgress?: (progress: number) => void): Promise<UploadResponse> => {
    return httpClient.upload<UploadResponse>('/file/upload', files, onProgress);
  },

  downloadFile: async (code: string): Promise<Blob> => {
    return httpClient.download(`/file/download/${code}`);
  },

  getFileInfo: async (code: string): Promise<FileNode[]> => {
    // This expects the backend to implement GET /file/info/{code} returning FileNode[]
    return httpClient.get<FileNode[]>(`/file/info/${code}`);
  }
};