
<><><script src="./addLocationToMap.js" type="module"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="" />
</><script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script></>


async function getdata(latitude,longitude) {
    const mymap = L.map('map').setView([0, 0], 2);

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