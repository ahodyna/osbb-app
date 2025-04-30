import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { messages } from '../data/db';

const router = express.Router();

router.post('/', authMiddleware, async (req: any, res: any) => {
  const { message, section } = req.body;
  const { user } = req;

  if (!message) {
    return res.status(400).json({ error: 'Message text is required' });
  }

  if (!section) {
    return res.status(400).json({ error: 'Section is required' });
  }

  const newMessage = {
    id: messages.length + 1,
    user: user.phoneNumber,
    text: message,
    section: section,
    timestamp: new Date(),
  };

  messages.push(newMessage);

  return res.json({ success: true });
});

export default router;
