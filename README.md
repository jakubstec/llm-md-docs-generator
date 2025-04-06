<h3 align="center">AI Documentation Generator</h3>

<div align="center">
</div>

---

<p align="center"> An automated documentation and test suite generator for NPM packages that leverages Google's Gemini AI to create comprehensive, professional documentation and tests with minimal effort.
    <br> 
</p>

## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Installing](#installing)
- [Usage](#usage)
- [Features](#features)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name="about"></a>
This project streamlines the documentation process for NPM packages by using Google's Gemini AI model to automatically generate comprehensive documentation and test suites. By simply providing a package name, the tool analyzes the package and creates well-structured Markdown documentation and testing guidelines, saving developers significant time and ensuring consistency across projects.

## 🏁 Getting Started <a name="getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for documentation and test generation.

### Prerequisites

- Google Gemini API Key
```
https://aistudio.google.com/app/apikey
```

```
Node.js, npm
```

## 🔧 Installing <a name="installing"></a>
- Clone the project
```
git clone https://github.com/jakubstec/llm-md-docs-generator.git
```

- Navigate to the project directory
```
cd llm-md-docs-generator
```

- Install dependencies
```
npm install
```

- Change the name of .env_sample file to .env and add your Google Gemini API key
```
GEMINI_API_KEY=YOUR_API_KEY_HERE
```

## 🎈 Usage <a name="usage"></a>

### Generating Documentation
To generate documentation for an NPM package:
```
npm run generate -- <package-name>
```

Example:
```
npm run generate -- @rescui/use-glow-hover
```

This will create a comprehensive Markdown document in the `docs` folder named after the sanitized package name.

### Generating Test Suites
To generate test suites for an NPM package:
```
npm run generate-tests -- <package-name>
```

Example:
```
npm run generate-tests -- @rescui/use-glow-hover
```

This will create test guidelines in the `tests` folder named after the sanitized package name.

## ✨ Features <a name="features"></a>

### Documentation Generator
- Comprehensive markdown documentation with:
  - Introduction and overview
  - Installation instructions
  - Detailed API reference tables
  - Usage examples with code snippets
  - Configuration options
  - Browser compatibility information
  - Dependencies list
  - Troubleshooting guidance

### Test Suite Generator
- Generates test suites covering:
  - Unit tests
  - Component tests
  - Visual tests
  - Accessibility tests
- Provides meaningful, maintainable test patterns
- Leverages existing documentation for context

## ⛏️ Built Using <a name="built_using"></a>
- [Node.js](https://nodejs.org/) - JavaScript Runtime
- [Google Gemini AI](https://ai.google.dev/) - AI Model
- [TypeScript](https://www.typescriptlang.org/) - Programming Language

## ✍️ Authors <a name="authors"></a>
- [Jakub Steć](https://github.com/jakubstec)
