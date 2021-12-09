import { fetchTracks } from "./fetchTracks.js"
import { fetchCityName } from "./fetchCityName.js"

const trackList = document.querySelector('#trackList');

main();

async function main() {
    const position = await getCurrentPosition();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const cityName = await fetchCityName(latitude, longitude);
    const tracks = await fetchTracks(cityName);
    console.log(tracks);
    showTracksInList(tracks);
}

function getCurrentPosition() {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function showTracksInList(tracks) {

    let li = document.createElement("li");
    li.innerText = tracks.tracks.items[1].name;
    trackList.appendChild(li);

    for (let i = 0; i < 10; i++) {
        let li = document.createElement("li");
        li.innerText = tracks.tracks.items[i].name;
        console.log(tracks.tracks.items[i].name);
        trackList.appendChild(li);
    }
}