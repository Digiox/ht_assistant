"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMessagesController = exports.retrieveRunController = exports.createMessageController = exports.createThreadController = exports.createRunController = void 0;
const createRun_1 = __importDefault(require("./runs/createRun"));
const createThread_1 = require("./threads/createThread");
const createMessage_1 = require("./messages/createMessage");
const retrieveRun_1 = require("./runs/retrieveRun");
const listMessages_1 = require("./messages/listMessages");
const createRunController = async (req, res) => {
    const { threadId } = req.params;
    if (!threadId) {
        return res.status(400).send("threadId is required");
    }
    return (0, createRun_1.default)(req.params.threadId)
        .then((run) => {
        console.log("Run created: " + run.id);
        res.status(200).send(run);
    })
        .catch((error) => {
        console.error("Something went wrong: " + error);
        res.status(500).send(error);
    });
};
exports.createRunController = createRunController;
const createThreadController = async (req, res) => {
    (0, createThread_1.createThread)()
        .then((thread) => {
        console.log("Thread created: " + thread.id);
        res.status(200).send(thread);
    })
        .catch((error) => {
        console.error("Something went wrong: " + error);
        res.status(500).send(error);
    });
};
exports.createThreadController = createThreadController;
const createMessageController = async (req, res) => {
    const { threadId } = req.params;
    const { content, role } = req.body;
    if (!threadId) {
        return res.status(400).send("threadId is required");
    }
    if (!content) {
        return res.status(400).send("content is required");
    }
    if (!role) {
        return res.status(400).send("role is required");
    }
    (0, createMessage_1.createMessage)(req.params.threadId, req.body)
        .then((message) => {
        console.log("Message created: " + message.id);
        res.status(200).send(message);
    })
        .catch((error) => {
        console.error("Something went wrong: " + error);
        res.status(500).send(error);
    });
};
exports.createMessageController = createMessageController;
const retrieveRunController = async (req, res) => {
    const { threadId, runId, status } = req.params;
    if (!threadId) {
        return res.status(400).send("threadId is required");
    }
    if (!runId) {
        return res.status(400).send("runId is required");
    }
    if (status) {
        let run = await (0, retrieveRun_1.retrieveRun)(threadId, runId);
        while (run.status !== status) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Attendre 1 seconde
            run = await (0, retrieveRun_1.retrieveRun)(threadId, runId);
        }
        if (run.status === status) {
            console.log("Successfully retrieved run with status: " + status);
            res.status(200).send(run);
        }
    }
    else {
        return (0, retrieveRun_1.retrieveRun)(threadId, runId)
            .then((run) => {
            console.log("Run retrieved: " + run.id);
            res.status(200).send(run);
        })
            .catch((error) => {
            console.error("Something went wrong: " + error);
            res.status(500).send(error);
        });
    }
};
exports.retrieveRunController = retrieveRunController;
const listMessagesController = async (req, res) => {
    const { threadId } = req.params;
    if (!threadId) {
        return res.status(400).send("threadId is required");
    }
    return (0, listMessages_1.listMessages)(threadId)
        .then((messages) => {
        console.log("Messages retrieved: " + messages.data);
        res.status(200).send(messages.data);
    })
        .catch((error) => {
        console.error("Something went wrong: " + error);
        res.status(500).send(error);
    });
};
exports.listMessagesController = listMessagesController;
