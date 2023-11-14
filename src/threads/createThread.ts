
import openai from '../openAIInstance';
export const createThread = async () => {
    try {
        return await openai.beta.threads.create({});
    } catch (error) {
        throw new Error("Unable to create thread: " + error);
    }
}
