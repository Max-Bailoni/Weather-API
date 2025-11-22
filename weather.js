

async function fetchWeather(cityKey, cityName) {
    try {
         let url = `weather.php?cityKey=${cityKey}`; 
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        const temperature = data[0].Temperature.Metric.Value;
        const weatherText = data[0].WeatherText;
        const realFeel = data[0].RealFeelTemperature.Metric.Value;
        // const weatherIcon = data[0].WeatherIcon;                 Not working in test version
        // const iconNumber = weatherIcon < 10 ? `0${weatherIcon}` : weatherIcon;
        // const iconUrl = `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`;
        const result = document.getElementById('result');
        result.innerHTML = `
            <div>
                <h1>${cityName}</h1>
                <p>Temperature: ${temperature}°C</p>
                <p>It is ... ${weatherText}</p>
                <p>Real Feel: ${realFeel}°C</p>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching weather data: ' + error);
    }
}
fetchWeather("328328", "London");

