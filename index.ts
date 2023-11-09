// index.ts
import express from 'express';
import { config as configDotenv } from 'dotenv';
import routes from './routes';
import "./src/assistant"

configDotenv();

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});