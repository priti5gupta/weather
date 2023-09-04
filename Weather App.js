const fetchButton = document.getElementById('fetchButton');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';

fetchButton.addEventListener('click', () => {
  const location = locationInput.value;
  if (location) {
    fetchWeather(location);
  } else {
    weatherInfo.innerHTML = 'Please enter a location.';
  }
});

async function fetchWeather(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    location
  )}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      displayWeather(data);
    } else {
      weatherInfo.innerHTML = 'Error fetching weather data.';
    }
  } catch (error) {
    console.error('Error:', error);
    weatherInfo.innerHTML = 'An error occurred while fetching weather data.';
  }
}

function displayWeather(data) {
  const { name, main, weather } = data;
  const temperature = main.temp;
  const description = weather[0].description;

  weatherInfo.innerHTML = `
    <h2>Weather in ${name}</h2>
    <p><strong>Temperature:</strong> ${temperature} °C</p>
    <p><strong>Weather:</strong> ${description}</p>
  `;
}
