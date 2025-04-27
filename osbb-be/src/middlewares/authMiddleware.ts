import { users } from '../data/db';

export const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token || !users[token]) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.user = users[token];

  if (req.user.isSuperAdmin) {
    req.isSuperAdmin = true;
  }

  next();
};
