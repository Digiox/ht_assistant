import { ThreadMessage, ThreadMessagesPage } from "openai/resources/beta/threads/messages/messages";
import openai from "../openAIInstance";

import * as Core from "openai/src/core";

export const listMessages = async (threadId: string) => {
    try {
        return await openai.beta.threads.messages.list(threadId);
    } catch (error) {
        throw new Error("Unable to list messages: " + error);
    }
}