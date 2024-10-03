import { capitalize } from "lodash";
import { format, setHours, startOfHour } from "date-fns";
import rain from '../assets/rain.svg'

export const Gui = (function () {
  const icons = {
    'snow': '',
    'rain': '../assets/rain.svg',
    'fog': '',
    'wind': '',
    'cloudy': '',
    'partly-cloudy-day': '', 
    'partly-cloudy-night': '',
    'clear-day': '',
    'clear-night': '',
  }

  function clearElement(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

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

  function updateCurrentInfoPanel(data, system = "metric") {
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
    const img = document.querySelector(".current-location-icon");
    const url = icons[conditionCode]
    img.src = url;
  }

  function getNextHours(hours) {
    const nextHours = hours.filter((hour) => {
      const now = startOfHour(new Date());
      const comparedHour = setHours(new Date(), hours.indexOf(hour));
      return comparedHour > now;
    });

    return nextHours;
  }

  function updateHourlyForecast(hours, system = "metric") {
    const hourlyForecast = document.querySelector(".hourly-forecast");
    clearElement(hourlyForecast);

    getNextHours(hours).forEach((hour) => {
      const template = document.querySelector(".hourly-forecast-template");
      const newHourlyForecast = template.content.cloneNode(true);
      const unit = system === "metric" ? " °C" : " °F";

      newHourlyForecast.querySelector(".hour-hour").textContent =
        hour.datetime.slice(0, 5);
      newHourlyForecast.querySelector(".hour-condition").textContent =
        hour.conditions;
      newHourlyForecast.querySelector(".hour-temperature").textContent =
        (hour.temp.toFixed(0)) + unit;
      newHourlyForecast.querySelector(
        ".hour-icon"
      ).src = icons[hour.icon]

      hourlyForecast.appendChild(newHourlyForecast);
    });
  }

  function updateWeeklyForecast(days, system = "metric") {
    const weeklyForecast = document.querySelector(".weekly-forecast");
    clearElement(weeklyForecast);

    days.slice(1).forEach((day) => {
      const template = document.querySelector(".weekly-forecast-template");
      const newWeeklyForecast = template.content.cloneNode(true);
      const unit = system === "metric" ? " °C" : " °F";

      newWeeklyForecast.querySelector(".weekday-day").textContent = format(
        day.datetime,
        "d MMM"
      );
      newWeeklyForecast.querySelector(".weekday-condition").textContent =
        day.conditions;
      newWeeklyForecast.querySelector(
        ".weekday-min-max-temp"
      ).textContent = `${(day.tempmin).toFixed(0)} - ${(day.tempmax).toFixed(0)}${unit}`;
      newWeeklyForecast.querySelector(
        ".weekday-icon"
      ).src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/1st%20Set%20-%20Monochrome/${day.icon}.svg`;

      weeklyForecast.appendChild(newWeeklyForecast);
    });
  }

  return {
    updateLocation,
    updateDateTime,
    updateWeatherCondition,
    updateCurrentInfoPanel,
    updateIcon,
    updateHourlyForecast,
    updateWeeklyForecast
  };
})();
