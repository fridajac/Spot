import { fetchTracks } from "./fetchTracks.js";
import { fetchCityName } from "./fetchCityName.js";
import { addLocationToMap } from "./addLocationToMap.js";

const tracksTable = document.querySelector('#tracksTable');
const searchButton = document.querySelector('#searchButton');
const musicPlayer = document.querySelector('#audio');
const musicPlayerImage = document.querySelector('#music-player-image');

addEventListener();

function addEventListener() {
    searchButton.addEventListener("click", main, false);
}

async function main() {
    const position = await getCurrentPosition();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const cityName = await fetchCityName(latitude, longitude);
    const tracks = await fetchTracks(cityName);
    //add location to map
    showTracksInList(tracks);
}

function getCurrentPosition() {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function showTracksInList(tracks) {
    for (let i = 0; i < 10; i++) {
        let url = tracks.tracks.items[i].preview_url;
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

        tr.addEventListener("click", function() {
            musicPlayerImage.setAttribute('src', image.src);
            musicPlayer.setAttribute('src', url);
        });

        tr.appendChild(tdArtist);
        tr.appendChild(tdAlbum);
        tr.appendChild(tdTrack);
        tracksTable.appendChild(tr);
    }

    function goToURL(url) {
        window.open(url);
    }
}