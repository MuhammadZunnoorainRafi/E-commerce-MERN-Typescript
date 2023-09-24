import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes';

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use('/api/auth', authRouter);

app.listen(PORT, () =>
  console.log(`Server is running on : http://localhost:${PORT}`)
);
