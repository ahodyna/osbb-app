import express from 'express';
import { users } from '../data/users';

const router = express.Router();

router.post('/login', (req: any, res: any) => {
    const { phoneNumber } = req.body;
    console.log(phoneNumber);

    if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    const token = Math.random().toString(36).substring(2);

    users[token] = { phoneNumber, token};

    res.json({ token });
});

export default router;
