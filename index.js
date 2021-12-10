import { fetchTracks } from "./fetchTracks.js"
import { fetchCityName } from "./fetchCityName.js"

const tracksTable = document.querySelector('#tracksTable');
const searchButton = document.querySelector('#searchButton');

addEventListener();

function addEventListener() {
    searchButton.addEventListener("click", main, false);
}

async function main() {
    console.log("hej");
    const position = await getCurrentPosition();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const cityName = await fetchCityName(latitude, longitude);
    const tracks = await fetchTracks(cityName);
    showTracksInList(tracks);
}

function getCurrentPosition() {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function showTracksInList(tracks) {
    for (let i = 0; i < 10; i++) {
        let tr = document.createElement("tr");
        let image = document.createElement("img");
        image.src = tracks.tracks.items[i].album.images[0].url;
        tr.appendChild(image);

        let tdTrack = document.createElement("td");
        let tdArtist = document.createElement("td");
        let tdAlbum = document.createElement("td");

        tdTrack.innerHTML = tracks.tracks.items[i].name;
        tdArtist.innerText = tracks.tracks.items[i].album.artists[0].name;
        tdAlbum.innerHTML = tracks.tracks.items[i].album.name;

        tr.appendChild(tdArtist);
        tr.appendChild(tdAlbum);
        tr.appendChild(tdTrack);
        tracksTable.appendChild(tr);
    }
}