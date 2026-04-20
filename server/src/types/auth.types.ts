export interface GoogleAuthRequest {
  idToken: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
  };
}

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  avatarUrl?: string;
}