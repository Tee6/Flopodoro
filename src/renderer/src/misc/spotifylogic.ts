import { ref } from 'vue';

const CLIENT_ID = '4570aec779ae4c7592bf16d5af30c3ad'; // Spotify Client ID
const REDIRECT_URI = 'http://localhost:5173/callback'; // Redirect URI
const SCOPES = 'user-read-currently-playing user-read-playback-state';

const albumCoverUrl = ref('');

// Redirect user to Spotify login
function loginToSpotify() {
    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(CLIENT_ID)}&scope=${encodeURIComponent(SCOPES)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authUrl;
}

// Extract the access token from the URL
function getAccessTokenFromUrl() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get('access_token');
}

// Fetch the currently playing track
async function getCurrentPlayingTrack(accessToken: string) {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (response.ok) {
        const data = await response.json();
        return data.item.album.images[0].url; // URL of the album cover
    } else {
        throw new Error('Failed to fetch currently playing track. Ensure Spotify playback is active.');
    }
}

// Main function to fetch album cover
async function fetchAlbumCover() {
    const accessToken = getAccessTokenFromUrl();

    if (!accessToken) {
        loginToSpotify(); // Redirects to Spotify login if access token is not available
    } else {
        try {
            albumCoverUrl.value = await getCurrentPlayingTrack(accessToken);
            console.log('Album Cover URL:', albumCoverUrl.value);
        } catch (error) {
            console.error(error.message);
        }
    }
}

export { albumCoverUrl, loginToSpotify, fetchAlbumCover };
