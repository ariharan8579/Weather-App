import React, { useState } from 'react'

const API_KEY = "023288d4bd10922c79828bdf3d2739fb" ;

const Weather = () => {
  const [city,setCity] = useState("");
  const [error,setError] = useState("");
  const [weather,setWeather] = useState(null);

  const getWeather = async() => {
    if(!city){
      setError("please enter a city name");
      return;
    }
    try{
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      console.log(res);
      if(!res.ok) throw new Error("City not found");

      const data = await res.json();
      setWeather(data);
      setError("");
      updateCondition(data.weather[0].main); 
    } catch(err) {
        setError(err.message);
        setWeather(null);
    }
  }

  const updateCondition = (condition) => {
      document.body.className = "";

      if(condition === "Clear") document.body.classList.add('sunny-bg');
      else if(condition === "Rain") document.body.classList.add('rainy-bg');
      else if(condition === "Snow") document.body.classList.add('snowy-bg');
      else if(condition === "Clouds") document.body.classList.add('cloudy-bg');
      else if(condition === "Thunderstrom") document.body.classList.add('thunderstrom-bg');
      else if(condition === "Mist") document.body.classList.add("misty-bg");
  };

  const iconMap = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Snow: "❄️",
    Thunderstrom: "⛈️",
    Mist: "🌫️"
  };

  return (
    <div className="weather-box">
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter the city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        ></input>
        <button onClick={getWeather}>🔍︎</button>
      </div>
      {error && <p className="error-text">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>
            {weather.name},{weather.sys.country}
          </h2>
          <div className="temp-container">
            <p>
              <b>{Math.round(weather.main.temp)} °C</b>
            </p>
            <span>{iconMap[weather.weather[0].main] || "❓"}</span>
          </div>
          <p className="weather-description">
            {weather.weather[0].description}
          </p>
        </div>
      )}
    </div>
  );
}

export default Weather