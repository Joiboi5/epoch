export default function HabitCard({ habit, onToggle }) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
        habit.completed
          ? 'border-indigo-500 bg-indigo-950'
          : 'border-gray-700 bg-gray-800'
      }`}
    >
      <div>
        <p
          className={`font-medium text-base ${
            habit.completed ? 'line-through text-gray-400' : 'text-white'
          }`}
        >
          {habit.name}
        </p>
        <span className="text-xs text-indigo-400 bg-indigo-950 border border-indigo-800 px-2 py-0.5 rounded-full mt-1 inline-block">
          {habit.category}
        </span>
      </div>

      <button
        onClick={() => onToggle(habit.id)}
        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
          habit.completed
            ? 'border-indigo-400 bg-indigo-400'
            : 'border-gray-500 hover:border-indigo-400'
        }`}
      >
        {habit.completed && (
          <span className="text-white text-sm font-bold">✓</span>
        )}
      </button>
    </div>
  );
}
