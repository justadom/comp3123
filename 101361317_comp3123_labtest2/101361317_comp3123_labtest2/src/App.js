import React, { useEffect, useState } from "react";
import WeatherWidget from "./components/WeatherWidget";
import SearchBar from "./components/SearchBar";
import ForecastPanel from "./components/ForecastPanel";
import sampleWeather from "./weather_api_output.json";
import "./App.css";

const API_URL = process.env.REACT_APP_API_URL || "https://api.openweathermap.org/data/2.5";
const API_KEY = process.env.REACT_APP_API_KEY || "";

function App() {
  const [city, setCity] = useState("Toronto"); 
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError("");
    try {
      if (!API_KEY) {
        console.warn("No API key found — using sample JSON.");
        setWeather(sampleWeather);
        setLoading(false);
        return;
      }

      const res = await fetch(
        `${API_URL}/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      if (res.ok) {
        setWeather(data);
      } else {
        throw new Error(data.message || "Failed to fetch weather");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Error fetching weather");
      setWeather(sampleWeather);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (cityName) => {
    if (!API_KEY) {
      setForecast(null);
      return;
    }
    try {
      const res = await fetch(
        `${API_URL}/forecast?q=${encodeURIComponent(cityName)}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      if (res.ok) {
        setForecast(data);
      } else {
        setForecast(null);
      }
    } catch (err) {
      console.error("Forecast error", err);
      setForecast(null);
    }
  };

  useEffect(() => {
    fetchWeather(city);
    fetchForecast(city);
  }, []);

  const handleSearch = (newCity) => {
    setCity(newCity);
    fetchWeather(newCity);
    fetchForecast(newCity);
  };

  return (
    <div className="app-root">
      <div className="page-bg" />
      <div className="container">
        <header className="header">
          <h1 className="title">Weather <span className="accent">Forecast</span></h1>
          <SearchBar defaultValue={city} onSearch={handleSearch} />
        </header>

        {loading && <div className="loading">Loading weather...</div>}
        {error && <div className="error">Error: {error}</div>}

        <main className="main-panel">
          <WeatherWidget data={weather} />
          <aside className="sidebar">
            <ForecastPanel forecast={forecast} weather={weather} />
          </aside>
        </main>

        <footer className="footer">
          <small>Data: OpenWeatherMap. Default city: Toronto.</small>
        </footer>
      </div>
    </div>
  );
}

export default App;
