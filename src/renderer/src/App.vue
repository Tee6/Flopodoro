<script setup lang="ts">
import FlomodoroButton from './components/FlomodoroBtn.vue'
import PomodoroButton from './components/PomodoroBtn.vue'
import ResetButton from './components/ResetBtn.vue'
import TimerCard from './components/TimerCard.vue'
import CustomMenuBar from './components/MenuBar.vue'
import { useMainStore } from './stores/mainStore'
import { ref } from 'vue'

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
</script>

<template>
  <customMenuBar :class="{ fadeanimation: !menuBarVisible }"></customMenuBar>
  <h1 :key="useMainStore().title" class="big-main-title">{{ useMainStore().title }}</h1>
  <TimerCard></TimerCard>
  <div class="btn-div" :class="{ invisible: !btnDivVisible }">
    <FlomodoroButton></FlomodoroButton>
    <ResetButton></ResetButton>
    <PomodoroButton></PomodoroButton>
  </div>
</template>

<style scoped>
@import url('./assets/base.css');
@import url('./assets/main.css');

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
  background-color: #1d2063;
  color: black;
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
  background-color: #1d2063;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;

  color: white;
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
