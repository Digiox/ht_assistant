"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = void 0;
const openAIInstance_1 = __importDefault(require("../openAIInstance"));
const createMessage = async (threadId, message) => {
    try {
        return await openAIInstance_1.default.beta.threads.messages.create(threadId, message);
    }
    catch (error) {
        throw new Error("Unable to create message: " + error);
    }
};
exports.createMessage = createMessage;
