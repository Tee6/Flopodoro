<script setup lang="ts">
import FlomodoroButton from './components/FlomodoroBtn.vue'
import PomodoroButton from './components/PomodoroBtn.vue'
import ResetButton from './components/ResetBtn.vue'
import TimerCard from './components/TimerCard.vue'
</script>

<template>
  <div class="custom-menu-bar">
    Flopodoro
    <button>close</button>
  </div>
  <TimerCard></TimerCard>
  <div class="btn-div">
    <FlomodoroButton></FlomodoroButton>
    <ResetButton></ResetButton>
    <PomodoroButton></PomodoroButton>
  </div>
</template>

<style scoped>
@import url('./assets/base.css');
@import url('./assets/main.css');

.custom-menu-bar {
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
</style>
