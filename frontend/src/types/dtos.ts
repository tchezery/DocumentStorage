export interface UploadResponse {
  code: string;
  expiresAt: string;
}

export interface FileMetadata {
  filename: string;
  size: number;
  uploadDate: string;
}

export interface CheckCodeResponse {
  valid: boolean;
  files?: FileMetadata[];
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