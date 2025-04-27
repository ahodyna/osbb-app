require('dotenv').config();
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function beautifyText(text: string): Promise<string> {
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `Переформулюй наведене звернення, зробивши його офіційнішим і більш зрозумілим, але обмежся 2–3 реченнями: "${text}"`,
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  return response.choices[0]?.message.content || text;
}
