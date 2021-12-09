import { fetchTracks } from "./fetchTracks.js"
import { fetchCityName } from "./fetchCityName.js"

const tracksTable = document.querySelector('#tracksTable');

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

    let tr = document.createElement("tr");

    for (let i = 0; i < 10; i++) {
        let tr = document.createElement("tr");

        let tdArtist = document.createElement("td");
        let tdAlbum = document.createElement("td");
        let tdImage = document.createElement("td");
        tr.innerText = tracks.tracks.items[i].name;
        tdArtist.innerText = tracks.tracks.items[i].album.artists[0].name;
        tdAlbum.innerHTML = tracks.tracks.items[i].album.name;
        tdImage.innerHTML = tracks.tracks.items[i].album.images[0].url;
        tr.appendChild(tdArtist);
        tr.appendChild(tdAlbum);
        tr.appendChild(tdImage);
        tracksTable.appendChild(tr);
    }
}