export interface User {
  id: string;
  phone: string;
  token: string;
  isSuperAdmin: boolean;
  error?: string;
}
