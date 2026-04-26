import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getItem } from '../lib/storage';

// CODE SPLITTING: AnalyticsChart is lazy loaded — not included in the initial bundle
const AnalyticsChart = dynamic(() => import('../components/AnalyticsChart'), {
  loading: () => (
    <div className="h-60 flex items-center justify-center text-gray-500 text-sm">
      Loading chart...
    </div>
  ),
  ssr: false,
});

function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(
      d.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' })
    );
  }
  return days;
}

export default function Analytics() {
  const [chartData, setChartData] = useState([]);
  const [totalSessions, setTotalSessions] = useState(0);
  const [bestDay, setBestDay] = useState('—');
  const [weekTotal, setWeekTotal] = useState(0);

  useEffect(() => {
    const completions = getItem('epoch_daily_completions', {});
    const sessions = getItem('epoch_total_sessions', 0);
    const days = getLast7Days();

    const data = days.map((day) => ({
      day: day.split(',')[0],
      completed: completions[day] || 0,
    }));

    const best = data.reduce(
      (a, b) => (a.completed >= b.completed ? a : b),
      { day: '—', completed: 0 }
    );
    const total = data.reduce((sum, d) => sum + d.completed, 0);

    setChartData(data);
    setTotalSessions(sessions);
    setBestDay(best.completed > 0 ? best.day : '—');
    setWeekTotal(total);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <Navbar />

      <main className="flex-grow max-w-2xl mx-auto w-full px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-gray-400 mb-8">
          Track your productivity patterns over the past week.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700">
            <p className="text-2xl font-bold text-indigo-400">{weekTotal}</p>
            <p className="text-xs text-gray-400 mt-1">Habits This Week</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700">
            <p className="text-2xl font-bold text-green-400">{totalSessions}</p>
            <p className="text-xs text-gray-400 mt-1">Focus Sessions</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700">
            <p className="text-2xl font-bold text-yellow-400">{bestDay}</p>
            <p className="text-xs text-gray-400 mt-1">Best Day</p>
          </div>
        </div>

        {/* Chart (lazy loaded) */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-8">
          <h2 className="text-base font-semibold mb-4">
            Habit Completions — Last 7 Days
          </h2>
          <AnalyticsChart data={chartData} />
        </div>

        {/* Focus Progress */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-base font-semibold mb-2">Focus Timer Progress</h2>
          <p className="text-gray-400 text-sm mb-4">
            You have completed{' '}
            <span className="text-white font-semibold">{totalSessions}</span> Pomodoro
            sessions in total. Keep building momentum — consistency compounds.
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-indigo-500 h-2.5 rounded-full transition-all"
                style={{ width: `${Math.min((totalSessions / 20) * 100, 100)}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {totalSessions} / 20 goal
            </span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}