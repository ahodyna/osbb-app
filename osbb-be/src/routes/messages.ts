import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { messages } from '../data/messages';
import { beautifyText } from '../services/openaiService';

const router = express.Router();

router.post('/', authMiddleware, async (req: any, res: any) => {
  const { message } = req.body;
  const { user } = req;

  if (!message) {
    return res.status(400).json({ error: 'Message text is required' });
  }
  let finalText = message;

  if (message) {
    finalText = await beautifyText(message);
  }

  const newMessage = {
    id: messages.length + 1,
    user: user.phoneNumber,
    text: finalText,
    section: 'general',
    timestamp: new Date(),
  };

  res.json({ success: true, message: newMessage });
});

router.get('/', authMiddleware, (req: any, res: any) => {
  const { section } = req.query;

  if (section) {
    const filteredMessages = messages.filter((message) => message.section === section);
    return res.json(filteredMessages);
  }

  res.json(messages);
});

export default router;
