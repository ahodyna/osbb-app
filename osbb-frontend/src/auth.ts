import { User } from './types';

let currentUser: User | null = null;

export async function login(phone: string): Promise<User> {

  const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber: phone }),
        });

        const user = await res.json();
        currentUser = user;

        localStorage.setItem('token', user.token);
        return user;
}

export function getCurrentUser(): User | null {
    return currentUser;
}
