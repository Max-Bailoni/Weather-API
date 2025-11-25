document.getElementById('goBtn').addEventListener('click', async () => {
    const cityName = document.getElementById('cityInput').value.trim();
    if(!cityName) return;

    const locUrl = `goForCity.php?cityName=${encodeURIComponent(cityName)}`;

    try {
        const locRes = await fetch(locUrl);
        const locData = await locRes.json();
        if(locData.length === 0) {
            document.getElementById('result').innerHTML = 'City not found!';
            return;
        }
        const cityKey = locData[0].Key;
        const fullName = `${locData[0].LocalizedName}, ${locData[0].Country.LocalizedName};`;
        fetchWeather(cityKey, fullName);
        fiveForecast(cityKey, fullName);
    } catch (error) {
        document.getElementById('result').innerHTML = "Error fetching city data";
    }
});

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

async function fiveForecast(cityKey, cityName) {
    let url = `fiveDays.php?cityKey=${cityKey}`;
    const response = await fetch(url);
    const data = await response.json(); 
    console.log(data);

    document.getElementById('result').innerHTML +=  `<h1>Five days forecast of: ${cityName}`;
    let html = ``;
    data.DailyForecasts.forEach(day => {
        html +=`<div>
                    <p>${new Date(day.Date).toLocaleDateString()}</p>
                    <p>Min: ${day.Temperature.Minimum.Value}F</p><p>Max: ${day.Temperature.Maximum.Value}F</p>
                    <p>Sunrise: ${new Date(day.Sun.Rise).toLocaleTimeString()}</p>
                </div>`;
    });
    document.getElementById('result').innerHTML += html;
}

fetchWeather("328328", "London");
fiveForecast("328328", "London");

