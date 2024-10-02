import { capitalize } from "lodash";
import { format, setHours, startOfHour } from "date-fns";

export const Gui = (function () {
  function updateLocation(location) {
    const currentLocation = document.querySelector(".location-name");
    currentLocation.textContent = capitalize(location);
  }

  function updateDateTime() {
    const time = document.querySelector("time");
    time.value = new Date();
    time.textContent = format(new Date(), "d MMM yyyy");
  }

  function updateWeatherCondition(condition) {
    const currentCondition = document.querySelector(".current-condition-text");
    currentCondition.textContent = condition;
  }

  function updateCurrentInfoPanel(data, system='metric') {
    const temperature = document.querySelector(".temperature");
    const feelsLike = document.querySelector(".feels-like");
    const todayMax = document.querySelector(".today-max");
    const todayMin = document.querySelector(".today-min");
    const unit = system === "metric" ? " °C" : " °F";

    temperature.textContent = "Temperature: " + data.temperature + unit;
    feelsLike.textContent = "Feels like: " + data.feelsLike + unit;
    todayMax.textContent = "Today max: " + data.todayMax + unit;
    todayMin.textContent = "Today min: " + data.todayMin + unit;
  }

  function updateIcon(conditionCode) {
    const img = document.querySelector('.current-location-icon')
    const url = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/1st%20Set%20-%20Monochrome/${conditionCode}.svg`
    img.src = url;
}

function getNextHours(hours) {
  const nextHours = hours.filter((hour) => {
    const now = startOfHour(new Date())
    const comparedHour = setHours(new Date(), hours.indexOf(hour))
    return comparedHour > now
  });
  
  return nextHours
}

function updateHourlyForecast(hours) {
  const hourlyForecast = document.querySelector('.hourly-forecast')
  getNextHours(hours).forEach((hour) => {
    const template = document.querySelector(".hourly-forecast-template")
    const newHourlyForecast = template.content.cloneNode(true)

    newHourlyForecast.querySelector('.hour-hour').textContent = hour.datetime.slice(0, 5)
    hourlyForecast.appendChild(newHourlyForecast)

  })
}

  return {
    updateLocation,
    updateDateTime,
    updateWeatherCondition,
    updateCurrentInfoPanel,
    updateIcon,
    updateHourlyForecast
  };
})();
