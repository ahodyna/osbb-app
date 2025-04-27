import express from 'express';
import { users } from '../data/users';

const router = express.Router();

router.post('/login', (req: any, res: any) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    const token = Math.random().toString(36).substring(2);

    if (phoneNumber === '0000000000') {
        users[token] = { phoneNumber, token, isSuperAdmin: true };
    } else {
        users[token] = { phoneNumber, token, isSuperAdmin: false };
    }

    res.json({ token, phoneNumber, isSuperAdmin:  users[token].isSuperAdmin  });
});

export default router;
