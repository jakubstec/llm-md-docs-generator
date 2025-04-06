/*
This script automates the generation of Markdown documentation for an NPM package using the Google GenAI API (Gemini model).

The prompt is structured to maximize LLM effectiveness and ensure consistency of the output by including:
- Clear role assignment (sets the LLM's persona and expertise)
- Contextual awareness (inserts package-specific information)
- Objective definition (clarifies the goal of writing comprehensive docs)
- Structured output specification (guides formatting and content)

----------------------------------------------------
Workflow:
1. Reads the package name from the command line argument.
2. Loads a base prompt from `prompt.txt` and injects the package link.
3. Sends the prompt to Google GenAI's Gemini model to generate documentation.
4. Saves the generated Markdown file to a `docs` folder, named after the sanitized package name.
5. Logs the path of the saved documentation file.

Usage: npm run generate -- <package-name>

*/

import {GoogleGenAI} from '@google/genai';
import fs from 'fs';
import path from 'path';

// load environment variables
const dotenv = require('dotenv');
dotenv.config();

// setup google genai client
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

// Get all command line arguments
const packageName = process.argv[2];

if(!packageName) {
    console.error('Please provide a package name as an argument, e.g. "npm run generate -- @rescui/use-glow-hover"');
    process.exit(1);
}

// Generate documentation for the package
async function main() {
    const packageLink = `https://www.npmjs.com/package/${packageName}`;
    const promptPath = path.join(__dirname, 'prompt_docs.txt');
    const prompt = fs.readFileSync(promptPath, 'utf8');
    const promptWithPackageLink = prompt.replace('${packageLink}', packageLink);
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-001',
        contents: promptWithPackageLink,
    });
    
    const outputDir = path.join(__dirname, '..','docs');
    if(!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const sanitizedPackageName = packageName.replace(/[@/\\]/g, '-');
    const outputPath = path.join(outputDir, sanitizedPackageName + '.md');
    fs.writeFileSync(outputPath, response.text || 'No content generated');
    
    console.log(`Documentation saved to ${outputPath}`);
}

main().catch(error => console.error('Error:', error));