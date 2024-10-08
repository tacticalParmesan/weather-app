import { capitalize } from "lodash";
import { format, setHours, startOfHour } from "date-fns";

export const Gui = (function () {
  const icons = {
    'snow': 'https://raw.githubusercontent.com/erikflowers/weather-icons/bb80982bf1f43f2d57f9dd753e7413bf88beb9ed/svg/wi-snow.svg',
    'rain': `https://raw.githubusercontent.com/erikflowers/weather-icons/bb80982bf1f43f2d57f9dd753e7413bf88beb9ed/svg/wi-rain.svg`,
    'fog': 'https://raw.githubusercontent.com/erikflowers/weather-icons/bb80982bf1f43f2d57f9dd753e7413bf88beb9ed/svg/wi-fog.svg',
    'wind': 'https://raw.githubusercontent.com/erikflowers/weather-icons/bb80982bf1f43f2d57f9dd753e7413bf88beb9ed/svg/wi-strong-wind.svg',
    'cloudy': 'https://raw.githubusercontent.com/erikflowers/weather-icons/bb80982bf1f43f2d57f9dd753e7413bf88beb9ed/svg/wi-cloudy.svg',
    'partly-cloudy-day': 'https://raw.githubusercontent.com/erikflowers/weather-icons/bb80982bf1f43f2d57f9dd753e7413bf88beb9ed/svg/wi-day-cloudy.svg', 
    'partly-cloudy-night': 'https://raw.githubusercontent.com/erikflowers/weather-icons/bb80982bf1f43f2d57f9dd753e7413bf88beb9ed/svg/wi-night-alt-cloudy.svg',
    'clear-day': 'https://raw.githubusercontent.com/erikflowers/weather-icons/bb80982bf1f43f2d57f9dd753e7413bf88beb9ed/svg/wi-day-sunny.svg',
    'clear-night': 'https://raw.githubusercontent.com/erikflowers/weather-icons/bb80982bf1f43f2d57f9dd753e7413bf88beb9ed/svg/wi-night-clear.svg',
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

  function updateWeatherCondition(condition, conditionText) {
    const currentCondition = document.querySelector(".current-condition-text");
    const conditionDesc = document.querySelector(".current-condition-desc")
    currentCondition.textContent = condition;
    conditionDesc.textContent = conditionText 
  }

  function updateCurrentInfoPanel(data, system = "metric") {
    const temperature = document.querySelector(".temperature");
    const feelsLike = document.querySelector(".feels-like");
    const todayMax = document.querySelector(".today-max");
    const todayMin = document.querySelector(".today-min");
    const precipitations = document.querySelector(".precipitations")
    const unit = system === "metric" ? " °C" : " °F";

    temperature.textContent = data.temperature + unit;
    feelsLike.textContent = "Feels like " + data.feelsLike + unit + ".";
    todayMax.textContent = data.todayMax + unit;
    todayMin.textContent = data.todayMin + unit;
    precipitations.textContent = data.precipprob + " %"
  }

  function updateIcon(conditionCode) {
    const img = document.querySelector(".current-location-icon");
    img.src = icons[conditionCode];
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
      ).src = icons[day.icon]

      weeklyForecast.appendChild(newWeeklyForecast);
    });
  }

  function updateHumidity(humidityValue) {
    const humidityText = document.querySelector('.humidity')
    humidityText.textContent = humidityValue.toFixed(1) + ' %'
  }

  function updateWind(windValue) {
    const windText = document.querySelector('.wind')
    windText.textContent = windValue + ' km/h'
  }

  function updateSunrise(sunriseValue) {
    const sunriseText = document.querySelector('.sunrise')
    sunriseText.textContent = sunriseValue
  }

  function updateSunset(sunsetValue) {
    const sunsetText = document.querySelector('.sunset')
    sunsetText.textContent = sunsetValue
  }

  return {
    updateLocation,
    updateDateTime,
    updateWeatherCondition,
    updateCurrentInfoPanel,
    updateIcon,
    updateHourlyForecast,
    updateWeeklyForecast,
    updateHumidity,
    updateWind,
    updateSunrise,
    updateSunset
  };
})();
