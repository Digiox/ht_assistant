import openai from "../openAIInstance";

export const createMessage = async (threadId: string, message: IMessage) => {
    try {
        return await openai.beta.threads.messages.create(threadId, message);
    } catch (error) {
        throw new Error("Unable to create message: " + error);
    }
}