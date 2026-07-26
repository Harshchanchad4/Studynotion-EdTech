# PRD – StudyNotion AI Assistant (RAG)

## Project Overview

Build an AI Assistant for the existing **StudyNotion MERN** application using **Retrieval-Augmented Generation (RAG)**.

The assistant should answer questions about the platform using only the data available in the application. It should not generate answers from its own knowledge or make assumptions.

The implementation should be modular so new knowledge sources and AI capabilities can be added in the future.

---

# Objective

Develop an AI chatbot that can:

* Answer questions about StudyNotion
* Help students navigate the platform
* Explain courses and instructors
* Answer FAQs
* Recommend relevant courses
* Retrieve information using semantic search
* Return accurate, context-aware responses

---

# Tech Stack

## Frontend

* React

## Backend

* Node.js
* Express.js

## Database

* MongoDB

## AI Framework

* LangChain JS

## Large Language Model

* Hugging Face Open Source Model (Qwen3 Instruct)

## Embedding Model

* Hugging Face BAAI/bge-m3

## Vector Database

* Qdrant

---

# Scope

The AI should answer questions related to:

* Courses
* Categories
* Instructors
* Student Dashboard
* Instructor Dashboard
* Authentication
* Payments
* Course Purchase
* Progress Tracking
* Reviews
* Wishlist
* FAQs
* Platform Policies

---

# Out of Scope

* Fine-tuning models
* Voice assistant
* Image generation
* Video generation
* Autonomous agents
* External web search
* User-specific account actions

---

# RAG Workflow

1. User asks a question.
2. Generate an embedding using the Hugging Face embedding model.
3. Search Qdrant for the most relevant documents.
4. Retrieve the top matching documents.
5. Build a prompt containing the retrieved context and the user's question.
6. Send the prompt to the Hugging Face LLM through LangChain.
7. Return the generated response to the user.

---

# Data Sources

The assistant should retrieve information from:

* Courses
* Categories
* Instructors
* Course Sections
* Lectures
* Reviews
* FAQ entries
* Platform documentation
* Static knowledge documents

---

# Backend Modules

Create a dedicated AI module.

```text
backend/
└── ai/
    ├── chat/
    ├── embeddings/
    ├── retrieval/
    ├── prompts/
    ├── vector/
    ├── ingestion/
    ├── config/
    └── utils/
```

Keep all AI-related code isolated from the existing business logic.

---

# API Endpoints

### POST /api/ai/chat

Accepts a user question and returns an AI-generated response.

---

### POST /api/ai/index

Indexes all supported data into the vector database.

---

### POST /api/ai/reindex

Rebuilds the vector database after data changes.

---

### GET /api/ai/health

Checks the health status of the AI service.

---

# Functional Requirements

The assistant must:

* Answer only using retrieved context.
* Never invent information.
* Clearly state when information is unavailable.
* Recommend relevant courses when appropriate.
* Produce concise, easy-to-read responses.
* Support future expansion without major architectural changes.

---

# Non-Functional Requirements

* Modular architecture
* Clean folder structure
* Easy to maintain
* Re-indexable data
* Fast semantic search
* Scalable for future features

---

# Future Enhancements

The architecture should allow future support for:

* Conversation memory
* Personalized recommendations
* Tool calling
* Student progress queries
* Enrollment lookup
* Admin knowledge management
* AI agents

These features are **not** part of the initial implementation.

---

# Success Criteria

The project will be considered complete when:

* AI can answer questions using StudyNotion data.
* Semantic retrieval works correctly.
* Data can be indexed and re-indexed.
* Responses are generated using LangChain.
* Hugging Face models are used for embeddings and text generation.
* Qdrant stores and retrieves vector embeddings successfully.
* The chatbot integrates seamlessly into the existing StudyNotion application.
