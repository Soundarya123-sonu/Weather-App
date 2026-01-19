function getWeather() {
    const city = document.getElementById("city").value.trim();
    const resultDiv = document.getElementById("result");

    if (city === "") {
        resultDiv.innerHTML = " Please enter a city name";
        return;
    }

    resultDiv.innerHTML = "⏳ Loading...";

    // Step 1: Convert city → latitude & longitude
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

    fetch(geoURL)
        .then(res => res.json())
        .then(geoData => {

            if (!geoData.results || geoData.results.length === 0) {
                resultDiv.innerHTML = "❌ City not found";
                return;
            }

            const place = geoData.results[0];
            const lat = place.latitude;
            const lon = place.longitude;
            const cityName = place.name;
            const country = place.country;

            // Step 2: Get weather using Open-Meteo
            const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

            fetch(weatherURL)
                .then(res => res.json())
                .then(data => {

                    const weather = data.current_weather;

                    resultDiv.innerHTML = `
                        <h3>${cityName}, ${country}</h3>
                        <p>🌡️ Temperature: ${weather.temperature} °C</p>
                        <p>💨 Wind Speed: ${weather.windspeed} km/h</p>
                    `;
                });
        })
        .catch(() => {
            resultDiv.innerHTML = "⚠️ Error fetching data";
        });
}
