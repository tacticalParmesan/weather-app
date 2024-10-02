import "./style.css";
import { weatherAPI } from "./api";
import { Gui } from "./gui";

function loadListeners() {
  const search = document.querySelector(".searchbar");
  const searchButton = document.querySelector(".search-button");

  searchButton.onclick = () => getWeather(search.value);
}

async function getWeather(location) {
  const weatherData = await weatherAPI.fetchWeatherData(location);

  Gui.updateLocation(weatherData.address)
  Gui.updateDateTime()
  Gui.updateWeatherCondition(weatherData.currentConditions.conditions)
  Gui.updateCurrentInfoPanel({
    temperature: weatherData.currentConditions.temp,
    feelsLike: weatherData.currentConditions.feelslike,
    todayMax: weatherData.days[0].tempmax,
    todayMin: weatherData.days[0].tempmin
  })
  Gui.updateIcon(weatherData.currentConditions.icon)
}

loadListeners();
