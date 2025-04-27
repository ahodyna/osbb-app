import { getCurrentUser } from './auth';
import { Request } from './types';

export async function beautifyMessage(message: string): Promise<string> {
    const res = await fetch('http://localhost:3000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${localStorage.getItem('token') || ''}` },
        body: JSON.stringify({ message }),
    });
    const data = await res.json();
    return data.beautifiedMessage;
}

export async function sendMessage(message: string, beautifiedMessage: string): Promise<void> {
    const user = getCurrentUser();
    if (!user) throw new Error('Користувач не авторизований');

    await fetch('http://localhost:3000/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, message, beautifiedMessage }),
    });
}

export async function getAllRequests(): Promise<Request[]> {
    const res = await fetch('http://localhost:3000/api/request');
    return await res.json();
}
