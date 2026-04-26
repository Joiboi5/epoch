import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getItem } from '../lib/storage';

const OUTDOOR_SUGGESTIONS = ['Morning run', 'Outdoor yoga', 'Walk in the park', 'Cycling'];
const INDOOR_SUGGESTIONS = ['Home workout', 'Meditation', 'Read a book', 'Study session'];

function getWeatherEmoji(main) {
  const map = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Drizzle: '🌦️',
    Thunderstorm: '⛈️',
    Snow: '❄️',
    Mist: '🌫️',
    Fog: '🌫️',
  };

  return map[main] || '🌤️';
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const settings = getItem('epoch_settings', { city: 'Toronto' });
    const city = settings.city || 'Toronto';

    fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setWeather(data);
      })
      .catch(() => setError('Could not load weather'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700 mb-8 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-3" />
        <div className="h-8 bg-gray-700 rounded w-1/3 mb-2" />
        <div className="h-3 bg-gray-700 rounded w-2/3" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700 mb-8 text-gray-400 text-sm">
        {'⚠️'} Weather unavailable.{' '}
        <Link href="/settings" className="text-indigo-400 underline">
          Set your city in Settings.
        </Link>
      </div>
    );
  }

  const badConditions = ['Rain', 'Drizzle', 'Thunderstorm', 'Snow'];
  const isOutdoorFriendly =
    weather &&
    !badConditions.includes(weather.weather[0].main) &&
    weather.main.temp > 5;

  const suggestions = isOutdoorFriendly ? OUTDOOR_SUGGESTIONS : INDOOR_SUGGESTIONS;

  return (
    <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700 mb-8">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-gray-400 text-xs mb-1">Current Weather - {weather.name}</p>
          <p className="text-2xl font-bold">{Math.round(weather.main.temp)}°C</p>
          <p className="text-gray-300 text-sm capitalize">
            {weather.weather[0].description}
          </p>
        </div>
        <span className="text-5xl">{getWeatherEmoji(weather.weather[0].main)}</span>
      </div>

      <div className="border-t border-gray-700 pt-3">
        <p className="text-xs text-gray-400 mb-2">
          {isOutdoorFriendly
            ? '✅ Great day for outdoor habits!'
            : '🏠 Better to keep habits indoors today.'}
        </p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <span
              key={suggestion}
              className="text-xs bg-indigo-950 border border-indigo-800 text-indigo-300 px-2 py-1 rounded-full"
            >
              {suggestion}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
