import './style.css';

let weatherData = {};

const requestWeatherData = async (city) => {
    try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=c34721a8a254440e973185754230607&q=${city}&aqi=no`)
    const jsonResponse = await response.json();
    pushWeatherData(jsonResponse);
    updateWeatherBox();
    } catch (error) {
        alert("City invalid. Please enter a valid city");
    }
}

const pushWeatherData = (data) => {
    weatherData = {};
    weatherData.location = data.location.name;
    weatherData.currentCondition = data.current.condition.text;
    weatherData.currentTemp = data.current.temp_c;
    weatherData.feelsLike = data.current.feelslike_c;
    weatherData.windSpeed = data.current.wind_kph;
    weatherData.humidity = data.current.humidity;
    weatherData.precipitation = data.current.precip_mm;
}

//Search button functionality
const search = document.getElementById('search');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', () => {
    requestWeatherData(search.value);
});

search.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        requestWeatherData(search.value);
    }
});

//DOM Stuff
const cityName = document.getElementById('cityName');
const condition = document.getElementById('conditions');
const temperature = document.getElementById('temperature');
const feelsLike = document.getElementById('feelsLike');
const windSpeed = document.getElementById('windSpeed');
const humidity = document.getElementById('humidity');
const precipitation = document.getElementById('precipitation');

export function updateWeatherBox() {
    cityName.textContent = weatherData.location
    condition.textContent = weatherData.currentCondition
    temperature.textContent = `${weatherData.currentTemp} °C`;
    feelsLike.textContent = `Feels like: ${weatherData.feelsLike} °C`;
    windSpeed.textContent = `Wind Speed: ${weatherData.windSpeed} km/hr`;
    humidity.textContent = `Humidity: ${weatherData.humidity}%`;
    precipitation.textContent = `Precipitation: ${weatherData.precipitation} mm`;
}

requestWeatherData("Vancouver");


