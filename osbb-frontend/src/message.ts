import { getCurrentUser } from './auth';

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
  return res.json();
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
