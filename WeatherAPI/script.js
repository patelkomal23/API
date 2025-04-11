const apiKey = '07d314d4d704a8be0dbe24143d31b27b';
const cities = [
    { name: 'Rome', lat: 41.9028, lon: 12.4964 },
    { name: 'Paris', lat: 48.8566, lon: 2.3522 },
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'Tokyo', lat: 35.6895, lon: 139.6917 },
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'Brazil', lat: -14.2350, lon: -51.9253 },
    { name: 'India', lat: 20.5937, lon: 78.9629 },
    { name: 'China', lat: 35.8617, lon: 104.1954 },
    { name: 'Russia', lat: 61.5240, lon: 105.3188 },
    { name: 'Japan', lat: 36.2048, lon: 138.2529 },
    { name: 'South Africa', lat: -30.5595, lon: 22.9375 },
    { name: 'Mexico', lat: 23.6345, lon: -102.5528 },
    { name: 'Saudi Arabia', lat: 23.8859, lon: 45.0792 },
    { name: 'Turkey', lat: 38.9637, lon: 35.2433 }
];

const citySelect = document.getElementById('cities');
const weatherInfo = document.getElementById('weather-info');

cities.forEach(city => {
    const option = document.createElement('option');
    option.value = JSON.stringify(city);
    option.text = city.name;
    citySelect.appendChild(option);
});

function getWeather() {
    const selected = citySelect.value;


    const { lat, lon, name } = JSON.parse(selected);

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
            const { temp, humidity } = data.main;
            const wind = data.wind.speed;
            const desc = data.weather[0].description;
            const icon = data.weather[0].icon;

            weatherInfo.innerHTML = `
    <h5>${name}</h5>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
    <p><strong>${desc}</strong></p>
    <p>Temperature: ${temp} °C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind: ${wind} m/s</p>
  `;
        })
        .catch(err => {
            console.error(err);
        });
}