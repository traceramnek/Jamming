import SearchBar from "../Components/SearchBar/SearchBar";

let userAccessToken;
let appClientId = 'be0108d073204d0ebfcb4033b757a43a';
let redirectURI = 'http://localhost:3000/';

const Spotify = {
    getAccessToken() {
        if(userAccessToken) {
            return userAccessToken;
        }

        // cehck for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch) {
            userAccessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            // clear params and lets us get a new access token once this one expires

            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');

            return userAccessToken;
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${appClientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessURL;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { Authorization: `Bearer ${accessToken}`}
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].n,
                album: track.album.name,
                uri: track.uri
            }))
        })
    }

};

export default Spotify;