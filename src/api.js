export const weatherAPI = (function () {
  async function fetchWeatherData(location) {
    // Can be exposed only because it is already public!
    const apiKey = "BLQEBZMAFC2GUF5LPVZ57M7VU";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}`;

    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();
    console.log(data)
    return data;
  }

  return { fetchWeatherData }
})();
