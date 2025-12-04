# LLM Architecture Explorer: The Illusion of Reasoning

Interactive visualization deconstructing the 10 layers of LLM architecture to reveal how "reasoning" is actually a pipeline of statistical pattern matching.

![Project Screenshot](https://github.com/user-attachments/assets/placeholder)

## 🚀 About

This project breaks down the "black box" of Large Language Models into 10 understandable layers. It demonstrates the journey of a user prompt from raw text to final response, highlighting:

*   **System Layers:** Input processing, Retrieval (RAG), Context Injection (MCP), Orchestration.
*   **LLM Internals:** Tokenization, Embeddings, Attention, Prediction, Decoding.

It was built to accompany the article **"The Illusion of Reasoning"**.

> **Note:** This repository is an **illustrative demonstration for divulgation purposes**. The code and data shown are simulated to explain concepts and are not a production-grade LLM inference engine.

## ✨ Features

*   **Interactive Layer Exploration:** Toggle layers on/off to see their specific contribution.
*   **"Try Your Own" Mode:** Input custom prompts and simulate how they flow through the architecture.
*   **Real-time Code & Data Views:** See the simulated Python code and JSON data for every layer.
*   **Responsive Design:** Works seamlessly on desktop and mobile.

## 🛠️ Tech Stack

*   **React** (Vite)
*   **TypeScript**
*   **Tailwind CSS**
*   **Framer Motion** (Animations)
*   **Zustand** (State Management)
*   **Lucide React** (Icons)

## 🏃‍♂️ Running Locally

1.  Clone the repo:
    ```bash
    git clone https://github.com/your-username/illusion-of-reasoning.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start dev server:
    ```bash
    npm run dev
    ```

## 📦 Deployment

This project is configured for easy deployment on **Netlify**.

1.  Build the project:
    ```bash
    npm run build
    ```
2.  Drag the `dist` folder to [Netlify Drop](https://app.netlify.com/drop).

## 📄 License

MIT
