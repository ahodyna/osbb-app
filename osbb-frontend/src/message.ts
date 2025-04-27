import { getCurrentUser } from './auth';
import { Request } from './types';

export async function beautifyMessage(
  message: string
): Promise<{ error?: string; message?: string }> {
  const res = await fetch('http://localhost:3000/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
    body: JSON.stringify({ message }),
  });
  const data = await res.json();

  return data;
}

export async function sendMessage(message: string, section: string): Promise<void> {
  const user = getCurrentUser();
  if (!user) throw new Error('Користувач не авторизований');

  await fetch('http://localhost:3000/api/send-messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
    body: JSON.stringify({ userId: user.id, message, section }),
  });
}
