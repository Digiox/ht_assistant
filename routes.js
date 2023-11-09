"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes.ts
const express_1 = require("express");
const openAIInstance_1 = __importDefault(require("./src/openAIInstance"));
const router = (0, express_1.Router)();
router.post('/assistant/thread', async (req, res) => {
    const body = req.body;
    if (!body.role || !body.content) {
        res.status(400).send('Le rôle et le contenu sont requis.');
        return;
    }
    const thread = await openAIInstance_1.default.beta.threads.create({});
    const message = await openAIInstance_1.default.beta.threads.messages.create(thread.id, body);
    const createdRun = await openAIInstance_1.default.beta.threads.runs.create(thread.id, {
        assistant_id: "asst_3VA5GMNxMQawEymkVhTbaLAE",
        instructions: "Adresse toi à l'utilisateur de manière courtoise et inclusive, si l'utilisateur te demande un produit sans préciser quel type de produit il souhaite (Utilisateur à pénis, Utilisateur à vagin, accéssoires), propose lui une liste de type de produits pour que le résultat que tu lui propose soit le plus pertnient possible. Si l'utilisateur est un homme, par défaut tu proposera des produits pour la prostate ou pour le pénis et si c'est une femme des produits pour le vagin et l'anal, je veux que tu lui porpose un produit en particulier qui correspond à sa demande en affichant le nom, je prix et une image",
    });
    let run = await openAIInstance_1.default.beta.threads.runs.retrieve(thread.id, createdRun.id);
    while (run.status !== "completed") {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Attendre 1 seconde
        run = await openAIInstance_1.default.beta.threads.runs.retrieve(thread.id, createdRun.id);
    }
    const messages = await openAIInstance_1.default.beta.threads.messages.list(thread.id);
    console.log(messages.data);
    // console.log(thread);
    res.status(200).send(messages.data);
});
// Ajoutez plus de routes ici
exports.default = router;
