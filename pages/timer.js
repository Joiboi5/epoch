import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MODES = {
  focus: { label: 'Focus', seconds: 25 * 60 },
  short: { label: 'Short Break', seconds: 5 * 60 },
  long: { label: 'Long Break', seconds: 15 * 60 },
};

export default function Timer() {
  const [mode, setMode] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(MODES.focus.seconds);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);

  // Reset timer when mode changes
  useEffect(() => {
    setRunning(false);
    setTimeLeft(MODES[mode].seconds);
  }, [mode]);

  // Countdown logic
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            if (mode === 'focus') setSessions((s) => s + 1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, mode]);

  function reset() {
    setRunning(false);
    setTimeLeft(MODES[mode].seconds);
  }

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  const total = MODES[mode].seconds;
  const progress = ((total - timeLeft) / total) * 100;
  const circumference = 2 * Math.PI * 45; // r=45

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <Navbar />

      <main className="flex-grow max-w-xl mx-auto w-full px-4 py-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2">Focus Timer</h1>
        <p className="text-gray-400 mb-8 text-center">
          Use Pomodoro sessions to stay deep in focus.
        </p>

        {/* Mode Buttons */}
        <div className="flex gap-2 mb-10 flex-wrap justify-center">
          {Object.entries(MODES).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                mode === key
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {val.label}
            </button>
          ))}
        </div>

        {/* SVG Circle Timer */}
        <div className="relative w-56 h-56 mb-8">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            style={{ transform: 'rotate(-90deg)' }}
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#1f2937"
              strokeWidth="7"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#6366f1"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (circumference * progress) / 100}
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold font-mono">
              {minutes}:{seconds}
            </span>
            <span className="text-xs text-gray-400 mt-1">
              {MODES[mode].label}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-10">
          <button
            onClick={() => setRunning((r) => !r)}
            className="bg-indigo-600 hover:bg-indigo-500 transition px-10 py-2.5 rounded-full font-semibold text-base"
          >
            {running ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={reset}
            className="bg-gray-800 hover:bg-gray-700 transition px-6 py-2.5 rounded-full font-semibold"
          >
            Reset
          </button>
        </div>

        {/* Session Count */}
        <div className="bg-gray-800 rounded-xl px-6 py-4 border border-gray-700 text-center">
          <p className="text-gray-400 text-sm">Focus sessions completed</p>
          <p className="text-3xl font-bold text-indigo-400 mt-1">{sessions}</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}