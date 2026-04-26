# Epoch - Group Project Phase 2

## Overview

Epoch is a productivity and habit-tracking web app made with Next.js and React. The purpose of the app is to help users manage daily habits, track progress, and stay focused using a timer.

## Main Features

- A dashboard that shows daily progress
- A habits page where users can add and remove habits
- A focus timer with different modes
- Reusable components for navigation, footer, and habit display
- A responsive dark-themed layout

## Routes

- `/`
  This is the main dashboard page. It shows the current date, progress bar, habit statistics, and the list of today’s habits.

- `/habits`
  This page allows the user to create new habits, view existing habits, and remove habits.

- `/timer`
  This page contains a Pomodoro-style focus timer with focus, short break, and long break modes.

- `/api/hello`
  This is a simple API route that returns JSON data.

## Components

- `Navbar.js`
  The Navbar component is used for navigation between the Dashboard, Habits, and Timer pages. It also includes a mobile menu for smaller screens.

- `Footer.js`
  The Footer component is displayed at the bottom of the app and gives the layout a complete structure.

- `HabitCard.js`
  The HabitCard component is used on the dashboard to display each habit and let the user mark it as completed.

## State Management

This project uses React hooks for state management.

- `useState`
  Used to manage habits, input values, timer mode, timer countdown, running state, and completed sessions.

- `useEffect`
  Used in the timer page to reset the timer when the selected mode changes and to run the countdown logic.

- `useRef`
  Used in the timer page to store the interval reference for the timer.

## Project Structure

- `pages/`
  Contains the main routes of the application.

- `components/`
  Contains reusable UI components.

- `styles/`
  Contains global styling for the project.

- `public/`
  Contains static assets.

## How to Run the Project

1. Open the project folder in CMD or VS Code.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. Open `http://localhost:3000` in the browser.

## Summary

This Phase 2 project demonstrates routing, reusable components, responsive styling, and state management. It builds the structure of the application and prepares it for future improvements in the next phase.
