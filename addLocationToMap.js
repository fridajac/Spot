export async function addLocationToMap(latitude, longitude) {
    const mymap = L.map('#map').setView([0, 0], 2);

    const marker = L.marker([0, 0]).addTo(mymap);

    const attribution = '&copy; <a href="https://www.openstreemap.org/copyright">OpenStreetMap </a> contrubutors';
    const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileURL, {
        attribution
    });
    tiles.addTo(mymap);
    marker.setLatLng([latitude, longitude]);
    return mymap;
}