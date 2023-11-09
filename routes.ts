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
        assistant_id: "asst_3VA5GMNxMQawEymkVhTbaLAE",
        instructions:
            "Adresse toi à l'utilisateur de manière courtoise et inclusive, si l'utilisateur te demande un produit sans préciser quel type de produit il souhaite (Utilisateur à pénis, Utilisateur à vagin, accéssoires), propose lui une liste de type de produits pour que le résultat que tu lui propose soit le plus pertnient possible. Si l'utilisateur est un homme, par défaut tu proposera des produits pour la prostate ou pour le pénis et si c'est une femme des produits pour le vagin et l'anal, je veux que tu lui porpose un produit en particulier qui correspond à sa demande en affichant le nom, je prix et une image",
    });

    let run = await openai.beta.threads.runs.retrieve(thread.id, createdRun.id);

    while (run.status !== "completed") {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Attendre 1 seconde
        run = await openai.beta.threads.runs.retrieve(thread.id, createdRun.id);
    }
    

    const messages = await openai.beta.threads.messages.list(thread.id);
    console.log(messages.data);
    // console.log(thread);
    
    
    res.status(200).send(messages.data);
});

// Ajoutez plus de routes ici

export default router;