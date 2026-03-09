# SmartStore AI - Intelligent E-Commerce Platform

This is a modern e-commerce application built with Next.js, featuring an integrated AI Shopping Assistant powered by the Google Gemini API.

> **Note:** This repository also serves as the submission for **Homework 2: Website Development & AI Agent Planning**. 

📄 **[View the AI Agent Planning Document here](./AI_Agent_Planning_Document.md)**

Website's Demo : https://advanced-web-project-talat.vercel.app/

---

## 🚀 Core Features

*   **Secure JWT Authentication:** Token-based login system with role detection and expiration handling.
*   **Per-User Data Isolation:** Users only see catalogs and products assigned to their account.
*   **AI Shopping Assistant:** Integrated Gemini 2.0 Flash LLM acting as a technical advisor.
*   **Enterprise-Grade AI Security:** 
    *   Prompt Injection protection against 30+ known attack vectors.
    *   SQL Injection detection.
    *   Competitor query filtering to protect business data.
    *   Strict system prompting to ensure the AI only knows the current store's catalog.
*   **Dynamic Product Catalog:** Search, filtering, and sorting capabilities.

## 🛠️ Technologies Used

*   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
*   **Frontend Library:** [React](https://reactjs.org/)
*   **Styling:** Vanilla CSS / CSS Modules with modern Glassmorphism UI
*   **Authentication:** [jsonwebtoken (JWT)](https://github.com/auth0/node-jsonwebtoken)
*   **AI Integration:** [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) (Gemini API)

---

## ⚙️ Setup and Run Instructions

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
Clone this repository and install the dependencies:

```bash
git clone https://github.com/Talatd/E-Commerce-Website.git
cd "E-Commerce-Website"
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root of the project to add your security keys and Gemini API key:

```env
# Get a free API key from: https://aistudio.google.com/apikey
GEMINI_API_KEY=your_actual_api_key_here

NEXT_PUBLIC_APP_NAME=SmartStore AI

# Add a long random string here for JWT encryption
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRATION=1h
```
*(Note: If no API key is provided, the AI Chatbot will run in a safe "Demo Mode")*

### 4. Running the Development Server
Start the Next.js development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Demo Accounts
To test the data isolation and functionality, use the following credentials:
*   **Admin Access (5 Products):** `admin@smartstore.com` / `admin123`
*   **User Access (3 Products):** `user@smartstore.com` / `user123`
*   **Demo Access (2 Products):** `demo@smartstore.com` / `demo123`
