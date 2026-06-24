# 🎮 Respawn

Respawn is a gaming-focused content platform where users can discover, save, and follow game-related posts.  
The feed adapts dynamically based on user interactions, creating a personalized experience.

---

## 🚀 Features

- 🔐 Authentication (Supabase)
- 📰 Dynamic feed of gaming content
- ⭐ Save posts system
- 🎮 Follow games system
- 🧠 Personalized “Signals” ranking system
- 📄 Post detail pages with related content
- ⚡ Real-time user state via React Context

---

## 🧠 Key Concepts

This project focuses on building a **real product-like architecture**, not just UI components:

- Centralized user state using React Context
- Supabase as single source of truth (auth + database)
- Row Level Security for secure user data access
- Feed ranking based on user interactions
- Clean separation between UI and data logic

---

## 🛠 Tech Stack

- React
- React Router
- Supabase
- JavaScript (ES6+)
- Tailwind CSS

---

## 🧩 Data Model

The app uses three main tables:

- `profiles`
- `saved_posts`
- `followed_games`

All tables are secured using Row Level Security (RLS).

---

## ⚙️ Architecture Overview

- `UserContext` → manages authenticated user and related data
- `services/` → Supabase API calls
- `utils/` → feed ranking and signal logic
- `pages/` → main application views
- `components/` → reusable UI components

---

## 🧠 Signal System

The “Signals” section ranks content based on:

- followed games
- saved posts
- interaction signals

This creates a lightweight personalization system.

---

## 🎯 Project Goal

The goal of Respawn was to simulate a real-world product workflow:

- authentication
- persistent user data
- dynamic content feed
- personalized ranking logic

---

## 📌 Status

Project completed (MVP stage – portfolio ready)

---

## 👤 Author

Junior Frontend Developer