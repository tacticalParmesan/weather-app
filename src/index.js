import "./style.css";
import { weatherAPI } from "./api";
import { Gui } from "./gui";
import { setHours, startOfHour } from "date-fns";

function loadListeners() {
  const search = document.querySelector(".searchbar");
  const searchButton = document.querySelector(".search-button");

  searchButton.onclick = () => getWeather(search.value);
}

async function getWeather(location) {
  const weatherData = await weatherAPI.fetchWeatherData(location);

  Gui.updateLocation(weatherData.address);
  Gui.updateDateTime();
  Gui.updateWeatherCondition(weatherData.currentConditions.conditions, weatherData.description);
  Gui.updateCurrentInfoPanel({
    temperature: weatherData.currentConditions.temp,
    feelsLike: weatherData.currentConditions.feelslike,
    todayMax: weatherData.days[0].tempmax,
    todayMin: weatherData.days[0].tempmin,
    precipprob: weatherData.currentConditions.precipprob
  });
  Gui.updateIcon(weatherData.currentConditions.icon);
  Gui.updateHourlyForecast(weatherData.days[0].hours)
  Gui.updateWeeklyForecast(weatherData.days)
  Gui.updateHumidity(weatherData.currentConditions.humidity)
  Gui.updateWind(weatherData.currentConditions.windspeed)
  Gui.updateSunrise(weatherData.currentConditions.sunrise)
  Gui.updateSunset(weatherData.currentConditions.sunset)

  
}

loadListeners();
getWeather('london')

