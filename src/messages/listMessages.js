"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMessages = void 0;
const openAIInstance_1 = __importDefault(require("../openAIInstance"));
const listMessages = async (threadId) => {
    try {
        return await openAIInstance_1.default.beta.threads.messages.list(threadId);
    }
    catch (error) {
        throw new Error("Unable to list messages: " + error);
    }
};
exports.listMessages = listMessages;
