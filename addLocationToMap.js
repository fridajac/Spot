

export async function addLocationToMap(latitude, longitude) {

    mymap.setView([latitude, longitude], 10);

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