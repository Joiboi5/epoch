import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getItem } from '../lib/storage';

// Lazy-load the chart so the rest of the page stays light.
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
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(
      date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'numeric',
        day: 'numeric',
      })
    );
  }

  return days;
}

function getAnalyticsData() {
  const completions = getItem('epoch_daily_completions', {});
  const totalSessions = getItem('epoch_total_sessions', 0);

  const chartData = getLast7Days().map((day) => ({
    day: day.split(',')[0],
    completed: completions[day] || 0,
  }));

  const bestEntry = chartData.reduce(
    (best, current) => (best.completed >= current.completed ? best : current),
    { day: '-', completed: 0 }
  );

  return {
    chartData,
    totalSessions,
    bestDay: bestEntry.completed > 0 ? bestEntry.day : '-',
    weekTotal: chartData.reduce((sum, item) => sum + item.completed, 0),
  };
}

export default function Analytics() {
  const { chartData, totalSessions, bestDay, weekTotal } = getAnalyticsData();

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <Navbar />

      <main className="flex-grow max-w-2xl mx-auto w-full px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-gray-400 mb-8">
          Track your productivity patterns over the past week.
        </p>

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

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-8">
          <h2 className="text-base font-semibold mb-4">
            Habit Completions - Last 7 Days
          </h2>
          <AnalyticsChart data={chartData} />
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-base font-semibold mb-2">Focus Timer Progress</h2>
          <p className="text-gray-400 text-sm mb-4">
            You have completed{' '}
            <span className="text-white font-semibold">{totalSessions}</span> Pomodoro
            sessions in total. Keep building momentum - consistency compounds.
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
