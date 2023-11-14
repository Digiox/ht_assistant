"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveRun = void 0;
const openAIInstance_1 = __importDefault(require("../openAIInstance"));
const retrieveRun = async (threadId, runId) => {
    try {
        return await openAIInstance_1.default.beta.threads.runs.retrieve(threadId, runId);
    }
    catch (error) {
        throw new Error("Unable to retrieve run: " + error);
    }
};
exports.retrieveRun = retrieveRun;
