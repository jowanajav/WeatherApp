function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
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
  let cityMinute = date.getMinutes();
  // let cityMinute = ("0" + date.getMinutes()).slice(-2);

  let formattedDate = `${
    cityMonth + 1
  }/${cityDate} ${cityDay} ${cityHour}:${cityMinute}`;

  return formattedDate;
}

function searchData(response) {
  console.log(response);
  let country = response.data.sys.country;
  let displayCountry = document.querySelector("#disp-country");
  let date = formatDate(response.data.dt);
  let displayDate = document.querySelector("#date-today");
  let cityWeather = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#description");
  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#main-temperature");
  let feelsData = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#feels-like");
  let maxTempData = Math.round(response.data.main.temp_max);
  let maxTemp = document.querySelector("#main-max");
  let minTempData = Math.round(response.data.main.temp_min);
  let minTemp = document.querySelector("#main-min");
  let humidity = response.data.main.humidity;
  let cityHumidity = document.querySelector("#humidity");
  let wind = response.data.wind.speed;
  let displayWind = document.querySelector("#wind");
  let iconData = document.querySelector("#main-icon");

  displayCountry.innerHTML = `${country}`;
  displayDate.innerHTML = `${date}`;
  weatherDescription.innerHTML = `${cityWeather}`;
  cityTemp.innerHTML = `${temperature}`;
  feelsLike.innerHTML = `${feelsData} `;
  maxTemp.innerHTML = `${maxTempData} `;
  minTemp.innerHTML = `/ ${minTempData}`;
  cityHumidity.innerHTML = `${humidity}`;
  displayWind.innerHTML = `${wind}`;
  iconData.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

let searchButton = document.querySelector("#search-city");
searchButton.addEventListener("click", searchCity);

let currentLocButton = document.querySelector("#current-loc");
currentLocButton.addEventListener("click", getCurrentLocation);
