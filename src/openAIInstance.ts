import OpenAI from 'openai';
import { config as configDotenv } from 'dotenv';
configDotenv()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || ''
});

export default openai;
