document.addEventListener("DOMContentLoaded", () => {
    let txtInput = document.querySelector(".textInput");
    let btn = document.querySelector("#Btn");
    let cityName = document.getElementById("city-name");
    let temp = document.getElementById("temperature");
    let desc = document.getElementById("description");
    let errorMsg = document.getElementById("error-message");

    const API_KEY = "7cd221e22a4c99e57e4c43461fccaa14"; // env variables

    btn.addEventListener("click", async function () {
        const city = txtInput.value.trim();
        if (!city) return;

        try {
            const weatherData = await fetchWeatherData(city)
            displayWeatherData(weatherData);
        }
        catch (error) {
            showError(city);
        }


        txtInput.value = "";
    });

    async function fetchWeatherData(city) {
        //gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

        const response = await fetch(url)
        // console.log(typeof response)
        console.log("RESPONSE", response);

        if (!response.ok) {
            throw new Error(`City ${city} Not Found`);
        }


        const data = await response.json()
        return data;
    }

    function displayWeatherData(weatherData) {
        // display
        console.log(weatherData)
        cityName.textContent = weatherData.name;
        temp.textContent = `${weatherData.main.temp} °C`;
        desc.textContent = weatherData.weather[0].description;


        weatherInfo.classList.remove("hidden")
        errorMsg.classList.add("hidden")

    }

    const weatherInfo = document.getElementById("weather-info")

    function showError(city) {
        weatherInfo.classList.add("hidden")
        errorMsg.classList.remove("hidden")
        errorMsg.textContent = `City "${city}" not found. Please try again.`; // custom message
    }


})