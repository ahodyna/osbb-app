import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { messages } from '../data/db';
import { beautifyText } from '../services/openaiService';

const router = express.Router();

router.post('/', authMiddleware, async (req: any, res: any) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message text is required' });
  }

  let finalText = message;

  if (message) {
    finalText = await beautifyText(message);
  }

  return res.json({ success: true, result: finalText });
});

router.get('/', authMiddleware, (req: any, res: any) => {
  const { section } = req.query;

  if (section) {
    const filteredMessages = messages.filter((message) => message.section === section);
    return res.json(filteredMessages);
  }

  return res.json(messages);
});

export default router;
