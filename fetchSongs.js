import { OAuthToken } from "spotifyPasswordsAndKeys.js";

fetchResults();

async function fetchResults() {
    const response = await fetch('https://api.spotify.com/v1/search?q=searchword&type=track&limit=10', {
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