require('dotenv').config();
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function beautifyText(text: string): Promise<string> {
    const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `Переформулюй офіційніше це звернення: "${text}". Має бути заголовок та тип звернення та сам текст, але не більше 5 речень` }],
        model: 'gpt-3.5-turbo',
    });


    return response.choices[0]?.message.content || text;
}
