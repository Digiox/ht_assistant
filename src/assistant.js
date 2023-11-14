"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assistant = void 0;
const openAIInstance_1 = __importDefault(require("./openAIInstance"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
(async () => {
    // const products =  await openai.files.create({
    //     file: fs.createReadStream("datas\\output\\products_export.json"),
    //     purpose: "assistants",
    //   });
    // assistant = await openai.beta.assistants.create({
    //     name: "Assistant Heaven Touch",
    //     instructions: "Tu dois utiliser les données json à ta disposition pour afficher les produits",
    //     tools: [{ type: "code_interpreter" }, {type: "retrieval"}],
    //     model: "gpt-4-1106-preview",
    //     file_ids: [products.id]
    // });
    // console.log(`Assistant created with ID: ${assistant.id}`);
    try {
        exports.assistant = await openAIInstance_1.default.beta.assistants.retrieve("asst_T2bCsger6jxC0skrlHokwB4I");
        if (exports.assistant.id) {
            console.log("Assistant with id " + exports.assistant.id + " retrieved");
        }
    }
    catch (error) {
        console.log("Unable to retrieve assistant: " + error);
    }
})();
