# Epoch

Epoch is a productivity web app built with Next.js, React, and Tailwind CSS. It combines habit tracking, a focus timer, lightweight personal settings, and a weather-aware dashboard to help users stay consistent day to day.

## Features

- Dashboard with daily progress, habit stats, and a personalized greeting
- Habit tracking with add, remove, and completion toggling
- Pomodoro-style focus timer with focus, short break, and long break modes
- Settings page for saving a display name and city
- Weather widget powered by a local API route and user-selected city
- Local persistence with `localStorage` for habits, settings, and session counts
- Responsive navigation and shared layout components

## Routes

- `/`
  Main dashboard with progress tracking, stats, today’s habits, and the weather widget.

- `/habits`
  Manage habits by creating and deleting entries.

- `/timer`
  Run focus sessions and track completed sessions.

- `/settings`
  Save profile preferences and reset browser-stored app data.

- `/analytics`
  Reserved for analytics, but currently incomplete.

- `/api/hello`
  Sample API endpoint.

- `/api/weather`
  Weather endpoint used by the dashboard widget.

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Recharts

## Project Structure

```text
epoch/
  components/
    AnalyticsChart.js
    Footer.js
    HabitCard.js
    Navbar.js
    WeatherWidget.js
  lib/
    storage.js
  pages/
    api/
      hello.js
      weather.js
    _app.js
    _document.js
    analytics.js
    habits.js
    index.js
    settings.js
    timer.js
```

## State and Storage

The app uses React hooks for page state and `localStorage` for persistence.

- `epoch_habits`: saved habits and completion state
- `epoch_settings`: saved display name and city
- `epoch_total_sessions`: completed timer sessions
- `epoch_daily_completions`: daily completion counts from the dashboard

The helper functions for browser storage live in [`lib/storage.js`](./lib/storage.js).

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Current Status

The app is functional for the dashboard, habits, timer, settings, and weather flow. The `analytics` page is currently empty, which causes `npm run build` to fail because Next.js expects every page file to export a valid React component.

## Notes

- User data is stored in the browser, so clearing local storage resets progress.
- Weather suggestions depend on the city saved in Settings.
- Some UI text currently shows character encoding issues in the source, which can be cleaned up separately.
