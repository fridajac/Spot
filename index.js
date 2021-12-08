import { fetchTracks } from "./fetchTracks.js"
import { fetchCityName } from "./fetchCityName.js"

main();

async function main() {
    const position = await getCurrentPosition();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const cityName = await fetchCityName(latitude, longitude);
    const trackList = await fetchTracks(cityName);
    console.log(trackList);
}

function getCurrentPosition() {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}