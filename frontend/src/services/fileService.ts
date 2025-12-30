import { httpClient } from '../api/httpClient';
import { UploadResponse, CheckCodeResponse } from '../types/dtos';

export const fileService = {
  uploadFiles: async (files: File[], onProgress?: (progress: number) => void): Promise<UploadResponse> => {
    return httpClient.upload<UploadResponse>('/upload', files, onProgress);
  },

  checkCode: async (code: string): Promise<CheckCodeResponse> => {
    return httpClient.get<CheckCodeResponse>(`/files/${code}/check`);
  },

  getDownloadUrl: (code: string): string => {
    return httpClient.getUri(`/files/${code}/download`);
  }
};
