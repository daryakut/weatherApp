//fake data
let celsiusTemperature;

function changeFar(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperatur");
  celClick.classList.remove("active");
  farClick.classList.add("active");
  let farTemp = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(farTemp);
}
let farClick = document.querySelector("#fahrenheit-link");
farClick.addEventListener("click", changeFar);

function changeCel(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperatur");
  celClick.classList.add("active");
  farClick.classList.remove("active");
  temp.innerHTML = celsiusTemperature;
}
let celClick = document.querySelector("#celsius-link");
celClick.addEventListener("click", changeCel);

//real time
let currentTime = new Date();

function formatDate(date1) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentMin = date1.getMinutes();
  let currentHours = date1.getHours();
  let currentDay = days[date1.getDay()];
  let formattedDate = `${currentDay} ${currentHours}:${currentMin}`;
  return formattedDate;
}
let time = document.querySelector("#times");
time.innerHTML = formatDate(currentTime);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = "say smth";

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//change h1 by the city input

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchCityInput");
  let apiKey = "bae5c2a82b5d2bbadb52bfe79c8388f8";

  let city = cityInput.value;
  let urlKeyCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(urlKeyCity).then(showWeather);
}

let searchForm = document.querySelector("#searchCity");
searchForm.addEventListener("submit", changeCity);

// get location by clicking current button, change h1 by the city input, change temperature for the real date
let currentBtn = document.querySelector("#currentBtn");
currentBtn.addEventListener("click", onCurrentBtnClick);

function onCurrentBtnClick() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "bae5c2a82b5d2bbadb52bfe79c8388f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  console.log(response);
  celsiusTemperature = Math.round(response.data.main.temp);

  let cityName = document.querySelector("#cityName");
  cityName.innerHTML = `${response.data.name}`;

  let temp = document.querySelector("#temperatur");
  temp.innerHTML = `${celsiusTemperature}°`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.main.humidity}%`;

  let windElement = document.querySelector("#wind");
  let speed = Math.round(response.data.wind.speed);
  windElement.innerHTML = speed + "km/h";

  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function retrievePosition(position) {
  console.log(position);
  let apiKey = "bae5c2a82b5d2bbadb52bfe79c8388f8";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function search(city) {
  let apiKey = "bae5c2a82b5d2bbadb52bfe79c8388f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

// displayForecast();
