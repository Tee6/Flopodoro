<script setup lang="ts">
import FlomodoroButton from './components/FlomodoroBtn.vue'
import PomodoroButton from './components/PomodoroBtn.vue'
import ResetButton from './components/ResetBtn.vue'
import TimerCard from './components/TimerCard.vue'
import CustomMenuBar from './components/MenuBar.vue'
import SettingsPage from './components/SettingsPage.vue'
import PopUp from './components/PopUp.vue'
import Player from './components/Player.vue'
import { useMainStore } from './stores/mainStore'
import { onMounted, onUnmounted, ref } from 'vue'

const MainStore = useMainStore()
const themes = [
  {
    name: 'defaultTheme',
    bgColor: '#bbbccf',
    accentColor: '#1d2063',
    textColor: '#FFFFFF',
    timerColor: 'rgba(12, 4, 58, 1)',
    timerTextColor: 'rgba(12, 4, 58, 1)',
    menuColor: '#1d2063'
  },
  {
    name: 'greenTheme',
    bgColor: '#E6F5E6',
    accentColor: '#77DD77',
    textColor: '#000000',
    timerColor: 'rgba(119, 221, 119, 1)',
    timerTextColor: 'rgba(12, 4, 58, 1)',
    menuColor: '#77DD77'
  },
  {
    name: 'pinkTheme',
    bgColor: '#fcf8f3',
    accentColor: '#ffaaa5',
    textColor: '#ffffff',
    timerColor: '#ffaaa5',
    timerTextColor: '#ffaaa5',
    menuColor: '#ffaaa5'
  },
  {
    name: 'purpleTheme',
    bgColor: '#f4ebff',
    accentColor: '#7b2cbf',
    textColor: '#ffffff',
    timerColor: 'rgb(157 78 221 / 60%)',
    timerTextColor: '#9d4edd',
    menuColor: '#3c096c'
  }
]

const btnDivVisible = ref(true)
const menuBarVisible = ref(true)
let hCounter = 0
const handleKeydown = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === 'h') {
    if (hCounter === 0) {
      btnDivVisible.value = false
      menuBarVisible.value = true
    }
    if (hCounter === 1) {
      btnDivVisible.value = false
      menuBarVisible.value = false
    }
    if (hCounter === 2) {
      btnDivVisible.value = true
      menuBarVisible.value = true
    }
    if (hCounter + 1 >= 3) {
      hCounter = 0
    } else {
      hCounter++
    }
  }
  if (event.ctrlKey && event.key === 'p') {
    MainStore.spinning = !MainStore.spinning;
  }
}

window.addEventListener('keydown', handleKeydown)

onMounted(() => {
  MainStore.getState()

  // Load theme from localStorage if available
  const savedSettings = JSON.parse(localStorage.getItem('pomodoroSettings'))
  if (savedSettings && themes[savedSettings.colorTheme]) {
    activeTheme.value = themes[savedSettings.colorTheme]
    document.body.style.backgroundColor = activeTheme.value.bgColor
    MainStore.selectedTheme = savedSettings.colorTheme
  }
})

const activeTheme = ref(themes[0])
document.body.style.backgroundColor = activeTheme.value.bgColor

function applyTheme() {
  activeTheme.value = themes[MainStore.selectedTheme]
  document.body.style.backgroundColor = activeTheme.value.bgColor
}

function closePopup() {
  MainStore.showPopup = false
}

const CLIENT_ID = '4570aec779ae4c7592bf16d5af30c3ad';
const REDIRECT_URI = 'http://localhost:5173/callback';
const SCOPES = 'user-read-currently-playing user-read-playback-state';

function loginToSpotify() {
  const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(CLIENT_ID)}&scope=${encodeURIComponent(SCOPES)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  window.location.href = authUrl;
}

function getAccessTokenFromUrl() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get('access_token');
}

async function getCurrentPlayingTrack(accessToken: string) {
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { 'Authorization': `Bearer ${accessToken}` },
  });
  if (response.status === 204) { // Kein Track wird abgespielt
    return null; 
  }
  if (response.ok) {
    const data = await response.json();
    MainStore.TrackName = data.item.name; // Name des aktuellen Tracks
    MainStore.ArtistName = data.item.artists[0].name; // Name des Künstlers
    return data.item.album.images[0].url; // URL des Album-Covers
  } else {
    throw new Error('Failed to fetch currently playing track. Ensure Spotify playback is active.');
  }
}

