const onLoadScreen = document.querySelector("#onLoadScreen");
const weatherShownScreen = document.querySelector("#weatherShown");
const weatherReadout = document.querySelector("#weatherReadout");

let longitude;
let latitude;
let weatherJSON;
const APIKey = "ZDFhNTBkMDdkZTc2ZGYxYjdlZmYyZTk4ZjUyODI0ZGU=";




window.addEventListener('click', function () {
    getLocation()
    if (longitude !== undefined && latitude !== undefined) {
        console.log(weatherJSON)
        changeScreens()
        displayWeather()
    }
})

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLongAndLat);
    } else {
        message = "Geolocation is not supported by this browser.";
    }
}
function getLongAndLat(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getWeatherData()
}

function changeScreens() {
    onLoadScreen.style.display = "none";
    weatherShownScreen.style.display = "block";
}

function getWeatherData() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${atob(APIKey)}`)
        .then(response => response.json())
        .then(data => weatherJSON = data)
}

function displayWeather() {
    weatherReadout.innerHTML = `In ${weatherJSON.name}, there will be highs of ${Math.round(weatherJSON.main.temp_max - 273)}&#176;C and lows of ${Math.round(weatherJSON.main.feels_like - 273)}&#176;C. Currently, it will feel like ${Math.round(weatherJSON.main.temp_min - 273)}&#176;C.
    Overall today there will be ${weatherJSON.weather[0].description}.`
}