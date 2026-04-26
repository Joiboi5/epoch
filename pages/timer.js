import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getItem, setItem } from '../lib/storage';

const MODES = {
  focus: { label: 'Focus', seconds: 25 * 60 },
  short: { label: 'Short Break', seconds: 5 * 60 },
  long: { label: 'Long Break', seconds: 15 * 60 },
};

export default function Timer() {
  const [mode, setMode] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(MODES.focus.seconds);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(() => getItem('epoch_total_sessions', 0));
  const intervalRef = useRef(null);

  useEffect(() => {
    setItem('epoch_total_sessions', sessions);
  }, [sessions]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            if (mode === 'focus') setSessions((count) => count + 1);
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

  function changeMode(nextMode) {
    setMode(nextMode);
    setRunning(false);
    setTimeLeft(MODES[nextMode].seconds);
  }

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  const total = MODES[mode].seconds;
  const progress = ((total - timeLeft) / total) * 100;
  const circumference = 2 * Math.PI * 45;

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <Navbar />

      <main className="flex-grow max-w-xl mx-auto w-full px-4 py-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2">Focus Timer</h1>
        <p className="text-gray-400 mb-8 text-center">
          Use Pomodoro sessions to stay deep in focus.
        </p>

        <div className="flex gap-2 mb-10 flex-wrap justify-center">
          {Object.entries(MODES).map(([key, value]) => (
            <button
              key={key}
              onClick={() => changeMode(key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                mode === key
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {value.label}
            </button>
          ))}
        </div>

        <div className="relative w-56 h-56 mb-8">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            style={{ transform: 'rotate(-90deg)' }}
          >
            <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="7" />
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
            <span className="text-xs text-gray-400 mt-1">{MODES[mode].label}</span>
          </div>
        </div>

        <div className="flex gap-4 mb-10">
          <button
            onClick={() => setRunning((value) => !value)}
            className="bg-indigo-600 hover:bg-indigo-500 transition px-10 py-2.5 rounded-full font-semibold"
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

        <div className="bg-gray-800 rounded-xl px-6 py-4 border border-gray-700 text-center w-full max-w-xs">
          <p className="text-gray-400 text-sm">Sessions completed today</p>
          <p className="text-3xl font-bold text-indigo-400 mt-1">{sessions}</p>
          <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all"
              style={{ width: `${Math.min((sessions / 8) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{sessions} / 8 daily goal</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
