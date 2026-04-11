import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CATEGORIES = ['Health', 'Study', 'Learning', 'Fitness', 'Mindfulness', 'Other'];

const defaultHabits = [
  { id: 1, name: 'Morning Stretch', category: 'Health' },
  { id: 2, name: 'Read for 20 minutes', category: 'Learning' },
  { id: 3, name: 'Review Class Notes', category: 'Study' },
  { id: 4, name: 'Drink 8 glasses of water', category: 'Health' },
];

export default function Habits() {
  const [habits, setHabits] = useState(defaultHabits);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Health');
  const [error, setError] = useState('');

  function addHabit() {
    if (!name.trim()) {
      setError('Please enter a habit name.');
      return;
    }
    setHabits((prev) => [
      ...prev,
      { id: Date.now(), name: name.trim(), category },
    ]);
    setName('');
    setError('');
  }

  function deleteHabit(id) {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <Navbar />

      <main className="flex-grow max-w-2xl mx-auto w-full px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Habits</h1>
        <p className="text-gray-400 mb-8">Create and manage your daily habits.</p>

        {/* Add Habit Form */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-10 border border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Add New Habit</h2>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="e.g. Meditate for 10 minutes"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addHabit()}
              className="bg-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-700 rounded-xl px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              onClick={addHabit}
              className="bg-indigo-600 hover:bg-indigo-500 transition rounded-xl py-2.5 font-semibold"
            >
              + Add Habit
            </button>
          </div>
        </div>

        {/* Habit List */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Your Habits</h2>
          <span className="text-sm text-gray-400">{habits.length} total</span>
        </div>

        <div className="flex flex-col gap-3">
          {habits.length === 0 && (
            <p className="text-gray-500 text-center py-10">
              No habits yet. Add one above!
            </p>
          )}
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3 border border-gray-700"
            >
              <div>
                <p className="font-medium">{habit.name}</p>
                <span className="text-xs text-indigo-400 bg-indigo-950 border border-indigo-800 px-2 py-0.5 rounded-full mt-1 inline-block">
                  {habit.category}
                </span>
              </div>
              <button
                onClick={() => deleteHabit(habit.id)}
                className="text-gray-500 hover:text-red-400 transition text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}