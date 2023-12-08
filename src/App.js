import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerHalf,
  faTint,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import Icons from "./components/Icons";
import "./App.css";

function WeatherWidget({ city }) {
  const [forecastData, setForecastData] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        const dailyData = data.list.filter((reading) =>
          reading.dt_txt.includes("18:00:00")
        );
        setForecastData({ ...data, list: dailyData });
      });
  }, [city]);

  if (!forecastData) return <div>Loading...</div>;

  return (
    <div className="weather-widget">
      <h2 className="city-name">{forecastData.city.name}</h2>

      <div className="forecast-list">
        {forecastData.list.slice(0, 5).map((forecast, index) => (
          <div key={index} className="forecast card">
            <h2 className="date">
              {new Date(forecast.dt_txt).toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </h2>
            <img src={Icons(forecast.weather[0].main)} alt="weather icon" />
            <p className="date">
              {new Date(forecast.dt_txt).toLocaleDateString()}
            </p>
            <FontAwesomeIcon icon={faThermometerHalf} /> {forecast.main.temp}°C
            <FontAwesomeIcon icon={faTint} /> {forecast.main.humidity}%
            <FontAwesomeIcon icon={faWind} /> {forecast.wind.speed} m/s
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [search, setSearch] = useState("palencia");
  const [input, setInput] = useState("");

  return (
    <div className="App">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => input && setSearch(input)}>Search</button>
      <WeatherWidget city={search} />

      {/* Rest of your App component... */}
    </div>
  );
}

export default App;
