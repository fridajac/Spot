import { fetchTracks } from "./fetchTracks.js";
import { fetchCityName } from "./fetchCityName.js";
import { addLocationToMap } from "./addLocationToMap.js";

const tracksTable = document.querySelector('#tracksTable');
const musicPlayer = document.querySelector('#audio');
const musicPlayerImage = document.querySelector('#music-player-image');
const btn = document.querySelector('.button');

addEventListener();

async function getPosition() {
    return await getCurrentPosition();
}

function addEventListener() {
    btn.addEventListener("click", showResults, false);

}

async function showResults() {
    btn.classList.add('button--loading');
    const position = await getPosition();
    addLocationToMap(position.coords.latitude, position.coords.longitude);
    const cityName = await fetchCityName(position.coords.latitude, position.coords.longitude);
    const tracks = await fetchTracks(cityName);
    showTracksInList(tracks);
    btn.classList.remove('button--loading');
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
}