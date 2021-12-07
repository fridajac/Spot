import { OAuthToken } from "./spotifyPasswordAndKeys.js";
import fetch from 'node-fetch';

fetchResults();

async function fetchResults() {
    const response = await fetch('https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2Bartist%3AMiles%2520Davis&type=track%2Cartist&market=ES&limit=10&offset=5', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + OAuthToken
        }
    });

    const data = await response.json();
    console.log(data);
}