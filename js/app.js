const apiKey = 'bd16560540f1247305ff7e416bd021d9';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const errorDiv = document.querySelector('.error');
const weatherDiv = document.querySelector('.weather');
const cityElem = document.querySelector('.city');
const tempElem = document.querySelector('.temp');
const humidityElem = document.querySelector('.humidity');
const windElem = document.querySelector('.wind');

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 404) throw new Error('City not found');
        throw new Error('Failed to fetch weather data');
    }

    return response.json();
}

function updateWeatherIcon(weatherMain) {
    const icons = {
        'Clouds': 'images/clouds.png',
        'Clear': 'images/clear.png',
        'Rain': 'images/rain.png',
        'Drizzle': 'images/drizzle.png',
        'Mist': 'images/mist.png'
    };
    weatherIcon.src = icons[weatherMain] || '';
}

function displayWeather(data) {
    errorDiv.style.display = 'none';
    weatherDiv.style.display = 'block';

    cityElem.textContent = data.name;
    tempElem.textContent = `${Math.round(data.main.temp)}°C`;
    humidityElem.textContent = `${data.main.humidity}%`;
    windElem.textContent = `${data.wind.speed} km/h`;

    updateWeatherIcon(data.weather[0].main);
}

function showError(message) {
    errorDiv.style.display = 'block';
    errorDiv.textContent = message;
    weatherDiv.style.display = 'none';
}

async function checkWeather(city) {
    try {
        const data = await fetchWeather(city);
        displayWeather(data);
    } catch (error) {
        console.error(error);
        showError(error.message);
    }
}

function handleSearch() {
    const city = searchBox.value.trim();
    if (city) checkWeather(city);
}

searchBtn.addEventListener('click', handleSearch);
searchBox.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') handleSearch();
});
