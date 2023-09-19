function formatDate() {
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDay = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[weekDay];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday"];
  
  let forecastHTML = `<div class="row">`;
  days.forEach(function(day){
  forecastHTML = forecastHTML +
  `<div class="col-2">
  <div class="forecast-day">${day}</div>
  <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png" width="40" height="40" alt="clear" id="icon"></img><br />
  <span class="forecast-high">93°</span> | <span class="forecast-low">63°</span>
  </div>`;
});
  forecastHTML = forecastHTML + `</div>`;
  document.querySelector("#forecast").innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "faftf8c5db0d7963393a000835od40b9"
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude
}&key=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let city = document.querySelector("#city");
  let h1 = document.querySelector("#location");
  h1.innerHTML = city.value;

  document.querySelector("#temp").innerHTML = Math.round(response.data.temperature.current);
  document.querySelector(".description").innerHTML = response.data.condition.description;
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#emoji").setAttribute("src", (response.data.condition.icon_url));
  document.querySelector("#emoji").setAttribute("alt", (response.data.condition.description));
  fahrenheitTemp = response.data.temperature.current;
  getForecast(response.data.coordinates);
}


function searchLocation(city) {
  let apiKey = "faftf8c5db0d7963393a000835od40b9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function searchGeo(position) {
  let lat = response.data.coordinates.latitude;
  let long = response.data.coordinates.longitude;
  let apiKey = "faftf8c5db0d7963393a000835od40b9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  searchLocation(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchGeo);
}

function displayCelsius(event) {
  event.preventDefault();
  let celsiusTemp = (fahrenheitTemp - 32) * (5 / 9);
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemp);
}

function displayFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#temp").innerHTML = Math.round(fahrenheitTemp);
}

let h2 = document.querySelector("h2");
let now = new Date();
h2.innerHTML = formatDate(now);

let fahrenheitTemp = null;

let form = document.querySelector("form");
form.addEventListener("submit", submit);

let currentLocation = document.querySelector("#current");
currentLocation.addEventListener("click", getCurrentLocation);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

searchLocation("Denver");