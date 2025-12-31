import { httpClient } from '../api/httpClient';
import { UploadResponse, CheckCodeResponse, FileNode } from '../types/dtos';

export const fileService = {
  uploadFiles: async (files: File[], onProgress?: (progress: number) => void): Promise<UploadResponse> => {
    return httpClient.upload<UploadResponse>('/file/upload', files, onProgress);
  },

  checkCode: async (code: string): Promise<CheckCodeResponse> => {
    return httpClient.get<CheckCodeResponse>(`/files/${code}/check`);
  },

  getDownloadUrl: (code: string): string => {
    return httpClient.getUri(`/files/${code}/download`);
  },

  // Mock method to get file structure (replace with real API call later)
  getFileStructure: async (_code: string): Promise<FileNode[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock data based on the code to vary results if needed, or static for now
    return [
      {
        name: 'Documentos',
        type: 'folder',
        date: '2023-12-30',
        path: 'Documentos',
        children: [
          { name: 'Relatório.pdf', type: 'file', size: 2500000, date: '2023-12-29', path: 'Documentos/Relatório.pdf' },
          { name: 'Anotações.txt', type: 'file', size: 1024, date: '2023-12-30', path: 'Documentos/Anotações.txt' },
        ]
      },
      {
        name: 'Imagens',
        type: 'folder',
        date: '2023-12-28',
        path: 'Imagens',
        children: [
          { name: 'Férias', type: 'folder', date: '2023-12-28', path: 'Imagens/Férias', children: [
            { name: 'Praia.jpg', type: 'file', size: 4500000, date: '2023-12-28', path: 'Imagens/Férias/Praia.jpg' },
            { name: 'Hotel.jpg', type: 'file', size: 3200000, date: '2023-12-28', path: 'Imagens/Férias/Hotel.jpg' },
          ]},
          { name: 'Logo.png', type: 'file', size: 150000, date: '2023-12-25', path: 'Imagens/Logo.png' },
        ]
      },
      { name: 'Projeto.zip', type: 'file', size: 15000000, date: '2023-12-30', path: 'Projeto.zip' },
      { name: 'README.md', type: 'file', size: 2048, date: '2023-12-30', path: 'README.md' },
    ];
  }
};
