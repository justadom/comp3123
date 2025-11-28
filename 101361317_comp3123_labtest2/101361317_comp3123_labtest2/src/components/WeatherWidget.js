import React from "react";

export default function WeatherWidget({ data }) {
  if (!data) return null;

  const weather = data.weather?.[0];
  const icon = weather?.icon || "01d";
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  let temp = data.main?.temp;
  if (temp > 200) temp -= 273.15;

  return (
    <div className="widget">
      <h2>{data.name}</h2>
      <img src={iconUrl} alt="" />
      <p>{Math.round(temp)}°C</p>
      <p>{weather?.description}</p>
    </div>
  );
}
