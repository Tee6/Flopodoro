<template>
  <button class="timer-button" @click="useMainStore().TogglePomodoro()">
    <p v-if="!useMainStore().isPomodoroActive" class="start-text">Start Pomodoro</p>
    <p v-if="useMainStore().isPomodoroActive" class="start-text">Stop Pomodoro</p>
  </button>
</template>

<script setup>
import { useMainStore } from '../stores/mainStore'
</script>
