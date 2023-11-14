
import { IAssistantThread } from '../../types/assistant';
import openai from '../openAIInstance';
import dotenv from 'dotenv';
dotenv.config();
export default async (threadId: string) => {

    if (!process.env.OPENAI_ASSISTANT_ID) {
        throw new Error("OPENAI_ASSISTANT_ID is not defined");
    }
    
    return await openai.beta.threads.runs.create(threadId, {
        assistant_id: process.env.OPENAI_ASSISTANT_ID
    });
}