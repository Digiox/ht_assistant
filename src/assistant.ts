import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants/assistants";
import { config as configDotenv } from 'dotenv';
import openai from "./openAIInstance";
import fs from 'fs';
configDotenv()



export let assistant: Assistant;

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
})();
