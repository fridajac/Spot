import { rapidAPIKey } from "./spotifyPasswordAndKeys.js";


export async function fetchCityName(latitude, longitude) {
    const response = await fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/locations/' + latitude + '%2B' + longitude + '/nearbyCities?limit=1&minPopulation=100000&radius=100', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
            'X-RapidAPI-Key': rapidAPIKey,
        },
    })
    console.log(await response.json())
        // return await response.data[0].city;
}