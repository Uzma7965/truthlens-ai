# 🔎 TruthLens AI

**TruthLens AI** is an AI-powered fact-checking and news verification application designed to help users analyze claims and discover reliable information from the web.

Instead of relying only on AI's existing knowledge, TruthLens combines **AI-powered analysis with real-time web search** to help users investigate information and make more informed judgments about online claims.

## ✨ Features

* 🔍 **Claim Verification** — Analyze a claim or piece of information.
* 🤖 **AI-Powered Analysis** — Uses Google's Gemini AI to process and analyze information.
* 🌐 **Web Search** — Uses SerpApi to retrieve relevant information from the web.
* 📰 **News Verification** — Helps users investigate news and potentially misleading claims.
* 📊 **Clear Results** — Presents the analysis in an easy-to-understand interface.
* 📱 **Responsive Interface** — Designed to work across different screen sizes.

## 🛠️ Tech Stack

* **Frontend:** React
* **Backend:** Node.js + Express
* **AI:** Google Gemini API
* **Search:** SerpApi
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Animations:** Motion
* **Language:** TypeScript / JavaScript
* **Deployment:** Render
* **Version Control:** GitHub

## 🏗️ How It Works

```text
User enters a claim
        ↓
TruthLens processes the request
        ↓
SerpApi searches the web
        ↓
Relevant information is collected
        ↓
Gemini AI analyzes the information
        ↓
TruthLens presents the result
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Git

You will also need API keys for:

* Google Gemini
* SerpApi

### Installation

Clone the repository:

```bash
git clone https://github.com/Uzma7965/truthlens-ai.git
```

Move into the project directory:

```bash
cd truthlens-ai
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root and add the API keys required by the application.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key
SERPAPI_KEY=your_serpapi_api_key
```

> **Important:** Never commit your actual API keys to GitHub. Add `.env` to your `.gitignore` file.

### Run Locally

Start the development server:

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## 🌐 Deployment

TruthLens AI can be deployed as a **https://truthlens-ai-8lfn.onrender.com**.

Recommended Render configuration:

```text
Build Command: npm install && npm run build
Start Command: npm start
```

Add your API keys as **Environment Variables** in Render rather than putting them directly in your source code.

## 🔐 Security

API keys should never be exposed in the source code or committed to the GitHub repository.

For production deployments, store sensitive credentials using environment variables provided by the hosting platform.

## 🎯 Project Purpose

TruthLens AI was created as a hackathon project to explore how **AI and real-time web search can work together to help people investigate online information and news claims**.

The goal is not simply to generate an AI answer, but to support the verification process with information retrieved from the web.

## 📌 Project Status

🚧 **Hackathon Project — Development**

https://truthlens-ai-8lfn.onrender.com

## 👩‍💻 Author

**Uzma Batool**

Built as part of an AI/API-focused hackathon project.

---

⭐ If you find TruthLens AI interesting, consider giving the repository a star!
