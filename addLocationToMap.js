const mymap = L.map('map').setView([0, 0], 1);

const marker = L.marker([0, 0]).addTo(mymap);

const attribution = '&copy; <a href="https://www.openstreemap.org/copyright">OpenStreetMap </a> contrubutors';
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileURL, {
    attribution
});
tiles.addTo(mymap)
const url = 'https://api.wheretheiss.at/v1/satellites/25544';

getdata().then(response => {
    console.log('yay!');
}).catch(error => {
    console.log('error!');
    console.error(error);
});

async function getdata() {
    const response = await fetch(url);
    const data = await response.json();

    const {
        latitude,
        longitude,
        velocity
    } = data;
    marker.setLatLng([latitude, longitude])


    console.log(latitude);
    console.log(longitude);
    console.log(velocity);

    document.getElementById('lat').textContent = latitude
    document.getElementById('long').textContent = longitude
    document.getElementById('vel').textContent = velocity
}