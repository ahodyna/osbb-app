import { User } from './types';

let currentUser: User | null = null;

export async function login(phone: string, password: string): Promise<User> {
  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber: phone, password }),
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    currentUser = data;
  }
  return data;
}

export async function register(phone: string, password: string): Promise<User> {
  const res = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber: phone, password }),
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    currentUser = data;
  }
  return data;
}

export function logout() {
  localStorage.removeItem('token');
  window.location.reload();
}

export function getCurrentUser(): User | null {
  return currentUser;
}
