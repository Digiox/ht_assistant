"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assistant = void 0;
const dotenv_1 = require("dotenv");
const openAIInstance_1 = __importDefault(require("./openAIInstance"));
const fs_1 = __importDefault(require("fs"));
(0, dotenv_1.config)();
(async () => {
    const products = await openAIInstance_1.default.files.create({
        file: fs_1.default.createReadStream("datas\\products_export.csv"),
        purpose: "assistants",
    });
    exports.assistant = await openAIInstance_1.default.beta.assistants.create({
        name: "Assistant Heaven Touch",
        instructions: "Affiche les images des produits avec du markdown en utilisant le colonne 'Image src' du product_export.csv à ta disposition.",
        tools: [{ type: "code_interpreter" }],
        model: "gpt-4-1106-preview",
        file_ids: [products.id]
    });
    console.log(`Assistant created with ID: ${exports.assistant.id}`);
})();
