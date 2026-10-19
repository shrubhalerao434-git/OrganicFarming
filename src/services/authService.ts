import { api } from './api';

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  token: string;
}

export const authService = {
  /** Login with email + password — returns user with JWT token */
  login: (input: LoginInput) => api.post<AuthUser>('/auth/login', input),

  /** Register a new account */
  register: (input: RegisterInput) => api.post<AuthUser>('/auth/register', input),
};
