import openai from "../openAIInstance";

export const retrieveRun = async (threadId: string, runId: string) => {
    try {
        return await openai.beta.threads.runs.retrieve(threadId, runId);
    } catch (error) {
        throw new Error("Unable to retrieve run: " + error);
    }
}