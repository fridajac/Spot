import { OAuthToken, clientSecret, clientID } from "./spotifyPasswordAndKeys.js";
import fetch from 'node-fetch';
import request from 'request';

function test() {
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(clientID + ':' + clientSecret).toString('base64'))
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var token = body.access_token;
            return token;
        }
    });
}
async function fetchResults() {

    const response = await fetch('https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2Bartist%3AMiles%2520Davis&type=track%2Cartist&market=ES&limit=10&offset=5', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + test(),
        }
        .then(response => response.json())
        .then(function(data) {
            console.log(data);
        })
    });
}
fetchResults();