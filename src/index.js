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
}

function searchLocation(city) {
  let apiKey = "faftf8c5db0d7963393a000835od40b9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function searchGeo(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
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

let h2 = document.querySelector("h2");
let now = new Date();
h2.innerHTML = formatDate(now);

let form = document.querySelector("form");
form.addEventListener("submit", submit);

let currentLocation = document.querySelector("#current");
currentLocation.addEventListener("click", getCurrentLocation);
