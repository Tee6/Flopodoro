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
  border-radius: 1.5vw;
  padding: 1.5vw 4vw;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: auto;
  height: auto;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #1d2063; /* Dunklere Nuance, die zur normalen Hintergrundfarbe passt */
  }

  &:active {
    background-color: #1d2063; /* Noch etwas dunkler für den Klick-Effekt */
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
}

.reset-pomodoro-text {
  font-size: 2vw;
  font-weight: 400;
  line-height: normal;
  color: white;
  text-align: center;
  margin: 0;
  transition: font-size 0.3s ease;

  @media (max-width: 600px) {
    font-size: 4vw;
  }
}

@media (max-width: 600px) {
  .reset-button {
    padding: 3vw 6vw;
  }
}
</style>
