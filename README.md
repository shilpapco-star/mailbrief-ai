# 📧 MailBrief AI

> **Understand every email in seconds.**

MailBrief AI is an AI-powered email analyzer that transforms long and complicated emails into clear, actionable information.

Instead of spending time reading through lengthy emails, users can paste an email into MailBrief AI and quickly understand **what the email is about, what matters, what needs to be done, important dates, and how they can respond.**

🌐 **Live Demo:** https://mailbrief-ai-6mwh.vercel.app/  
💻 **GitHub:** https://github.com/shilpapco-star/mailbrief-ai

---

## 🚀 Why MailBrief AI?

Emails often contain important information hidden inside long paragraphs.

Users may need to identify:

- What is the main purpose of the email?
- What are the important points?
- Is any action required?
- What is the deadline?
- How urgent is the email?
- What should I reply?

Reading and processing every email manually can take unnecessary time.

**MailBrief AI addresses this problem by using AI to extract and organize the important information from an email into an easy-to-understand format.**

---

## ✨ Features

### 🤖 AI Email Analysis

Analyze an email and receive structured insights instead of reading the entire email manually.

### 📝 Smart Summaries

Generates a concise summary explaining the main purpose and context of the email.

### 🔑 Key Points

Extracts the most important information from the email.

### ✅ Action Items

Identifies tasks that the recipient needs to complete.

### 📅 Important Dates

Detects important dates, deadlines, meetings, and scheduled events mentioned in the email.

### 🚨 Priority Detection

Helps identify the importance of an email using priority levels such as:

- LOW
- MEDIUM
- HIGH
- URGENT

### 🎯 Sender Intent

Identifies the primary intent of the sender to help users understand why the email was sent.

### 💬 Suggested Replies

Provides an AI-generated reply suggestion so users can quickly understand **what they could reply back to the sender**.

### 📋 Email History

Keeps previously analyzed emails organized so users can revisit their analysis.

### 📊 Analytics

Provides an overview of analyzed emails through statistics and visual insights.

### 🔐 Authentication

Users can securely register and log in using email/password authentication and Google authentication.

### 🌙 Responsive UI

A modern, responsive interface designed for desktop and smaller screens with a glassmorphism-inspired visual style.

---

## 🖥️ Application Pages

| Page | Description |
|------|-------------|
| 🏠 Dashboard | Overview of the MailBrief AI application |
| 📧 Analyzer | Analyze and understand emails using AI |
| 📋 History | View previously analyzed emails |
| 📊 Analytics | View email statistics and insights |
| ⚙️ Settings | Manage account and application preferences |
| 🔍 Email Details | View detailed analysis of an individual email |

---

## 🛠️ Tech Stack

### Frontend

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Lucide Icons**
- **Motion**

### Backend & Database

- **Supabase**
- **PostgreSQL**
- **Supabase Authentication**

### AI

- **Google Gemini**

### Validation & Development

- **Zod**
- **Vitest**
- **ESLint**

### Deployment

- **Vercel**

### Version Control

- **Git**
- **GitHub**

---

## 🏗️ How It Works

```text
User
  │
  ▼
Paste Email
  │
  ▼
MailBrief AI
  │
  ▼
API / Analysis Layer
  │
  ▼
Google Gemini
  │
  ▼
Structured AI Analysis
  │
  ├── Summary
  ├── Key Points
  ├── Action Items
  ├── Important Dates
  ├── Priority
  ├── Sender Intent
  └── Suggested Reply
  │
  ▼
Supabase PostgreSQL
  │
  ▼
History & Analytics