<template>
  <div class="settings-container" @click="handleOutsideClick">
    <div class="settings-card" @click.stop>
      <h1>Settings</h1>
      <div class="settings-card-content">
        <div class="settings-card-content-row">
          <label for="work-time">Pomodoro Work Time</label>
          <select id="work-time" v-model="PomodoroWorkTime">
            <option value="20">20 minutes</option>
            <option value="25">25 minutes</option>
            <option value="30">30 minutes</option>
            <option value="35">35 minutes</option>
            <!-- Add more options as needed -->
          </select>
        </div>
        <div class="settings-card-content-row">
          <label for="short-break-time">Short Break Time</label>
          <select id="short-break-time" v-model="PomodoroPauseTime">
            <option value="5">5 minutes</option>
            <option value="10">10 minutes</option>
            <option value="15">15 minutes</option>
            <!-- Add more options as needed -->
          </select>
        </div>
        <div class="settings-card-content-row">
          <label for="color-theme">Color Theme</label>
          <select id="color-theme" v-model="colorTheme">
            <option value="0">Default</option>
            <option value="1">Green</option>
            <option value="2">Kiki Mode</option>
            <option value="3">Purple theme</option>
            <!-- Add more options as needed -->
          </select>
        </div>
      </div>
      <button class="save-button" @click="saveSettings">Save</button>
      <div>
        <button 
        class="spotify-button"
  @click="$emit('login-with-spotify')" 
  :disabled="MainStore.isUserLoggedIn"
>
  <!-- Display different text based on login status -->
  <span v-if="MainStore.isUserLoggedIn">You're logged into Spotify</span>
  <span v-else>Log in with Spotify</span>
</button>
  </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMainStore } from '../stores/mainStore'
const MainStore = useMainStore()

const PomodoroWorkTime = ref(25)
const PomodoroPauseTime = ref(5)
const store = useMainStore()
const colorTheme = ref(store.selectedTheme)

const emit = defineEmits(['settings-saved', 'login-with-spotify'])

function saveSettings() {
  // Save data to localStorage
  const settings = {
    PomodoroWorkTime: PomodoroWorkTime.value,
    PomodoroPauseTime: PomodoroPauseTime.value,
    colorTheme: parseInt(colorTheme.value, 10)
  }
  localStorage.setItem('pomodoroSettings', JSON.stringify(settings))

  // Update store values
  store.FlopodoroPause = [0, PomodoroPauseTime.value, 0]
  store.PomodoroTime = [0, PomodoroWorkTime.value, 0]
  store.selectedTheme = parseInt(colorTheme.value, 10)

  // Hide settings page
  store.showSettingsPage = false

  // Emit settings-saved event
  emit('settings-saved')
}

function handleOutsideClick(event) {
  if (!event.target.closest('.settings-card')) {
    store.showSettingsPage = false
  }
}
</script>

<style scoped>
.spotify-button{
  background-color: #1CB950;
  color: #ffffff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1.5rem;
}

.spotify-button:hover {
  background-color: #169841;
}

.settings-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.settings-card {
  background: #ffffff;
  padding: 3rem;
  /* Increase padding for larger appearance */
  border-radius: 1.5rem;
  /* Increase border radius */
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  /* Increase box shadow */
  max-width: 50rem;
  /* Increase maximum width */
  width: 90%;
  text-align: center;
  font-size: 1.5rem;
  /* Increase base font size */
}

.settings-card h1 {
  margin-bottom: 2rem;
  /* Increase margin */
  font-size: 2.5rem;
  /* Increase heading font size */
  color: #333;
}

.settings-card-content {
  margin-bottom: 2rem;
  /* Increase margin */
}

.settings-card-content-row {
  margin-bottom: 1.5rem;
  /* Increase margin */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* Align items to start */
}

.settings-card-content-row label {
  margin-bottom: 1rem;
  /* Increase margin */
  font-weight: bold;
  color: #555;
}

.settings-card-content-row select {
  padding: 1rem;
  /* Increase padding */
  border: 0.125rem solid #ddd;
  /* Increase border thickness */
  border-radius: 0.75rem;
  /* Increase border radius */
  width: 100%;
  font-size: 1.25rem;
  /* Increase font size */
}

.save-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  /* Increase padding */
  border-radius: 0.75rem;
  /* Increase border radius */
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1.5rem;
  /* Increase font size */
}

.save-button:hover {
  background-color: #0056b3;
}
</style>
