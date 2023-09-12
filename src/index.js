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

  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#emoji").innerHTML = response.data.weather[0].main;
}

function searchLocation(city) {
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function searchGeo(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
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
