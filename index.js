import { fetchResults } from "./fetchTracks.js"

getCurrentPosition();

function getCurrentPosition() {
    window.navigator.geolocation
        .getCurrentPosition(success, console.log);
}

function success(data) {
    const latitude = data.coords.latitude;
    const longitude = data.coords.longitude;
    // const cityName = fetchCityName(latitude, longitude);
    fetchResults(cityName);
}

//anropa Bennys, får tillbaka en var cityName;
var cityName = 'Malmö';