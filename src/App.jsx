import { useState, useEffect } from "react";
import SearchIcon from "../src/assets/magnifying-glass-solid.svg";
import Location from "../src/assets/location-dot-solid.svg";
import HumidityIcon from "../src/assets/humidity-svgrepo-com.svg";
import Wind from "../src/assets/wind.svg";
import "../src/styles/App.scss";

export default function App() {
  const [cityWeather, setCityWeather] = useState({});
  const [cityName, setCityName] = useState("");
  const changeCity = (e) => {
    e.preventDefault();
    setCityName(e.target.value);
  };
  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      const temp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric&lang=fr
        `
      );
      const response = await temp.json();
      console.log(response);
      setCityWeather(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app">
      <form action="" className="form" onClick={fetchWeather}>
        <div className="form-location">
          <img
            className="form-location-icon"
            src={Location}
            alt="search icon"
          />
        </div>
        <input
          type="text"
          className="form-input"
          onChange={changeCity}
          value={cityName}
          name={cityName}
        />

        <button className="form-search">
          <img
            className="form-search-icon"
            src={SearchIcon}
            alt="search icon"
          />
        </button>
      </form>
      <div className="weather-container">
        {cityWeather.sys && (
          <div>
            <p className="weather-details">
              <span className="weather-city">{cityWeather.name}</span>
              <span className="weather-country">{cityWeather.sys.country}</span>
              <img
                className="weather-country-flag"
                src={`https://flagsapi.com/${cityWeather.sys.country}/flat/64.png`}
              />
            </p>
          </div>
        )}
        {cityWeather.weather && (
          <div className="weather-img">
            <img
              src={`https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
              alt=""
              className="weather-img-icon"
            />
            <p className="weather-description">
              {cityWeather.weather[0].description}
            </p>
          </div>
        )}

        {cityWeather.main && (
          <div className="weather-temp">
            {cityWeather.main.temp}
            <span className="weather-temp-celcius">°C</span>
          </div>
        )}
        {cityWeather.message === "city not found" && (
          <div className="message-error">Ville inconnue</div>
        )}
        <div className="weather-info">
          {cityWeather.main && (
            <div className="weather-humidity">
              <img
                src={HumidityIcon}
                className="weather-humidity-icon"
                alt="weather-humidity-icon"
              />
              <div className="weather-humidity-number">
                {cityWeather.main.humidity}
                <span className="weather-humidity-label">% d'humidité</span>
              </div>
            </div>
          )}
          {cityWeather.wind && (
            <div className="weather-wind">
              <img src={Wind} className="weather-humidity-icon" alt="" />
              {cityWeather.wind.speed} KM/h
              <span className="weather-wind-label">Vitesse du vent</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
