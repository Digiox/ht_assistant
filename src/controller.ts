import createRun from "./runs/createRun"
import { Request, Response } from 'express';
import { createThread } from "./threads/createThread";
import { createMessage } from "./messages/createMessage";
import { retrieveRun } from "./runs/retrieveRun";
import { listMessages } from "./messages/listMessages";

export const createRunController = async (req: Request, res: Response) => {
    const { threadId } = req.params;
    if (!threadId) {
        return res.status(400).send("threadId is required")

    }
    return createRun(req.params.threadId)
        .then((run) => {
            console.log("Run created: " + run.id);
            res.status(200).send(run)
        })
        .catch((error) => {
            console.error("Something went wrong: " + error)
            res.status(500).send(error)
        })
}

export const createThreadController = async (req: Request, res: Response) => {
    createThread()
        .then((thread) => {
            console.log("Thread created: " + thread.id);
            res.status(200).send(thread)
        })
        .catch((error) => {
            console.error("Something went wrong: " + error)
            res.status(500).send(error)
        })
}

export const createMessageController = async (req: Request, res: Response) => {

    const { threadId } = req.params;
    const { content, role } = req.body;
    if (!threadId) {
        return res.status(400).send("threadId is required")

    }
    if (!content) {
        return res.status(400).send("content is required")

    }
    if (!role) {
        return res.status(400).send("role is required")
    }

    createMessage(req.params.threadId, req.body)
        .then((message) => {
            console.log("Message created: " + message.id);
            res.status(200).send(message)
        })
        .catch((error) => {
            console.error("Something went wrong: " + error)
            res.status(500).send(error)
        })

}

export const retrieveRunController = async (req: Request, res: Response) => {
    const { threadId, runId, status } = req.params;
    if (!threadId) {
        return res.status(400).send("threadId is required")

    }
    if (!runId) {
        return res.status(400).send("runId is required")

    }

    if (status) {
        let run = await retrieveRun(threadId, runId);
        while (run.status !== status) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Attendre 1 seconde
            run = await retrieveRun(threadId, runId);
        }

        if (run.status === status) {
            console.log("Successfully retrieved run with status: " + status)
            res.status(200).send(run);
        }
    }else {
        return retrieveRun(threadId, runId)
        .then((run) => {
            console.log("Run retrieved: " + run.id);
            res.status(200).send(run)
        })
        .catch((error) => {
            console.error("Something went wrong: " + error)
            res.status(500).send(error)
        })
    }
   
}

export const listMessagesController = async (req: Request, res: Response) => {
    const { threadId } = req.params;
    if (!threadId) {
        return res.status(400).send("threadId is required")

    }
    return listMessages(threadId)
        .then((messages) => {
            console.log("Messages retrieved: " + messages.data);
            res.status(200).send(messages.data)
        })
        .catch((error) => {
            console.error("Something went wrong: " + error)
            res.status(500).send(error)
        })
}
