import { fetchResults } from "./fetchTracks.js"
import { fetchCityName } from "./fetchCityName.js"

getCurrentPosition();

function getCurrentPosition() {
    window.navigator.geolocation
        .getCurrentPosition(success, console.log);
}

function success(data) {
    const latitude = data.coords.latitude;
    const longitude = data.coords.longitude;
    const cityName = fetchCityName(latitude, longitude);
    //const listWithTracks = fetchResults(cityName);
    //console.log(listWithTracks);
}