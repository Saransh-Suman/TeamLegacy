# ⚡ EV Course Pricing Tracker

A full-stack platform that **scrapes, aggregates, and analyses Electric Vehicle (EV) courses** from Udemy, Coursera, and Internshala — giving both learners and course creators actionable intelligence powered by **Google Gemini AI**.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Scripts](#scripts)
- [Team](#team)

---

## Overview

EV Course Pricing Tracker is a **monorepo** with three workspaces:

| Workspace | Purpose |
|-----------|---------|
| `client`  | React + Vite frontend for consumers and creators |
| `server`  | Express REST API with Supabase + Gemini AI integration |
| `scraper` | Playwright-powered scraper that collects EV course data from multiple platforms |

Consumers can **search, compare, and get AI summaries** of EV courses. Creators get a **dedicated dashboard** with trending topics, competitor analysis, pricing strategy advice, and target-market insights — all generated live using the Gemini API.

---

## Features

### 🎓 Consumer Side
- **Course Search** — Filter by keyword, platform, price, level, and topic
- **Course Comparison** — Side-by-side price and rating comparison across platforms
- **AI Course Summary** — Gemini-generated learning outcomes, study plans, and verdicts for any course
- **Hidden Gem Badge** — Automatically highlights high-rated, low-price courses (rating > 4.3 & price < ₹999)
- **Course Detail View** — Full breakdown including discount percentage, duration, and platform

### 🛠️ Creator Side
- **Creator Dashboard** — Central hub for all creator tools
- **Register a Course** — Submit your own course URL for tracking and analysis
- **My Courses** — View all personally registered courses in one place
- **Trending Topics** — Demand scores, average pricing, and course counts per EV topic
- **Competitor Analysis** — Compare your course against similar offerings on other platforms
- **Pricing Analysis** — Discover optimal price points based on market data
- **Target Market Insights** — Gemini AI-generated audience targeting recommendations
- **AI Suggestions** — Personalised pricing advice, content gaps, and improvement tips powered by Gemini

### 🤖 Scraper
- **Multi-platform scraping** — Udemy, Coursera, Internshala
- **Playwright browser automation** for JavaScript-rendered pages (Coursera)
- **Graceful fallback** to curated static data when live scraping is blocked
- **Auto-classification** — Level (`beginner`/`intermediate`/`advanced`) and topic (`battery`/`charging`/`motor`/`general`) detected from course titles
- **Supabase upsert** — Idempotent writes using course URL as unique key
- **Scheduled runs** via `node-cron`

---

## Tech Stack

### Frontend (`client`)
| Technology | Role |
|------------|------|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| React Router v6 | Client-side routing |
| Recharts | Data visualisation (charts) |
| Axios | HTTP client |
| Tailwind CSS 3 | Styling |

### Backend (`server`)
| Technology | Role |
|------------|------|
| Node.js (ESM) | Runtime |
| Express 4 | REST API framework |
| Supabase JS v2 | PostgreSQL database client |
| Google Gemini API | AI-generated insights (`gemini-1.5-flash`) |
| CORS | Cross-origin request handling |

### Scraper (`scraper`)
| Technology | Role |
|------------|------|
| Playwright | Headless browser automation |
| Supabase JS v2 | Database upserts |
| node-cron | Scheduled scraping jobs |
| dotenv | Environment configuration |

### Database
| Technology | Role |
|------------|------|
| Supabase (PostgreSQL) | Hosted relational database |

---

## Architecture

```
┌────────────────────────────────────────────────────────────┐
│                        CLIENT (React/Vite)                 │
│  Consumer: Search · Compare · AI Summary · Course Detail   │
│  Creator:  Dashboard · Trending · Competitor · AI Tips     │
└──────────────────────────┬─────────────────────────────────┘
                           │ HTTP (Axios)
                           ▼
┌────────────────────────────────────────────────────────────┐
│                    SERVER (Express)                        │
│  /api/courses/*  — Consumer routes                        │
│  /api/creator/*  — Creator routes                         │
│         │                        │                        │
│    Supabase JS              Gemini API                     │
└──────────┬─────────────────────────────────────────────────┘
           │ upsert / query
           ▼
┌────────────────────────────────────────────────────────────┐
│                    SUPABASE (PostgreSQL)                   │
│  courses table · price_history table                      │
└──────────┬─────────────────────────────────────────────────┘
           ▲ upsert
┌──────────┴─────────────────────────────────────────────────┐
│                    SCRAPER (Playwright + node-cron)        │
│  Udemy · Coursera · Internshala                           │
└────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
TeamLegacy/
├── .env                        # Environment variables (gitignored)
├── .env.example                # Template for required env vars
├── .gitignore
├── package.json                # Root monorepo config (npm workspaces)
│
├── docs/
│   ├── API_CONTRACT.md         # Agreed API endpoints
│   └── SCHEMA.sql              # PostgreSQL table definitions
│
├── shared/
│   └── mockData.json           # Shared mock data for development
│
├── client/                     # React frontend
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── App.jsx             # Root router & nav
│       ├── main.jsx
│       ├── index.css
│       ├── lib/                # Shared client utilities
│       ├── components/         # Reusable UI components
│       │   ├── AISummary.jsx
│       │   ├── HiddenGemBadge.jsx
│       │   ├── PriceCompareCard.jsx
│       │   ├── TrendChart.jsx
│       │   ├── cards/
│       │   ├── charts/
│       │   ├── forms/
│       │   ├── layout/
│       │   └── ui/
│       └── pages/
│           ├── consumer/
│           │   ├── Dashboard.jsx
│           │   ├── Search.jsx
│           │   └── CourseDetail.jsx
│           ├── creator/
│           │   ├── Dashboard.jsx
│           │   ├── Trending.jsx
│           │   └── Competitor.jsx
│           ├── AISuggestions.jsx
│           ├── CompetitorAnalysis.jsx
│           ├── MyCourses.jsx
│           ├── PricingAnalysis.jsx
│           ├── RegisterCourse.jsx
│           ├── TargetMarket.jsx
│           └── Trending.jsx
│
├── server/                     # Express backend
│   ├── index.js                # App entry point
│   ├── lib/
│   │   ├── claude.js           # Gemini AI wrapper (askClaude)
│   │   └── supabase.js         # Supabase client
│   ├── middleware/
│   ├── routes/
│   │   ├── user/               # Consumer API routes
│   │   │   ├── index.js        # Search
│   │   │   ├── pricing.js      # Price comparison
│   │   │   ├── search.js
│   │   │   └── summarize.js    # AI course summary
│   │   └── creator/            # Creator API routes
│   │       ├── index.js
│   │       ├── register.js
│   │       ├── myCourses.js
│   │       ├── trending.js
│   │       ├── competitor.js
│   │       ├── pricingAnalysis.js
│   │       ├── targetMarket.js
│   │       └── suggestions.js
│   └── services/
│       ├── creator/
│       │   ├── aiService.js          # AI suggestion prompts
│       │   ├── competitorService.js
│       │   ├── myCoursesService.js
│       │   ├── pricingService.js
│       │   ├── registrationService.js
│       │   ├── targetMarketService.js
│       │   └── trendingService.js
│       └── user/
│           ├── aiService.js          # Consumer AI summary
│           ├── pricingService.js
│           └── searchService.js
│
└── scraper/                    # Data collection service
    ├── index.js                # Orchestrator (runs all scrapers)
    ├── scheduler.js            # node-cron scheduled jobs
    ├── check-db.js             # Supabase connectivity check
    ├── scrapers/
    │   ├── udemy.js            # Udemy (curated + USD→INR conversion)
    │   ├── coursera.js         # Coursera (Playwright, with retries)
    │   ├── internshala.js      # Internshala (fetch + fallback)
    │   └── internship.js
    └── utils/
        ├── clean.js            # parsePrice, detectLevel, detectTopic, isHiddenGem
        └── supabase.js         # Supabase upsert helper
```

---

## Database Schema

```sql
-- Main courses table
CREATE TABLE courses (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform          TEXT NOT NULL,
  title             TEXT NOT NULL,
  price_inr         NUMERIC NOT NULL,
  original_price_inr NUMERIC,
  discount_percent  NUMERIC,
  rating            NUMERIC,
  hours             NUMERIC,
  level             TEXT,       -- 'beginner' | 'intermediate' | 'advanced'
  topic             TEXT,       -- 'battery' | 'charging' | 'motor' | 'general'
  url               TEXT UNIQUE,
  hidden_gem        BOOLEAN DEFAULT false,
  scraped_at        TIMESTAMPTZ DEFAULT now(),
  created_at        TIMESTAMPTZ DEFAULT now()
);

-- Price history for trend tracking
CREATE TABLE price_history (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id   UUID REFERENCES courses(id) ON DELETE CASCADE,
  price_inr   NUMERIC NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT now()
);
```

> Indexes are created on `topic`, `platform`, `rating`, and `price_history.course_id` for fast query performance.

---

## API Reference

### Consumer Routes — `/api/courses`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/courses/search?q=&platform=&max_price=` | Search courses with filters |
| `GET` | `/api/courses/compare?ids=1,2,3` | Compare specific courses side-by-side |
| `GET` | `/api/courses/:id/summary` | AI-generated summary for a course |

**Search response shape:**
```json
[{ "id", "title", "platform", "price_inr", "rating", "hours", "url", "hidden_gem" }]
```

### Creator Routes — `/api/creator`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/creator/register` | Register a new course |
| `GET` | `/api/creator/courses` | List creator's own courses |
| `GET` | `/api/creator/trending` | Trending EV topics with demand scores |
| `GET` | `/api/creator/competitor?topic=` | Competitor courses by topic |
| `GET` | `/api/creator/pricing-analysis` | Market pricing insights |
| `GET` | `/api/creator/target-market` | AI target audience analysis |
| `GET` | `/api/creator/:id/suggestions` | AI pricing & content suggestions |

---

## Getting Started

### Prerequisites

- **Node.js** v18+ (uses native `--env-file` flag)
- **npm** v8+ (for workspaces support)
- A **Supabase** project with the schema applied (see `docs/SCHEMA.sql`)
- A **Google Gemini API Key**
- **Playwright** browser binaries (installed automatically)

### 1. Clone the repository

```bash
git clone https://github.com/your-org/ev-course-tracker.git
cd ev-course-tracker/TeamLegacy
```

### 2. Install dependencies

```bash
npm install
```

> This installs dependencies for all three workspaces (`client`, `server`, `scraper`) in one command.

### 3. Apply the database schema

Open your Supabase project's **SQL Editor** and run the contents of [`docs/SCHEMA.sql`](./docs/SCHEMA.sql).

### 4. Configure environment variables

```bash
cp .env.example .env
```

Then fill in your credentials in `.env` (see [Environment Variables](#environment-variables) below).

### 5. Install Playwright browsers

```bash
npx playwright install chromium
```

---

## Environment Variables

Create a `.env` file in the `TeamLegacy/` root directory:

```env
# Supabase
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_KEY=<your-service-role-key>

# Google Gemini AI
GEMINI_API_KEY=<your-gemini-api-key>

# Server
PORT=3000
```

| Variable | Where to find it |
|----------|-----------------|
| `SUPABASE_URL` | Supabase Dashboard → Settings → API |
| `SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_KEY` | Supabase Dashboard → Settings → API |
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/app/apikey) |

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## Running the Project

### Development (Client + Server together)

```bash
npm run dev
```

This uses `concurrently` to start both the Express server (port 3000) and the Vite dev server simultaneously.

### Run services individually

```bash
# Frontend only (http://localhost:5173)
npm run client

# Backend only (http://localhost:3000)
npm run server

# Scraper (one-time run)
npm run scraper
```

### Run the scraper manually

```bash
cd scraper
node index.js
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start server + client in parallel (development) |
| `npm run server` | Start Express server with file-watching |
| `npm run client` | Start Vite dev server |
| `npm run scraper` | Run the scraper orchestrator once |

---

## Team

> Built by **Team Legacy** for the TechVeda hackathon.

| Role | Responsibilities |
|------|-----------------|
| Frontend (Consumer) | Search, compare, course detail, AI summary pages |
| Frontend (Creator) | Creator dashboard, trending, competitor, AI suggestions pages |
| Backend | Express API, Supabase integration, Gemini AI services |
| Scraper | Playwright scrapers, data cleaning, scheduled jobs |

---

## License

This project was built for educational and hackathon purposes.

---

<div align="center">
  <strong>⚡ Empowering EV learners and creators with data-driven insights</strong>
</div>
