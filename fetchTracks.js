import { OAuthToken, clientSecret, clientID } from "./spotifyPasswordAndKeys.js";

var token;

export async function fetchTracks(searchWord) {
    var limit = 10;

    const trackResponse = await fetch('https://api.spotify.com/v1/search?q=' + searchWord + '&limit=' + limit + '&type=track', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
    if (trackResponse.status == 401) {
        fetchAccessToken();
        fetchTracks();
    }
    return await trackResponse.json();
}


async function fetchAccessToken() {
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
    token = data.access_token
}