"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openAIInstance_1 = __importDefault(require("../openAIInstance"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = async (threadId) => {
    if (!process.env.OPENAI_ASSISTANT_ID) {
        throw new Error("OPENAI_ASSISTANT_ID is not defined");
    }
    return await openAIInstance_1.default.beta.threads.runs.create(threadId, {
        assistant_id: process.env.OPENAI_ASSISTANT_ID
    });
};
