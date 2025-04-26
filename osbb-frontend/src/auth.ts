import { User } from './types';

let currentUser: User | null = null;

export async function login(phone: string): Promise<User> {
    const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
    });
    const user = await res.json();
    currentUser = user;
    return user;
}

export function getCurrentUser(): User | null {
    return currentUser;
}
