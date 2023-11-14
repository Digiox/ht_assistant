"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes.ts
const express_1 = require("express");
const openAIInstance_1 = __importDefault(require("./src/openAIInstance"));
const dotenv_1 = require("dotenv");
const controller_1 = require("./src/controller");
(0, dotenv_1.config)();
const router = (0, express_1.Router)();
//Runs
router.post('/assistant/run/:threadId', controller_1.createRunController);
router.get('/assistant/run/:threadId/:runId', controller_1.retrieveRunController);
//Threads
router.post('/assistant/thread', controller_1.createThreadController);
//Messages
router.post('/assistant/message/:threadId', controller_1.createMessageController);
router.get('/assistant/message/:threadId', controller_1.listMessagesController);
router.post('/assistant/thread', async (req, res) => {
    const body = req.body;
    if (!body.role || !body.content) {
        res.status(400).send('Le rôle et le contenu sont requis.');
        return;
    }
    const thread = await openAIInstance_1.default.beta.threads.create({});
    const message = await openAIInstance_1.default.beta.threads.messages.create(thread.id, body);
    let run = await openAIInstance_1.default.beta.threads.runs.retrieve(thread.id, createdRun.id);
    while (run.status !== "completed" && run.status !== "failed" && run.status !== "expired") {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Attendre 1 seconde
        run = await openAIInstance_1.default.beta.threads.runs.retrieve(thread.id, createdRun.id);
    }
    if (run.status === "completed") {
        console.log("Request successfull");
    }
    if (run.status === "failed") {
        console.log("Request failed");
    }
    if (run.status === "expired") {
        console.log("Request expired");
    }
    const messages = await openAIInstance_1.default.beta.threads.messages.list(thread.id);
    console.log(messages.data);
    // console.log(thread);
    res.status(200).send(messages.data);
});
router.post("/assistant/thread/:threadId", async (req, res) => {
    console.log("call");
    const { threadId } = req.params;
    const { content, role } = req.body;
    console.log(threadId);
    await openAIInstance_1.default.beta.threads.messages.create(threadId, { role: role, content: content });
    const createdRun = await openAIInstance_1.default.beta.threads.runs.create(threadId, {
        assistant_id: "asst_T2bCsger6jxC0skrlHokwB4I"
    });
    let run = await openAIInstance_1.default.beta.threads.runs.retrieve(threadId, createdRun.id);
    while (run.status !== "completed" && run.status !== "failed" && run.status !== "expired") {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Attendre 1 seconde
        run = await openAIInstance_1.default.beta.threads.runs.retrieve(threadId, createdRun.id);
        console.log("status: " + run.status);
        console.log("action: " + run.required_action);
    }
    const messages = await openAIInstance_1.default.beta.threads.messages.list(threadId);
    console.log(messages.data);
    // console.log(thread);
    res.status(200).send(messages.data);
});
// Ajoutez plus de routes ici
exports.default = router;
