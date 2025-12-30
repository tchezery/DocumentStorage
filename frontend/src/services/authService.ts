import { httpClient } from '../api/httpClient';
import { LoginResponse, RegisterData } from '../types/dtos';

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    return httpClient.post<LoginResponse>('/auth/login', { email, password });
  },

  register: async (data: RegisterData): Promise<LoginResponse> => {
    return httpClient.post<LoginResponse>('/auth/register', data);
  }
};