import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HabitCard from '../components/HabitCard';
import WeatherWidget from '../components/WeatherWidget';
import { getItem, setItem } from '../lib/storage';

const DEFAULT_HABITS = [
  { id: 1, name: 'Morning Stretch', category: 'Health', completed: false },
  { id: 2, name: 'Read for 20 minutes', category: 'Learning', completed: false },
  { id: 3, name: 'Review Class Notes', category: 'Study', completed: false },
  { id: 4, name: 'Drink 8 glasses of water', category: 'Health', completed: false },
];

function getTodayKey() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'numeric',
    day: 'numeric',
  });
}

export default function Dashboard() {
  const [habits, setHabits] = useState(() => getItem('epoch_habits', DEFAULT_HABITS));
  const [displayName] = useState(() => {
    const settings = getItem('epoch_settings', { name: 'Manwer' });
    return settings.name || 'Manwer';
  });

  useEffect(() => {
    setItem('epoch_habits', habits);
    const completions = getItem('epoch_daily_completions', {});
    completions[getTodayKey()] = habits.filter((habit) => habit.completed).length;
    setItem('epoch_daily_completions', completions);
  }, [habits]);

  function toggleHabit(id) {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const completedCount = habits.filter((habit) => habit.completed).length;
  const progressPercent =
    habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <Navbar />

      <main className="flex-grow max-w-2xl mx-auto w-full px-4 py-10">
        <p className="text-gray-400 text-sm mb-1">{today}</p>
        <h1 className="text-3xl font-bold mb-2">
          Good day, <span className="text-indigo-400">{displayName}</span> {'👋'}
        </h1>
        <p className="text-gray-400 mb-6">
          You have completed{' '}
          <span className="text-white font-semibold">
            {completedCount} of {habits.length}
          </span>{' '}
          habits today.
        </p>

        <div className="mb-2 flex justify-between text-sm text-gray-400">
          <span>Daily Progress</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-3 mb-8">
          <div
            className="bg-indigo-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <WeatherWidget />

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700">
            <p className="text-2xl font-bold text-indigo-400">{habits.length}</p>
            <p className="text-xs text-gray-400 mt-1">Total Habits</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700">
            <p className="text-2xl font-bold text-green-400">{completedCount}</p>
            <p className="text-xs text-gray-400 mt-1">Completed</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700">
            <p className="text-2xl font-bold text-yellow-400">
              {habits.length - completedCount}
            </p>
            <p className="text-xs text-gray-400 mt-1">Remaining</p>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4">Today&apos;s Habits</h2>
        <div className="flex flex-col gap-3">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} onToggle={toggleHabit} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
