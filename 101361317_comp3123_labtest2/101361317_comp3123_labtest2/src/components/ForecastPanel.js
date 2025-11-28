import React from "react";

export default function ForecastPanel({ forecast, weather }) {
  if (!forecast) return null;

  return (
    <div className="forecast-panel">
      <h3>5-Day Forecast</h3>
      <div>
        {forecast.list.slice(0, 5).map((item) => {
          const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
          return (
            <div key={item.dt}>
              <span>{new Date(item.dt * 1000).toDateString()}</span>
              <img src={iconUrl} alt="" />
              <span>{Math.round(item.main.temp)}°C</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
