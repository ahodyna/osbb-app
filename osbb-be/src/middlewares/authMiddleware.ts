import { users } from '../data/users';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];

    console.log('req.headers.authorization',req.headers.authorization)

    if (!token || !users[token]) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = users[token];
    next();
};
