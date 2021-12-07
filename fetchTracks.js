import { OAuthToken, clientSecret, clientID } from "./spotifyPasswordAndKeys.js";
import request from 'request';

function fetchResults() {
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

            var options = {
                url: 'https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2Bartist%3AMiles%2520Davis&type=track%2Cartist&market=ES&limit=10&offset=5',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };
            request.get(options, function(error, response, body) {
                console.log(body);
            });
        }
    });
}
fetchResults();