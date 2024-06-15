<template>
  <button class="pomorodo-button" @click="useMainStore().startFlomodoro()">
    <p class="start-pomodoro">Start Flomodoro</p>
  </button>
</template>

<script setup>
import { useMainStore } from '../stores/mainStore'
</script>

<style>
.pomorodo-button {
  background-color: rgba(32, 38, 85, 1);
  border-radius: 11px;
  padding: 2% 5%;
  display: flex;
  align-items: flex-start;
}
.start-pomodoro {
  font-size: 20px;
  font-weight: 400;
  line-height: normal;
  color: white;
  flex: 1;
  align-self: stretch;
  text-align: center;
}
</style>
