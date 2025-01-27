<template>
  <button
    class="timer-button"
    :style="{ backgroundColor: props.bgColor }"
    @click="useMainStore().ToggleFlomodoro()"
  >
    <p
      v-if="!useMainStore().isFlopodoroActive"
      class="start-text"
      :style="{ color: props.textColor }"
    >
      Start Flomodoro
    </p>
    <p
      v-if="useMainStore().isFlopodoroActive"
      class="start-text"
      :style="{ color: props.textColor }"
    >
      Stop Flomodoro
    </p>
  </button>
</template>

<script setup lang="ts">
import { useMainStore } from '../stores/mainStore'

const props = defineProps<{
  bgColor: string
  textColor: string
}>()
</script>

<style>
.timer-button {
  background-color: rgba(32, 38, 85, 1);
  border-radius: 1.5vw;
  padding: 2vw 4vw;
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
    background-color: #1d2063;
  }

  &:active {
    background-color: #1d2063;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
}

.start-text {
  font-size: 2vw;
  font-weight: 400;
  line-height: normal;
  color: white;
  text-align: center;
  margin: 0;
}

@media (max-width: 600px) {
  .timer-button {
    padding: 4vw 8vw;
  }

  .start-text {
    font-size: 4vw;
  }
}
</style>
