// routes.ts
import { Router, Request, Response } from 'express';
import { IAssistantThread } from './types/assistant';
import openai from './src/openAIInstance';
import { MessageCreateParams } from 'openai/resources/beta/threads/messages/messages';
import { assistant } from './src/assistant';
import { APIPromise } from 'openai/core';
import { Run } from 'openai/resources/beta/threads/runs/runs';

import { config as configDotenv } from 'dotenv';
import {createMessageController, createRunController, createThreadController, listMessagesController, retrieveRunController} from "./src/controller"
configDotenv()

const router = Router();
//Runs
router.post('/assistant/run/:threadId', createRunController);
router.get('/assistant/run/:threadId/:runId', retrieveRunController);

//Threads
router.post('/assistant/thread', createThreadController)

//Messages
router.post('/assistant/message/:threadId', createMessageController)
router.get('/assistant/message/:threadId', listMessagesController);

router.post('/assistant/thread', async (req: Request, res: Response) => {
    const body: IAssistantThread = req.body;

    if (!body.role || !body.content) {
        res.status(400).send('Le rôle et le contenu sont requis.');
        return;
    }

    const thread = await openai.beta.threads.create({});
    const message = await openai.beta.threads.messages.create(
        thread.id,
        body as MessageCreateParams
    );

 

    let run = await openai.beta.threads.runs.retrieve(thread.id, createdRun.id);

    while (run.status !== "completed" && run.status !== "failed" && run.status !== "expired") {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Attendre 1 seconde
        run = await openai.beta.threads.runs.retrieve(thread.id, createdRun.id);
    }

    if (run.status === "completed") {
        console.log("Request successfull")
    }

    if (run.status === "failed") {
        console.log("Request failed")
    }

    if (run.status === "expired") {
        console.log("Request expired")
    }

    const messages = await openai.beta.threads.messages.list(thread.id);
    console.log(messages.data);
    // console.log(thread);


    res.status(200).send(messages.data);
});

router.post("/assistant/thread/:threadId", async (req, res) => {
    console.log("call")
    const { threadId } = req.params;
    const { content, role } = req.body
    console.log(threadId)

    await openai.beta.threads.messages.create(
        threadId,
        { role: role, content: content } as MessageCreateParams
    );
    const createdRun = await openai.beta.threads.runs.create(threadId, {
        assistant_id: "asst_T2bCsger6jxC0skrlHokwB4I"
    });
    let run = await openai.beta.threads.runs.retrieve(threadId, createdRun.id);
    

    while (run.status !== "completed" && run.status !== "failed" && run.status !== "expired") {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Attendre 1 seconde
        run = await openai.beta.threads.runs.retrieve(threadId, createdRun.id);
        console.log("status: " + run.status);
        console.log("action: " + run.required_action)

    }





    const messages = await openai.beta.threads.messages.list(threadId);
    console.log(messages.data);
    // console.log(thread);


    res.status(200).send(messages.data);
})

// Ajoutez plus de routes ici

export default router;