// routes.ts
import { Router, Request, Response } from 'express';
import { IAssistantThread } from './types/assistant';
import openai from './src/openAIInstance';
import { MessageCreateParams } from 'openai/resources/beta/threads/messages/messages';
import { assistant } from './src/assistant';
import { APIPromise } from 'openai/core';
import { Run } from 'openai/resources/beta/threads/runs/runs';


const router = Router();

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

    const createdRun = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: "asst_T2bCsger6jxC0skrlHokwB4I"
    });

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

router.post("/assistant/thread/:threadId",async (req, res) => {
    console.log("call")
    const {threadId} = req.params;
    const {runId} = req.body
    console.log(threadId)
    const createdRun = await openai.beta.threads.runs.create(threadId, {
        assistant_id: "asst_T2bCsger6jxC0skrlHokwB4I"
    });
    let run = await openai.beta.threads.runs.retrieve(threadId, createdRun.id);

    while (run.status !== "completed" && run.status !== "failed" && run.status !== "expired") {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Attendre 1 seconde
        run = await openai.beta.threads.runs.retrieve(threadId, createdRun.id);
        console.log("status: " + run.status);
        
    }

    

  

    const messages = await openai.beta.threads.messages.list(threadId);
    console.log(messages.data);
    // console.log(thread);
    
    
    res.status(200).send(messages.data);
})

// Ajoutez plus de routes ici

export default router;