import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import messageRoutes from './routes/messages';
import sendMessageRoutes from "./routes/sendMessage";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/send-messages', sendMessageRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
