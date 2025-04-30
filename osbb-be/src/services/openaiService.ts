require('dotenv').config();
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function beautifyText(text: string): Promise<string> {
  const prompt = `
   Переформулюй українською мовою наведене звернення, зробивши його офіційнішим і більш зрозумілим, але обмежся 2–3 реченнями: "${text}".
   Також визнач, до якої з наступних секцій належить це звернення (одну з): technical, administrative, complaints, service-request, general, urgent, meeting.
   Поверни відповідь у форматі JSON:
  {
    "section": "назва_секції",
    "message": "переформульоване_повідомлення"
  }
`;

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  return response.choices[0]?.message.content || text;
}
