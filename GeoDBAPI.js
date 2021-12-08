
const latitude= 55.65535405013292;
const longitude=13.106699470248287;
async function fetchResults() {

const cityResponse = await fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/locations/'+latitude+'%2B'+longitude+'/nearbyCities?limit=1&minPopulation=100000&radius=100', {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        'X-RapidAPI-Key': '810e5528famsh7fbebd2b676197cp1e02f0jsnb3ec622e8bfb',
    },
})
console.log(await cityResponse.json());
}

fetchResults();