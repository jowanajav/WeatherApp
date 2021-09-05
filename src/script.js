function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentMonth = date.getMonth();
  let currentDay = days[date.getDay()];
  let currentDate = date.getDate();
  let currentHour = date.getHours();
  let currentMinute = ("0" + date.getMinutes()).slice(-2);

  let formattedDate = `${
    currentMonth + 1
  }/${currentDate} ${currentDay} ${currentHour}:${currentMinute}`;

  return formattedDate;
}

function searchData(response) {
  let country = response.data.sys.country;
  let displayCountry = document.querySelector("#disp-country");
  let status = response.data.weather[0].description;
  let cityStatus = document.querySelector("#status-today");
  let temp = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#main-temperature");
  let feelsData = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#feels-like");
  let maxTempData = Math.round(response.data.main.temp_max);
  let maxTemp = document.querySelector("#main-max");
  let minTempData = Math.round(response.data.main.temp_min);
  let minTemp = document.querySelector("#main-min");

  displayCountry.innerHTML = `${country}`;

  cityStatus.innerHTML = `${status}`;
  cityTemp.innerHTML = `${temp}`;
  feelsLike.innerHTML = `${feelsData} `;
  maxTemp.innerHTML = `${maxTempData} `;
  minTemp.innerHTML = `/ ${minTempData}`;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "471a6be89778a7f92e1728b2754d799c";
  let inputCity = document.querySelector("#input-city");
  let cityValue = inputCity.value;
  let inputCapitalized = cityValue.split(" ");
  let searchedCity = document.querySelector("#disp-city");
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${inputCapitalized}&appid=${apiKey}&units=metric`;

  for (let i = 0; i < inputCapitalized.length; i++) {
    inputCapitalized[i] =
      inputCapitalized[i][0].toUpperCase() + inputCapitalized[i].substr(1);
  }

  if (document.getElementById("input-city").value.length == 0) {
    searchedCity.innerHTML = `Invalid City `;
  } else {
    searchedCity.innerHTML = `${inputCapitalized.join(" ")} `;
  }

  axios.get(apiUrl).then(searchData);
}

function currentCity(response) {
  let currentCity = response.data.name;
  let updateCity = document.querySelector("#disp-city");

  updateCity.innerHTML = `${currentCity}`;

  searchData(response);
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

let current = new Date();
let dateToday = document.querySelector("#date-today");
dateToday.innerHTML = formatDate(current);

let searchButton = document.querySelector("#search-city");
searchButton.addEventListener("click", searchCity);

let currentLocButton = document.querySelector("#current-loc");
currentLocButton.addEventListener("click", getCurrentLocation);