const albumCoverUrl = ref('');
let pollingInterval: ReturnType<typeof setInterval> | null = null;
MainStore.isUserLoggedIn = false;
MainStore.isSongPlaying = false;

async function startSpotifyPolling() {
  const accessToken = getAccessTokenFromUrl();

  if (!accessToken) {
    loginToSpotify();
    return;
  }

  MainStore.isUserLoggedIn = true;

  try {
    // Initialer Abruf
    let coverUrl = await getCurrentPlayingTrack(accessToken);
    if (coverUrl === null) {
      MainStore.isSongPlaying = false;
    } else {
      albumCoverUrl.value = coverUrl;
      MainStore.isSongPlaying = true;
    }

    // Polling alle 5 Sekunden
    pollingInterval = setInterval(async () => {
      try {
        coverUrl = await getCurrentPlayingTrack(accessToken);
        if (coverUrl === null) {
          MainStore.isSongPlaying = false;
        } else {
          albumCoverUrl.value = coverUrl;
          MainStore.isSongPlaying = true;
        }
      } catch (error) {
        console.error('Error fetching track:', error.message);
        clearInterval(pollingInterval!); // Stoppe das Polling bei Fehlern
      }
    }, 5000); // 5000 ms (5 Sekunden)
  } catch (error) {
    console.error('Error initializing Spotify polling:', error.message);
  }
}

onMounted(() => {
  startSpotifyPolling();
});

onUnmounted(() => {
  if (pollingInterval) clearInterval(pollingInterval);
});
</script>

<template>
  <transition name="fade">
  <customMenuBar
    v-if="menuBarVisible"
    :bg-color="activeTheme.menuColor"
  ></customMenuBar>
</transition>
  <SettingsPage v-if="MainStore.showSettingsPage" @settings-saved="applyTheme" @login-with-spotify="loginToSpotify"></SettingsPage>

  <TimerCard
    :timer-color="activeTheme.timerColor"
    :timer-text-color="activeTheme.timerTextColor"
  ></TimerCard>
  <transition name="fade">
  <div v-if="btnDivVisible" class="btn-div">
    <FlomodoroButton
      :bg-color="activeTheme.accentColor"
      :text-color="activeTheme.textColor"
    ></FlomodoroButton>

    <ResetButton
      :bg-color="activeTheme.accentColor"
      :text-color="activeTheme.textColor"
    ></ResetButton>

    <PomodoroButton
      :bg-color="activeTheme.accentColor"
      :text-color="activeTheme.textColor"
    ></PomodoroButton>
  </div>
</transition>
  <PopUp :show-popup="MainStore.showPopup" :status="MainStore.popupStatus" @close="closePopup" />
  <Player v-if="MainStore.isUserLoggedIn && MainStore.isSongPlaying" :album-cover="albumCoverUrl"></Player>
</template>

<style scoped>
@import url('./assets/base.css');
@import url('./assets/main.css');

/* Transition für das Ausblenden */
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease-in-out; /* Dauer und Timing der Animation */
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0; /* Wenn das Element entfernt wird, wird es unsichtbar */
}

:root {
  --background-color: #bbbccf;
  --accent-color: #1d2063;
  --text-color: #000000;
  --menu-icon-color: #000000;
  --menu-icon-bg-color: #1d2063;
  /* weitere Variablen */
}

.big-main-title {
  font-size: 3vw;
  text-align: center;
  letter-spacing: 3px;

  position: relative;
  top: -80px;
  animation: title-exit-animation 2s ease-in 0s 1 normal forwards;
}

.fadeanimation {
  animation: title-exit-animation 2s ease-in 0s 1 normal forwards;
}

@keyframes title-exit-animation {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.menu-btn-div {
  -webkit-app-region: no-drag;
  float: left;
}

#minimize #close {
  background-color: var(--menu-icon-bg-color);
  color: var(--menu-icon-color);
  border: none;
  width: 50px;
  height: 50px;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
}

.custom-menu-bar {
  user-select: none;
  -webkit-app-region: drag;
  background-color: var(--accent-color);
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;

  color: var(--blue-text);
  font-size: 28px;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;

  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-div {
  width: 73vw;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}

.invisible {
  animation: title-exit-animation 2s ease-in 0s 1 normal forwards;
}
</style>
