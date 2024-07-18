<script setup lang="ts">
import FlomodoroButton from './components/FlomodoroBtn.vue'
import PomodoroButton from './components/PomodoroBtn.vue'
import ResetButton from './components/ResetBtn.vue'
import TimerCard from './components/TimerCard.vue'
import CustomMenuBar from './components/MenuBar.vue'
import SettingsPage from './components/SettingsPage.vue'
import PopUp from './components/PopUp.vue'
import { useMainStore } from './stores/mainStore'
import { onMounted, ref } from 'vue'

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
  console.log(MainStore.selectedTheme)
  activeTheme.value = themes[MainStore.selectedTheme]
  document.body.style.backgroundColor = activeTheme.value.bgColor
}

function closePopup() {
  MainStore.showPopup = false
}
</script>
<template>
  <customMenuBar
    :bg-color="activeTheme.menuColor"
    :class="{ fadeanimation: !menuBarVisible }"
  ></customMenuBar>
  <SettingsPage v-if="MainStore.showSettingsPage" @settings-saved="applyTheme"></SettingsPage>

  <h1 :key="MainStore.title" class="big-main-title">{{ MainStore.title }}</h1>

  <TimerCard
    :timer-color="activeTheme.timerColor"
    :timer-text-color="activeTheme.timerTextColor"
  ></TimerCard>

  <div class="btn-div" :class="{ invisible: !btnDivVisible }">
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
  <PopUp :show-popup="MainStore.showPopup" :status="MainStore.popupStatus" @close="closePopup" />
</template>

<style scoped>
@import url('./assets/base.css');
@import url('./assets/main.css');

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
