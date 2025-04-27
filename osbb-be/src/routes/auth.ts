import express from 'express';
import { users } from '../data/db';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/register', async (req: any, res: any) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    return res.status(400).json({ error: 'Phone number and password are required' });
  }

  if (Object.values(users).some((user) => user.phoneNumber === phoneNumber)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const token = uuidv4();

  users[token] = { phoneNumber, password: hashedPassword, token, isSuperAdmin: false };

  res.json({ token, phoneNumber });
});

// Логін користувача
router.post('/login', async (req: any, res: any) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    return res.status(400).json({ error: 'Phone number and password are required' });
  }

  const user = Object.values(users).find((user) => user.phoneNumber === phoneNumber);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  if (user?.phoneNumber === phoneNumber && user.isSuperAdmin && user.password === password) {
    res.json({ token: user.token, phoneNumber: user.phoneNumber, isSuperAdmin: user.isSuperAdmin });
  }

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ token: user.token, phoneNumber: user.phoneNumber, isSuperAdmin: user.isSuperAdmin });
});

export default router;
