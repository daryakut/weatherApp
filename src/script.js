//fake data
function changeFar(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperatur");
  temp.innerHTML = "66";
}
let far = document.querySelector("#fahrenheit-link");
far.addEventListener("click", changeFar);

function changeCel(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperatur");
  temp.innerHTML = "19";
}
let cel = document.querySelector("#celsius-link");
cel.addEventListener("click", changeCel);

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

//change h1 by the city input

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchCityInput");
  let apiKey = "bae5c2a82b5d2bbadb52bfe79c8388f8";

  let city = cityInput.value;
  let urlKeyCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // let h1 = document.querySelector("h1");
  // h1.innerHTML = cityInput.value;

  axios.get(urlKeyCity).then(showWeather);
}

// function displayWeather(response) {
//   let temperature = Math.round(response.data.main.temp);
//   let temp = document.querySelector("#temperatur");
//   temp.innerHTML = `${temperature}°`;
// }

let searchForm = document.querySelector("#searchCity");
searchForm.addEventListener("submit", changeCity);

// get location by clicking current button, change h1 by the city input, change temperature for the real date
let currentBtn = document.querySelector("#currentBtn");
currentBtn.addEventListener("click", onCurrentBtnClick);

function onCurrentBtnClick() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function showWeather(response) {
  console.log(response);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;

  let temp = document.querySelector("#temperatur");
  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML = `${temperature}°`;
}

function retrievePosition(position) {
  console.log(position);
  let apiKey = "bae5c2a82b5d2bbadb52bfe79c8388f8";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
