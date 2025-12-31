export interface UploadResponse {
  code: string;
  expiresAt: string;
}

export type FileType = 'file' | 'folder';

export interface FileNode {
  name: string;
  type: FileType;
  size?: number; // Optional for folders
  date: string;
  children?: FileNode[]; // Only for folders
  path: string; // Full path for download/navigation
}

export interface FileMetadata {
  filename: string;
  size: number;
  uploadDate: string;
}

export interface CheckCodeResponse {
  valid: boolean;
  files?: FileMetadata[];
  structure?: FileNode[]; // Added for browser
  expiresAt?: string;
  downloadUrl?: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}