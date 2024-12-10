import { useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./Api";
import "./App.css";
import CurrentWeather from "./components/currentWeather/CurrentWeather";
import Search from "./components/search/Search";
import Forecast from "./components/forecast/Forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleSearchChange = (searchData) => {
    // These here are the values for the location...
    const [lat, lon] = searchData.value.split(" ");

    // using the values for the location, we can then fetch data
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    // used the Promise.all to fetch both api calls...(currentWeather && forecast)
    Promise.all([currentWeatherFetch, forecastFetch]).then(async (response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({ city: searchData.label, ...weatherResponse });
      setForecast({ city: searchData.label, ...forecastResponse });
    });
  };

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
