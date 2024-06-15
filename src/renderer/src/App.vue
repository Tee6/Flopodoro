<script setup lang="ts">
import FlomodoroButton from './components/FlomodoroBtn.vue'
import PomodoroButton from './components/PomodoroBtn.vue'
import ResetButton from './components/ResetBtn.vue'
import TimerCard from './components/TimerCard.vue'
</script>

<template>
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

.btn-div {
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}
</style>
