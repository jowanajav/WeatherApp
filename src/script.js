function formatDate(timestamp) {
  let date = getDate(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let cityMonth = date.getMonth();
  let cityDate = date.getDate();
  let cityDay = days[date.getDay()];
  let cityHour = date.getHours();
  let cityMinute = ("0" + date.getMinutes()).slice(-2);

  let formattedDate = `${
    cityMonth + 1
  }/${cityDate} ${cityDay} ${cityHour}:${cityMinute}`;

  return formattedDate;
}

function getDate(timezone) {
  let date = new Date();
  let localOffset = date.getTimezoneOffset() * 60000;
  let utc = Date.now() + localOffset;
  let localTimezone = utc + timezone * 1000;

  return new Date(localTimezone);
}

// function getTemp(temperature) {
//   // let cityTemp = document.querySelector("#main-temperature");
//   let celciusUnit = document.querySelector("#celcius-unit");

//   // cityTemp.innerHTML = `${temperature}`;

//   if (celciusUnit === document.activeElement) {
//     displayCelcius;
//   } else {
//     displayFahrenheit;
//   }
// }

function getForecastMonth(timestamp) {
  let date = new Date(timestamp * 1000);
  let month = date.getMonth();

  return month + 1;
}

function getForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let dateDay = date.getDate();

  return dateDay;
}

function getForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastData = response.data.daily;
  let forecast = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  forecastData.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="forecast-date">
          <span class="bottom-date">${getForecastMonth(
            forecastDay.dt
          )}/${getForecastDate(forecastDay.dt)}</span>
          <span class="bottom-day">${getForecastDay(forecastDay.dt)}</span>
        </div>
        <img src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="Snow Icon" id="bottom-icon" />
        <div class="bottom-status">${forecastDay.weather[0].description}</div>
        <div class="bottom-temp">
          <span class="bottom-maxTemp">${Math.round(
            forecastDay.temp.max
          )}??</span>
          <span class="bottom-minTemp">${Math.round(
            forecastDay.temp.min
          )}??</span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getFahrenheitForecast(coordinates) {
  let apiKey = "471a6be89778a7f92e1728b2754d799c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function getForecast(coordinates) {
  let apiKey = "471a6be89778a7f92e1728b2754d799c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function searchData(response) {
  let city = response.data.name;
  let displayCity = document.querySelector("#disp-city");
  let country = response.data.sys.country;
  let displayCountry = document.querySelector("#disp-country");
  let date = formatDate(response.data.timezone);
  let displayDate = document.querySelector("#date-today");
  let cityWeather = response.data.weather[0].description;
  let cityTemp = document.querySelector("#main-temperature");
  let weatherDescription = document.querySelector("#description");
  let feelsLike = document.querySelector("#feels-like");
  let maxTemp = document.querySelector("#main-max");
  let minTemp = document.querySelector("#main-min");
  let humidity = response.data.main.humidity;
  let cityHumidity = document.querySelector("#humidity");
  let wind = response.data.wind.speed;
  let displayWind = document.querySelector("#wind");
  let iconData = document.querySelector("#main-icon");

  celciusTemperature = Math.round(response.data.main.temp);
  feelsCelciusTemp = Math.round(response.data.main.feels_like);
  maxCelciusTemp = Math.round(response.data.main.temp_max);
  minCelciusTemp = Math.round(response.data.main.temp_min);
  coordinates = response.data.coord;

  displayCity.innerHTML = `${city}`;
  displayCountry.innerHTML = `${country}`;
  displayDate.innerHTML = `${date}`;
  weatherDescription.innerHTML = `${cityWeather}`;
  cityTemp.innerHTML = `${celciusTemperature}`;
  feelsLike.innerHTML = `${feelsCelciusTemp}??C`;
  maxTemp.innerHTML = `${maxCelciusTemp}??C`;
  minTemp.innerHTML = ` ${minCelciusTemp}??C`;
  cityHumidity.innerHTML = `${humidity}`;
  displayWind.innerHTML = `${wind}`;
  iconData.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  // getTemp(celciusTemperature);
  getForecast(coordinates);
}

function searchCity(city) {
  let apiKey = "471a6be89778a7f92e1728b2754d799c";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`;
  fahrenheitUnit.classList.remove("active");
  celciusUnit.classList.add("active");

  axios.get(apiUrl).then(searchData);
}

function handleCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#input-city");

  searchCity(searchedCity.value);
}

function currentCity(response) {
  let currentCity = response.data.name;
  let updateCity = document.querySelector("#disp-city");

  updateCity.innerHTML = `${currentCity}`;

  searchData(response);
  getForecast(response.data.coord);
}

function getPosition(position) {
  let currentLatitude = position.coords.latitude;
  let currentLongitude = position.coords.longitude;
  let apiKey = "471a6be89778a7f92e1728b2754d799c";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentCity);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let tempToFahrenheit = (celciusTemperature * 9) / 5 + 32;
  let feelsToFahrenheit = (feelsCelciusTemp * 9) / 5 + 32;
  let maxToFahrenheit = (maxCelciusTemp * 9) / 5 + 32;
  let minToFahrenheit = (minCelciusTemp * 9) / 5 + 32;

  let fahrenheitTemp = document.querySelector("#main-temperature");
  let feelsLike = document.querySelector("#feels-like");
  let maxTemp = document.querySelector("#main-max");
  let minTemp = document.querySelector("#main-min");

  celciusUnit.classList.remove("active");
  fahrenheitUnit.classList.add("active");
  fahrenheitTemp.innerHTML = Math.round(tempToFahrenheit);
  feelsLike.innerHTML = `${Math.round(feelsToFahrenheit)}??F`;
  maxTemp.innerHTML = `${Math.round(maxToFahrenheit)}??F`;
  minTemp.innerHTML = `${Math.round(minToFahrenheit)}??F`;

  getFahrenheitForecast(coordinates);
}

function displayCelcius(event) {
  event.preventDefault();
  let celciusTemp = document.querySelector("#main-temperature");
  let feelsLike = document.querySelector("#feels-like");
  let maxTemp = document.querySelector("#main-max");
  let minTemp = document.querySelector("#main-min");

  fahrenheitUnit.classList.remove("active");
  celciusUnit.classList.add("active");
  celciusTemp.innerHTML = celciusTemperature;
  feelsLike.innerHTML = `${Math.round(feelsCelciusTemp)}??C`;
  maxTemp.innerHTML = `${Math.round(maxCelciusTemp)}??C`;
  minTemp.innerHTML = `${Math.round(minCelciusTemp)}??C`;

  getForecast(coordinates);
}

let celciusTemperature = null;
let feelsCelciusTemp = null;
let maxCelciusTemp = null;
let minCelciusTemp = null;
let coordinates = null;

let searchButton = document.querySelector("#search-city");
searchButton.addEventListener("click", handleCity);

let currentLocButton = document.querySelector("#current-loc");
currentLocButton.addEventListener("click", getCurrentLocation);

let fahrenheitUnit = document.querySelector("#fahrenheit-unit");
fahrenheitUnit.addEventListener("click", displayFahrenheit);

let celciusUnit = document.querySelector("#celcius-unit");
celciusUnit.addEventListener("click", displayCelcius);

searchCity(`Tokyo`);
