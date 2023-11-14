"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createThread = void 0;
const openAIInstance_1 = __importDefault(require("../openAIInstance"));
const createThread = async () => {
    try {
        return await openAIInstance_1.default.beta.threads.create({});
    }
    catch (error) {
        throw new Error("Unable to create thread: " + error);
    }
};
exports.createThread = createThread;
