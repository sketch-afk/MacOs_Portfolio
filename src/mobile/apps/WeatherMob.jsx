import MobileWrapper from "@hoc/MobileWrapper";
import { WindowControlsMob } from "@components";
import { Search } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const WeatherMob = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (city = "New Delhi") => {
    try {
      const api = import.meta.env.VITE_WEATHER_API_KEY;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`,
      );

      if (!res.ok) {
        const errorData = await res.json();
        setError(
          `Failed to fetch weather: ${errorData.message || "Unknown error"}`,
        );
        return;
      }

      const data = await res.json();
      setWeather(data);
    } catch (error) {
      setError(`Weather fetch failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchWeather();
  }, [fetchWeather]);

  const handleSearch = () => {
    if (input.trim()) {
      setError(null);
      setLoading(true);
      fetchWeather(input.trim());
      setInput("");
    }
  };

  return (
    <div className="weather-container">
      {/* Header - transparent */}
      <div className="ios-app-header justify-center">
        <div className="absolute left-4 z-20">
          <WindowControlsMob target="weathermob" />
        </div>
        <h2 className="font-semibold text-lg">Weather</h2>
      </div>

      {/* Search Bar - Glassmorphism */}
      <div className="search-container">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search for a city..."
            autoComplete="off"
          />
        </div>
      </div>

      <div className="weather-content">
        {loading && !weather ? (
          <div className="loading-state">Loading...</div>
        ) : (
          <>
            {error && (
              <div className="error-state">
                {error}
              </div>
            )}
            
            {weather && (
              <div className="current-weather">
                <h2 className="city-name">{weather.name}</h2>
                <h1 className="temperature">
                  {Math.round(weather.main.temp)}&deg;
                </h1>
                <p className="condition">
                  {weather.weather[0].description}
                </p>
                <div className="high-low">
                  <span>H:{Math.round(weather.main.temp_max)}&deg;</span>
                  <span>L:{Math.round(weather.main.temp_min)}&deg;</span>
                </div>

                {weather.weather[0].icon && (
                  <div className="glass-panel">
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                      alt="weather icon"
                      className="weather-icon"
                    />
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const WeatherAppMob = MobileWrapper(WeatherMob, "weathermob");

export default WeatherAppMob;