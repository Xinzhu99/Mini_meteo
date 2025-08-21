const cityInput = document.querySelector("#cityInput");
const button = document.querySelector("#btn");
const gps = document.querySelector("#gps");
const city = document.querySelector("#city");
const temperature = document.querySelector("#temperature");
const humidity = document.querySelector("#humidity");

//! en cas d'input : penser à vider le champs d'abord sinon à la fin de eventlistener */
cityInput.value = "";

const fetchCoordinates = async (city) => {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&addressdetails=1&limit=1`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("Error: having problem of connecting to API");
    };
};

const fetchWeather = async (lat, lon) => {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,relative_humidity_2m`);
        const dataWeather = await response.json();
        return dataWeather;
    }
    catch (error) {
        console.log("Error: having problem of connecting to API");

    };

};

const showData = async () => {
    const coordinatesData = await fetchCoordinates(cityInput.value);
    if (coordinatesData[0]) {
        const lat = await coordinatesData[0].lat;
        const lon = await coordinatesData[0].lon;
        gps.textContent = `Coordonnées : ${lat} ${lon}`;

        const dataWeather = await fetchWeather(lat, lon);
        const degrees = await dataWeather.current.temperature_2m;
        const relativeHumidity = await dataWeather.current.relative_humidity_2m;

        temperature.textContent = `${degrees}°C`;
        humidity.textContent = `Humidité : ${relativeHumidity}%`;

    } else {
        city.textContent = "Ville non trouvée"
    };
};


button.addEventListener("click", () => {
    const uppercaseCity = cityInput.value.toUpperCase();

    city.textContent = `${uppercaseCity}`;

    showData();
});

