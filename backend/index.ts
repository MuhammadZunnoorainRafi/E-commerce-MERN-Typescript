import express, { urlencoded } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`Server is running on : http://localhost:${PORT}`)
);
