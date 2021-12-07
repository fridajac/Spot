import { OAuthToken, clientSecret, clientID } from "./spotifyPasswordAndKeys.js";
// import request from 'request';

async function fetchResults() {
    const authorization = btoa(clientID + ':' + clientSecret)
    const response = await fetch(
        'https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + authorization
            },
            body: 'grant_type=client_credentials'
        })

    const data = await response.json();

    const token = data.access_token

    const r2 = await fetch('https://api.spotify.com/v1/search?q=victor&type=track', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })

    console.log(await r2.json());
}
fetchResults();