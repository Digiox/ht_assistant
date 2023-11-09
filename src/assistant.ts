import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants/assistants";
import { config as configDotenv } from 'dotenv';
import openai from "./openAIInstance";
import fs from 'fs';
configDotenv()



export let assistant: Assistant;

(async () => {
    const products =  await openai.files.create({
        file: fs.createReadStream("datas\\products_export.csv"),
        purpose: "assistants",
      });
    assistant = await openai.beta.assistants.create({
        name: "Assistant Heaven Touch",
        instructions: "Affiche les images des produits avec du markdown en utilisant le colonne 'Image src' du product_export.csv à ta disposition.",
        tools: [{ type: "code_interpreter" }],
        model: "gpt-4-1106-preview",
        file_ids: [products.id]
    });
    console.log(`Assistant created with ID: ${assistant.id}`);
})();
