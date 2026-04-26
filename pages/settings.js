import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getItem, setItem } from '../lib/storage';

export default function Settings() {
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const settings = getItem('epoch_settings', { city: 'Toronto', name: 'Manwer' });
    setCity(settings.city || 'Toronto');
    setName(settings.name || 'Manwer');
  }, []);

  function saveSettings() {
    setItem('epoch_settings', { city, name });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function resetAllData() {
    if (confirm('This will permanently delete all your habits and session data. Are you sure?')) {
      localStorage.clear();
      window.location.reload();
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <Navbar />

      <main className="flex-grow max-w-2xl mx-auto w-full px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400 mb-8">Customize your Epoch experience.</p>

        {/* Profile Settings */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
          <h2 className="text-base font-semibold mb-4">Profile</h2>

          <label className="block text-sm text-gray-400 mb-1">Display Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-700 rounded-xl px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition mb-4"
          />

          <label className="block text-sm text-gray-400 mb-1">
            Your City (used for weather suggestions)
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Toronto"
            className="w-full bg-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <button
          onClick={saveSettings}
          className={`w-full transition rounded-xl py-2.5 font-semibold mb-10 ${
            saved
              ? 'bg-green-700 text-white'
              : 'bg-indigo-600 hover:bg-indigo-500'
          }`}
        >
          {saved ? '✓ Settings Saved!' : 'Save Settings'}
        </button>

        {/* Danger Zone */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-red-900">
          <h2 className="text-base font-semibold mb-2 text-red-400">Danger Zone</h2>
          <p className="text-gray-400 text-sm mb-4">
            Permanently deletes all habits, session data, and settings stored in your browser.
          </p>
          <button
            onClick={resetAllData}
            className="bg-red-950 hover:bg-red-900 border border-red-800 transition rounded-xl px-5 py-2 text-sm font-medium text-red-300"
          >
            Reset All Data
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}