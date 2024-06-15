<template>
  <button class="reset-button" @click="useMainStore().ResetTimer()">
    <p class="reset-pomodoro-text">Reset</p>
  </button>
</template>

<script setup>
import { useMainStore } from '../stores/mainStore'
</script>

<style lang="scss" scoped>
.reset-button {
  background-color: rgba(32, 38, 85, 1);
  border-radius: 11px;
  padding: 2% 5%;
}
.reset-pomodoro-text {
  font-size: 20px;
  font-weight: 400;
  line-height: normal;
  color: white;
  flex: 1;
  align-self: stretch;
  text-align: center;
}
</style>
