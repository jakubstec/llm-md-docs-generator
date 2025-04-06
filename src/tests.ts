/*
Generate test suite for React hooks based on a prompt

This script automates the generation of test suites for React hooks using the Google GenAI API (Gemini model).

The prompt is structured to maximize LLM effectiveness and ensure comprehensive test coverage by including:
- Clear role assignment (sets the LLM's persona as a React testing expert)
- Contextual awareness (inserts package-specific information and documentation)
- Test objectives and types (unit, component, visual, and accessibility tests)
- Quality requirements and output format specifications

----------------------------------------------------
Workflow:
1. Reads the package name from the command line argument.
2. Loads a base prompt from `prompt_tests.txt` and injects the package link.
3. Reads package documentation from the docs folder to provide context.
4. Sends the prompt to Google GenAI's Gemini model to generate test suite.
5. Saves the generated test files to a `tests` folder, named after the sanitized package name.
6. Logs the path of the saved test files.

Usage: npm run generate-tests -- <package-name>
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
    console.error('Please provide a package name as an argument, e.g. "npm run generate-tests -- @rescui/use-glow-hover"');
    process.exit(1);
}

// Generate test suite for the package
async function main() {
    const packageLink = `https://www.npmjs.com/package/${packageName}`;
    const promptPath = path.join(__dirname, 'prompt_tests.txt');
    let prompt = fs.readFileSync(promptPath, 'utf8');
    

    prompt = prompt.replace('${packageLink}', packageLink);
    
    const sanitizedPackageName = packageName.replace(/[@/\\]/g, '-');
    const docsPath = path.join(__dirname, '..', 'docs', `${sanitizedPackageName}.md`);
    
    let packageDocs = 'does not exist';
    if (fs.existsSync(docsPath)) {
        packageDocs = fs.readFileSync(docsPath, 'utf8');
    } else {
        console.warn(`Documentation file not found at ${docsPath}.`);
    }

    
    prompt = prompt.replace('${packageDocs}', packageDocs);
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-001',
        contents: prompt,
    });
    
    const outputDir = path.join(__dirname, '..', 'tests');
    if(!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    
    const outputPath = path.join(outputDir, `${sanitizedPackageName}.md`);
    fs.writeFileSync(outputPath, response.text || 'No content generated');
    
    console.log(`Test suite saved to ${outputPath}`);
}

main().catch(error => console.error('Error:', error));