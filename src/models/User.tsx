export interface User {
    uid: string;
    email: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}
  