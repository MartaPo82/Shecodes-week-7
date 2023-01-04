function getForecast(coordinates) {
  let apiKey = "9e0fb79c2f66d0cd0dcf06710976a873";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
}

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}
function search(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  let cityValue = document.querySelector("#city");
  cityValue.innerHTML = cityInputElement.value;

  let city = cityInputElement.value;
  let apiKey = "9e0fb79c2f66d0cd0dcf06710976a873";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getUTCHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dataValue = document.querySelector("#date");
dataValue.innerHTML = `${day}, ${hour}:${minutes}`;

//forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["tue", "wed", "thu", "fri", "sat"];
  forecastHTML = `<div class = "row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
 <div class="weather-forecast-date">
    ${day}
    </div>
<img src="img/sun.png" alt="clear" id="icon" width="40px"/>
<br />
<div class="weather-forecast-temperature">
<span class="weather-forecast-temperature-min">
  12
</span>
  -
  <span class="weather-forecast-temperature-max">
18
  </span>
</div>
</div>
    `;
  });
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();

let celsiusTemperature = null;

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);
