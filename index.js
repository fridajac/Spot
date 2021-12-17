import { fetchTracks } from "./fetchTracks.js";
import { fetchCityName } from "./fetchCityName.js";
import { addLocationToMap } from "./addLocationToMap.js";

const tracksTable = document.querySelector('#tracksTable');
const musicPlayer = document.querySelector('#audio');
const musicPlayerImage = document.querySelector('#music-player-image');
const btnPosition = document.querySelector('.button-position');
const textBox = document.getElementById('city-input');
const errorMessage = document.querySelector('.error-message');
const searchIcon = document.querySelector('.search-icon');
const loadingBar = document.querySelector('.input-field-loader');
const btnSpotify = document.querySelector('.button-spotify');
let currentTrackURL = null;
addEventListeners();

function addEventListeners() {
    btnSpotify.addEventListener('click', openInSpotify, false);
    searchIcon.addEventListener('click', showSearchField, false)
    btnPosition.addEventListener('click', getTracksFromPosition, false);
    textBox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            getTracksFromCity();
        }
    });
}

async function getPosition() {
    return await getCurrentPosition();
}

function showSearchField() {
    textBox.style.display = "block";
    searchIcon.addEventListener("click", getTracksFromCity, false);
}

async function getTracksFromCity() {
    loadingBar.style.display = 'block';
    let input = textBox.value.toString();
    const tracks = await fetchTracks(input);
    displayTracksInList(tracks);
    loadingBar[0].style.display = 'none';
}

async function getTracksFromPosition() {
    btnPosition.classList.add('button--loading');
    const position = await getPosition();
    addLocationToMap(position.coords.latitude, position.coords.longitude);
    const cityName = await fetchCityName(position.coords.latitude, position.coords.longitude);
    try {
        const tracks = await fetchTracks(cityName);
        displayTracksInList(tracks);
    } catch (Error) {
        errorMessage.innerHTML = 'Something went wrong, try again!'
    } finally {
        btnPosition.classList.remove('button--loading');
    }
}

function getCurrentPosition() {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function displayTracksInList(tracks) {
    errorMessage.innerHTML = '';
    if (tracks.tracks.items[0] == undefined) {
        errorMessage.innerHTML = 'No results';
        return;
    }
    while (tracksTable.hasChildNodes()) {
        tracksTable.removeChild(tracksTable.firstChild);
    }
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
            currentTrackURL = tracks.tracks.items[i].external_urls.spotify.toString();
        });

        tr.appendChild(tdArtist);
        tr.appendChild(tdAlbum);
        tr.appendChild(tdTrack);
        tracksTable.appendChild(tr);
    }
}

function openInSpotify() {
    musicPlayer.src = '';
    if (currentTrackURL != null) window.open(currentTrackURL);
}