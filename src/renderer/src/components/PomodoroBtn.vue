<template>
  <button class="timer-button" @click="useMainStore().startPomodoro()">
    <p class="start-text">Start Pomodoro</p>
  </button>
</template>

<script setup>
import { useMainStore } from '../stores/mainStore'
</script>
