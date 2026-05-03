import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { useState, useEffect } from "react";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
  try {
    const api = import.meta.env.VITE_WEATHER_API_KEY;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Bareilly&units=metric&appid=${api}`
    );
    
    if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error Detail:", errorData);
        return;
    }

    const data = await res.json();
    setWeather(data);
  } catch (error) {
    console.error("Weather fetch failed:", error);
  } finally {
    setLoading(false);
  }
};

    fetchWeather();
  }, []);

  if (loading) return <div className="p-4 text-white">Loading...</div>;

  return (
  <>
    <div id='window-header'>
      <WindowControls target="weather" />
      <h2 className="text-sm opacity-70">Weather</h2>
    </div>
    {/* <div className="p-6 text-white bg-blue-900/50 h-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">{weather?.name}</h2>
      
      <p className="text-5xl my-2">{Math.round(weather?.main?.temp)}°C</p>
      
      <p className="capitalize">{weather?.weather?.[0]?.description}</p>
      
      {weather?.weather?.[0]?.icon && (
        <img 
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
          alt="weather icon" 
        />
      )}
    </div> */}
    <div className="text-3xl text-center text-white font-bold">
        Work is in progress for this window. Please check back later!
    </div>
  </>
);
};

const WeatherWindow = WindowWrapper(Weather, 'weather');

export default WeatherWindow;